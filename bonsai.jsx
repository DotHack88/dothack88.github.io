import { useState, useEffect, useRef, useCallback } from "react";

// ── Palette & helpers ──────────────────────────────────────────────────────────
const MONTHS = ["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"];
const DAYS   = ["Dom","Lun","Mar","Mer","Gio","Ven","Sab"];
const TODAY  = new Date();

function pad(n){ return String(n).padStart(2,"0"); }
function fmtDate(d){ if(!d) return ""; const dt=new Date(d); return `${pad(dt.getDate())} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`; }
function daysFromNow(dateStr){
  if(!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff/(1000*60*60*24));
}

const WORK_ICONS = {
  "Concimazione":"🌿","Potatura":"✂️","Rinvaso":"🪴","Irrigazione":"💧",
  "Antiparassitario":"🐛","Fil di ferro":"🔩","Defogliazione":"🍃","Osservazione":"👁️","Altro":"📝"
};

// ── Storage helpers ────────────────────────────────────────────────────────────
const STORAGE_KEY = "bonsai_app_v2";
function loadData(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { bonsai:[], reminders:[] }; }
  catch{ return { bonsai:[], reminders:[] }; }
}
function saveData(d){ localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }

function genId(){ return Date.now().toString(36)+Math.random().toString(36).slice(2); }

// ── AI call helper ─────────────────────────────────────────────────────────────
async function callClaude(messages, systemPrompt){
  const res = await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      model:"claude-sonnet-4-20250514",
      max_tokens:1000,
      system: systemPrompt,
      messages
    })
  });
  const data = await res.json();
  return data.content?.[0]?.text || "";
}

// ── Health badge ───────────────────────────────────────────────────────────────
function HealthBadge({score}){
  if(score==null) return null;
  const s = parseInt(score);
  const color = s>=80?"#4ade80":s>=50?"#facc15":"#f87171";
  const label = s>=80?"Ottima":s>=50?"Discreta":"Attenzione";
  return (
    <span style={{
      background:color+"22",border:`1px solid ${color}`,color,
      fontSize:"0.7rem",fontWeight:700,padding:"2px 8px",borderRadius:20,
      display:"inline-flex",alignItems:"center",gap:4
    }}>
      <span style={{width:6,height:6,borderRadius:"50%",background:color,display:"inline-block"}}/>
      {label} {s}%
    </span>
  );
}

// ── Photo picker / camera ──────────────────────────────────────────────────────
function PhotoInput({ onCapture }){
  const fileRef = useRef();
  return (
    <div style={{display:"flex",gap:8}}>
      <button className="btn-outline" onClick={()=>fileRef.current.click()} style={{flex:1}}>
        📁 Galleria
      </button>
      <button className="btn-outline" onClick={()=>{ fileRef.current.setAttribute("capture","environment"); fileRef.current.click(); }} style={{flex:1}}>
        📷 Scatta
      </button>
      <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}}
        onChange={e=>{
          const f=e.target.files[0];
          if(!f) return;
          const r=new FileReader();
          r.onload=ev=>onCapture(ev.target.result, f.name);
          r.readAsDataURL(f);
          fileRef.current.removeAttribute("capture");
        }}/>
    </div>
  );
}

// ── AI Analysis Modal ──────────────────────────────────────────────────────────
function AIAnalysisModal({ imageBase64, onResult, onClose }){
  const [status, setStatus] = useState("analyzing");
  const [result, setResult] = useState(null);

  useEffect(()=>{
    if(!imageBase64) return;
    const b64 = imageBase64.split(",")[1];
    const mediaType = imageBase64.match(/data:(image\/\w+)/)?.[1] || "image/jpeg";

    callClaude([{
      role:"user",
      content:[
        { type:"image", source:{ type:"base64", media_type:mediaType, data:b64 } },
        { type:"text", text:"Analizza questo bonsai. Rispondi SOLO con JSON valido senza backtick, nel formato: {\"specie\":\"nome specie\",\"nomeComuneIt\":\"nome comune italiano\",\"salute\":85,\"notesSalute\":\"descrizione breve stato salute\",\"consigli\":\"1-2 consigli pratici brevi\"}" }
      ]
    }],
    "Sei un esperto botanico specializzato in bonsai. Analizza le immagini e fornisci: identificazione specie, stato di salute (0-100), note e consigli pratici. Rispondi SEMPRE e SOLO in JSON valido, mai con testo aggiuntivo o backtick.")
    .then(text=>{
      try{
        const clean = text.replace(/```json|```/g,"").trim();
        const parsed = JSON.parse(clean);
        setResult(parsed);
        setStatus("done");
      } catch{
        setResult({ specie:"Non identificata", nomeComuneIt:"Sconosciuto", salute:null, notesSalute:"Analisi non disponibile", consigli:"Riprova con una foto più nitida." });
        setStatus("done");
      }
    })
    .catch(()=>setStatus("error"));
  },[imageBase64]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()} style={{maxWidth:380}}>
        <h3 style={{marginBottom:16,fontSize:"1.1rem"}}>🤖 Analisi AI</h3>

        {status==="analyzing" && (
          <div style={{textAlign:"center",padding:"32px 0"}}>
            <div className="spinner"/>
            <p style={{marginTop:16,opacity:.7,fontSize:"0.9rem"}}>Identificazione in corso…</p>
          </div>
        )}
        {status==="error" && <p style={{color:"#f87171"}}>Errore. Riprova.</p>}

        {status==="done" && result && (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div className="info-row"><span>🌳 Specie</span><strong>{result.specie}</strong></div>
            <div className="info-row"><span>🇮🇹 Nome italiano</span><strong>{result.nomeComuneIt}</strong></div>
            <div className="info-row"><span>❤️ Salute</span><HealthBadge score={result.salute}/></div>
            <div style={{background:"#ffffff10",borderRadius:10,padding:"10px 14px"}}>
              <p style={{fontSize:"0.82rem",margin:0,opacity:.85}}>{result.notesSalute}</p>
            </div>
            {result.consigli && (
              <div style={{background:"#4ade8015",border:"1px solid #4ade8040",borderRadius:10,padding:"10px 14px"}}>
                <p style={{fontSize:"0.82rem",margin:0,color:"#4ade80"}}>💡 {result.consigli}</p>
              </div>
            )}
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <button className="btn-primary" style={{flex:1}} onClick={()=>onResult(result)}>
                ✅ Usa questi dati
              </button>
              <button className="btn-outline" onClick={onClose}>Annulla</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Bonsai Form Modal ──────────────────────────────────────────────────────────
function BonsaiFormModal({ bonsai, onSave, onClose }){
  const isNew = !bonsai?.id;
  const [form, setForm] = useState(bonsai || {
    id: genId(), nome:"", specie:"", nomeComuneIt:"", stile:"", eta:"",
    acquisito:"", foto:null, salute:null, notesSalute:"", note:"",
    lavorazioni:[], createdAt: new Date().toISOString()
  });
  const [aiImage, setAiImage] = useState(null);
  const [showAI, setShowAI] = useState(false);
  const set = (k,v)=>setForm(f=>({...f,[k]:v}));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()} style={{maxWidth:420}}>
        <h3 style={{marginBottom:16}}>{isNew?"🌱 Nuovo Bonsai":"✏️ Modifica Bonsai"}</h3>

        {/* Photo */}
        <div style={{marginBottom:16}}>
          {form.foto && <img src={form.foto} alt="" style={{width:"100%",height:160,objectFit:"cover",borderRadius:12,marginBottom:8}}/>}
          <PhotoInput onCapture={(src)=>{
            set("foto",src);
            setAiImage(src);
            setShowAI(true);
          }}/>
          {form.foto && !showAI && (
            <button className="btn-outline" style={{width:"100%",marginTop:8}} onClick={()=>setShowAI(true)}>
              🤖 Ri-analizza con AI
            </button>
          )}
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <input className="input" placeholder="Nome (es. Il mio primo ficus)" value={form.nome} onChange={e=>set("nome",e.target.value)}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <input className="input" placeholder="Specie" value={form.specie} onChange={e=>set("specie",e.target.value)}/>
            <input className="input" placeholder="Nome comune" value={form.nomeComuneIt} onChange={e=>set("nomeComuneIt",e.target.value)}/>
            <input className="input" placeholder="Stile (Moyogi…)" value={form.stile} onChange={e=>set("stile",e.target.value)}/>
            <input className="input" placeholder="Età stimata (anni)" value={form.eta} onChange={e=>set("eta",e.target.value)} type="number"/>
          </div>
          <input className="input" type="date" value={form.acquisito} onChange={e=>set("acquisito",e.target.value)}
            style={{colorScheme:"dark"}} title="Data di acquisizione"/>
          <textarea className="input" placeholder="Note generali…" value={form.note} rows={2}
            onChange={e=>set("note",e.target.value)} style={{resize:"vertical"}}/>
        </div>

        {form.salute!=null && (
          <div style={{marginTop:12,background:"#ffffff08",borderRadius:10,padding:"10px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:"0.8rem",opacity:.7}}>Salute rilevata AI</span>
              <HealthBadge score={form.salute}/>
            </div>
            {form.notesSalute && <p style={{fontSize:"0.78rem",margin:"6px 0 0",opacity:.7}}>{form.notesSalute}</p>}
          </div>
        )}

        <div style={{display:"flex",gap:8,marginTop:18}}>
          <button className="btn-primary" style={{flex:1}} onClick={()=>onSave(form)}>💾 Salva</button>
          <button className="btn-outline" onClick={onClose}>Annulla</button>
        </div>

        {showAI && aiImage && (
          <AIAnalysisModal imageBase64={aiImage}
            onResult={r=>{
              setForm(f=>({...f,specie:r.specie||f.specie,nomeComuneIt:r.nomeComuneIt||f.nomeComuneIt,
                salute:r.salute,notesSalute:r.notesSalute}));
              setShowAI(false);
            }}
            onClose={()=>setShowAI(false)}/>
        )}
      </div>
    </div>
  );
}

// ── Lavorazione Modal ──────────────────────────────────────────────────────────
function LavorazioneModal({ bonsaiId, bonsaiNome, onSave, onClose }){
  const [tipo, setTipo] = useState("Concimazione");
  const [data, setData] = useState(new Date().toISOString().slice(0,10));
  const [note, setNote] = useState("");
  const [addReminder, setAddReminder] = useState(false);
  const [reminderDays, setReminderDays] = useState(30);
  const [reminderNota, setReminderNota] = useState("");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()} style={{maxWidth:400}}>
        <h3 style={{marginBottom:16}}>🌿 Aggiungi Lavorazione</h3>
        <p style={{fontSize:"0.85rem",opacity:.6,marginBottom:16}}>{bonsaiNome}</p>

        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
          {Object.entries(WORK_ICONS).map(([k,v])=>(
            <button key={k} onClick={()=>setTipo(k)}
              style={{padding:"5px 12px",borderRadius:20,border:"1px solid",fontSize:"0.8rem",cursor:"pointer",
                background: tipo===k?"var(--moss)":"transparent",
                borderColor: tipo===k?"var(--moss)":"#ffffff30",
                color: tipo===k?"#000":"inherit"}}>
              {v} {k}
            </button>
          ))}
        </div>

        <input className="input" type="date" value={data} onChange={e=>setData(e.target.value)} style={{marginBottom:10,colorScheme:"dark"}}/>
        <textarea className="input" placeholder="Note sulla lavorazione…" value={note} rows={2}
          onChange={e=>setNote(e.target.value)} style={{resize:"vertical",marginBottom:12}}/>

        {/* Reminder toggle */}
        <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",marginBottom:12}}>
          <div className={`toggle ${addReminder?"on":""}`} onClick={()=>setAddReminder(v=>!v)}/>
          <span style={{fontSize:"0.88rem"}}>Aggiungi promemoria</span>
        </label>
        {addReminder && (
          <div style={{background:"#ffffff08",borderRadius:12,padding:14,display:"flex",flexDirection:"column",gap:8}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:"0.85rem",opacity:.7,whiteSpace:"nowrap"}}>Tra</span>
              <input className="input" type="number" value={reminderDays} min={1}
                onChange={e=>setReminderDays(parseInt(e.target.value)||7)}
                style={{width:70}}/>
              <span style={{fontSize:"0.85rem",opacity:.7}}>giorni</span>
            </div>
            <input className="input" placeholder="Nota promemoria (es. Ripeti concimazione)" value={reminderNota}
              onChange={e=>setReminderNota(e.target.value)}/>
          </div>
        )}

        <div style={{display:"flex",gap:8,marginTop:16}}>
          <button className="btn-primary" style={{flex:1}} onClick={()=>{
            const lav = { id:genId(), tipo, data, note, bonsaiId, icon: WORK_ICONS[tipo] };
            let reminder = null;
            if(addReminder){
              const rd = new Date(data);
              rd.setDate(rd.getDate()+reminderDays);
              reminder = { id:genId(), bonsaiId, bonsaiNome, tipo, data: rd.toISOString().slice(0,10),
                nota: reminderNota || `Ripeti ${tipo}`, completato:false };
            }
            onSave(lav, reminder);
          }}>✅ Salva</button>
          <button className="btn-outline" onClick={onClose}>Annulla</button>
        </div>
      </div>
    </div>
  );
}

// ── Reminder Form Modal ────────────────────────────────────────────────────────
function ReminderModal({ bonsaiList, reminder, onSave, onClose }){
  const isNew = !reminder?.id;
  const [form, setForm] = useState(reminder || {
    id:genId(), bonsaiId:"", bonsaiNome:"", tipo:"Concimazione",
    data: new Date().toISOString().slice(0,10), nota:"", completato:false
  });
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()} style={{maxWidth:380}}>
        <h3 style={{marginBottom:16}}>{isNew?"🔔 Nuovo Promemoria":"✏️ Modifica Promemoria"}</h3>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <select className="input" value={form.bonsaiId} onChange={e=>{
            const b=bonsaiList.find(x=>x.id===e.target.value);
            set("bonsaiId",e.target.value); set("bonsaiNome",b?.nome||"");
          }}>
            <option value="">— Seleziona bonsai —</option>
            {bonsaiList.map(b=><option key={b.id} value={b.id}>{b.nome||b.specie}</option>)}
          </select>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {Object.entries(WORK_ICONS).map(([k,v])=>(
              <button key={k} onClick={()=>set("tipo",k)}
                style={{padding:"4px 10px",borderRadius:20,border:"1px solid",fontSize:"0.78rem",cursor:"pointer",
                  background: form.tipo===k?"var(--moss)":"transparent",
                  borderColor: form.tipo===k?"var(--moss)":"#ffffff30",
                  color: form.tipo===k?"#000":"inherit"}}>
                {v} {k}
              </button>
            ))}
          </div>
          <input className="input" type="date" value={form.data} onChange={e=>set("data",e.target.value)} style={{colorScheme:"dark"}}/>
          <input className="input" placeholder="Nota…" value={form.nota} onChange={e=>set("nota",e.target.value)}/>
        </div>
        <div style={{display:"flex",gap:8,marginTop:16}}>
          <button className="btn-primary" style={{flex:1}} onClick={()=>onSave(form)}>💾 Salva</button>
          <button className="btn-outline" onClick={onClose}>Annulla</button>
        </div>
      </div>
    </div>
  );
}

// ── Bonsai Detail Panel ────────────────────────────────────────────────────────
function BonsaiDetail({ bonsai, reminders, onEdit, onAddLav, onClose, onDeleteLav }){
  const myReminders = reminders.filter(r=>r.bonsaiId===bonsai.id && !r.completato)
    .sort((a,b)=>a.data.localeCompare(b.data));
  const lavorazioni = [...(bonsai.lavorazioni||[])].sort((a,b)=>b.data.localeCompare(a.data));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box detail-box" onClick={e=>e.stopPropagation()}>
        {/* Header photo */}
        <div style={{position:"relative",height:220,borderRadius:"16px 16px 0 0",overflow:"hidden",margin:"-24px -20px 0",background:"#1a2010"}}>
          {bonsai.foto
            ? <img src={bonsai.foto} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            : <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",fontSize:72,opacity:.3}}>🌳</div>
          }
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 40%,#16200e 100%)"}}/>
          <button onClick={onClose} style={{position:"absolute",top:12,right:12,background:"#00000060",border:"none",color:"#fff",
            width:36,height:36,borderRadius:"50%",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        <div style={{marginTop:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <h2 style={{margin:0,fontSize:"1.4rem"}}>{bonsai.nome || bonsai.specie || "Bonsai"}</h2>
              <p style={{margin:"2px 0 6px",opacity:.6,fontSize:"0.85rem"}}>{bonsai.specie}{bonsai.nomeComuneIt?" · "+bonsai.nomeComuneIt:""}</p>
            </div>
            <HealthBadge score={bonsai.salute}/>
          </div>

          <div style={{display:"flex",gap:8,flexWrap:"wrap",margin:"8px 0 16px"}}>
            {bonsai.stile && <span className="chip">🎋 {bonsai.stile}</span>}
            {bonsai.eta  && <span className="chip">⏳ {bonsai.eta} anni</span>}
            {bonsai.acquisito && <span className="chip">📅 Acq. {fmtDate(bonsai.acquisito)}</span>}
          </div>

          {bonsai.notesSalute && (
            <div style={{background:"#ffffff08",borderRadius:10,padding:"10px 14px",marginBottom:14}}>
              <p style={{margin:0,fontSize:"0.82rem",opacity:.8}}>{bonsai.notesSalute}</p>
            </div>
          )}

          {bonsai.note && <p style={{fontSize:"0.85rem",opacity:.7,marginBottom:16}}>{bonsai.note}</p>}

          {/* Prossimi promemoria */}
          {myReminders.length>0 && (
            <div style={{marginBottom:16}}>
              <h4 style={{fontSize:"0.8rem",opacity:.5,letterSpacing:1,marginBottom:8}}>PROSSIMI LAVORI</h4>
              {myReminders.slice(0,3).map(r=>{
                const d=daysFromNow(r.data);
                return (
                  <div key={r.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #ffffff10"}}>
                    <span>{WORK_ICONS[r.tipo]||"📝"}</span>
                    <div style={{flex:1}}>
                      <p style={{margin:0,fontSize:"0.85rem"}}>{r.nota||r.tipo}</p>
                      <p style={{margin:0,fontSize:"0.75rem",opacity:.5}}>{fmtDate(r.data)}</p>
                    </div>
                    <span style={{fontSize:"0.75rem",padding:"2px 8px",borderRadius:20,
                      background: d<=3?"#f8717120":d<=7?"#facc1520":"#4ade8020",
                      color: d<=3?"#f87171":d<=7?"#facc15":"#4ade80"}}>
                      {d!=null?(d<=0?"Oggi":d===1?"Domani":`${d}g`):"-"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Storico lavorazioni */}
          <div style={{marginBottom:16}}>
            <h4 style={{fontSize:"0.8rem",opacity:.5,letterSpacing:1,marginBottom:8}}>STORICO LAVORAZIONI</h4>
            {lavorazioni.length===0 && <p style={{fontSize:"0.85rem",opacity:.4}}>Nessuna lavorazione registrata</p>}
            {lavorazioni.slice(0,10).map(l=>(
              <div key={l.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #ffffff10"}}>
                <span style={{fontSize:"1.1rem"}}>{l.icon||WORK_ICONS[l.tipo]||"📝"}</span>
                <div style={{flex:1}}>
                  <p style={{margin:0,fontSize:"0.85rem"}}>{l.tipo}</p>
                  {l.note && <p style={{margin:0,fontSize:"0.75rem",opacity:.5}}>{l.note}</p>}
                </div>
                <span style={{fontSize:"0.75rem",opacity:.5}}>{fmtDate(l.data)}</span>
                <button onClick={()=>onDeleteLav(bonsai.id,l.id)} style={{background:"none",border:"none",cursor:"pointer",opacity:.4,color:"#f87171",fontSize:"1rem"}}>✕</button>
              </div>
            ))}
          </div>

          {/* Azioni */}
          <div style={{display:"flex",gap:8}}>
            <button className="btn-primary" style={{flex:1}} onClick={onAddLav}>🌿 Aggiungi Lavorazione</button>
            <button className="btn-outline" onClick={onEdit}>✏️ Modifica</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mini Calendar ──────────────────────────────────────────────────────────────
function CalendarView({ reminders, bonsaiList, onAddReminder, onEditReminder, onToggleReminder }){
  const [cur, setCur] = useState(new Date(TODAY.getFullYear(), TODAY.getMonth(),1));

  const daysInMonth = new Date(cur.getFullYear(), cur.getMonth()+1, 0).getDate();
  const firstDay    = new Date(cur.getFullYear(), cur.getMonth(), 1).getDay();
  const cells       = [];
  for(let i=0;i<firstDay;i++) cells.push(null);
  for(let d=1;d<=daysInMonth;d++) cells.push(d);

  const remByDay = {};
  reminders.forEach(r=>{
    const rd=new Date(r.data);
    if(rd.getFullYear()===cur.getFullYear() && rd.getMonth()===cur.getMonth()){
      const k=rd.getDate();
      if(!remByDay[k]) remByDay[k]=[];
      remByDay[k].push(r);
    }
  });

  const [selDay, setSelDay] = useState(null);

  const today = TODAY.getDate();
  const isThisMonth = cur.getMonth()===TODAY.getMonth() && cur.getFullYear()===TODAY.getFullYear();

  return (
    <div>
      {/* Nav */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <button className="nav-btn" onClick={()=>setCur(new Date(cur.getFullYear(),cur.getMonth()-1,1))}>‹</button>
        <span style={{fontWeight:700,fontSize:"1.1rem"}}>{MONTHS[cur.getMonth()]} {cur.getFullYear()}</span>
        <button className="nav-btn" onClick={()=>setCur(new Date(cur.getFullYear(),cur.getMonth()+1,1))}>›</button>
      </div>

      {/* Day headers */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:4}}>
        {DAYS.map(d=><div key={d} style={{textAlign:"center",fontSize:"0.7rem",opacity:.4,padding:"4px 0"}}>{d}</div>)}
      </div>

      {/* Grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
        {cells.map((d,i)=>{
          if(!d) return <div key={i}/>;
          const rems = remByDay[d]||[];
          const isToday = isThisMonth && d===today;
          const isSel   = selDay===d;
          return (
            <div key={i} onClick={()=>setSelDay(isSel?null:d)}
              style={{aspectRatio:"1",borderRadius:8,display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative",
                background: isToday?"var(--moss)":isSel?"#ffffff20":"transparent",
                border: isSel?"1px solid var(--moss)":"1px solid transparent"}}>
              <span style={{fontSize:"0.85rem",fontWeight:isToday?700:400,color:isToday?"#000":undefined}}>{d}</span>
              {rems.length>0 && (
                <div style={{display:"flex",gap:2,marginTop:1}}>
                  {rems.slice(0,3).map((r,j)=>(
                    <div key={j} style={{width:5,height:5,borderRadius:"50%",
                      background:r.completato?"#4ade8060":"var(--moss)"}}/>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected day detail */}
      {selDay && (
        <div style={{marginTop:16,background:"#ffffff08",borderRadius:12,padding:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <h4 style={{margin:0,fontSize:"0.9rem"}}>{selDay} {MONTHS[cur.getMonth()]}</h4>
            <button className="btn-primary" style={{padding:"4px 12px",fontSize:"0.78rem"}}
              onClick={()=>{
                const d=`${cur.getFullYear()}-${pad(cur.getMonth()+1)}-${pad(selDay)}`;
                onAddReminder(d);
              }}>+ Aggiungi</button>
          </div>
          {(remByDay[selDay]||[]).length===0 && <p style={{opacity:.4,fontSize:"0.85rem",margin:0}}>Nessun lavoro programmato</p>}
          {(remByDay[selDay]||[]).map(r=>{
            const b=bonsaiList.find(x=>x.id===r.bonsaiId);
            return (
              <div key={r.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #ffffff10"}}>
                <span>{WORK_ICONS[r.tipo]||"📝"}</span>
                <div style={{flex:1}}>
                  <p style={{margin:0,fontSize:"0.85rem",textDecoration:r.completato?"line-through":undefined}}>{r.nota||r.tipo}</p>
                  <p style={{margin:0,fontSize:"0.75rem",opacity:.5}}>{b?.nome||b?.specie||"N/A"}</p>
                </div>
                <button onClick={()=>onToggleReminder(r.id)} style={{background:"none",border:"none",cursor:"pointer",fontSize:"1.1rem"}}>
                  {r.completato?"↩️":"✅"}
                </button>
                <button onClick={()=>onEditReminder(r)} style={{background:"none",border:"none",cursor:"pointer",opacity:.5,fontSize:"0.9rem"}}>✏️</button>
              </div>
            );
          })}
        </div>
      )}

      <button className="btn-outline" style={{width:"100%",marginTop:16}}
        onClick={()=>onAddReminder(null)}>+ Nuovo promemoria</button>
    </div>
  );
}

// ── Reminders List ─────────────────────────────────────────────────────────────
function RemindersView({ reminders, bonsaiList, onAdd, onEdit, onToggle, onDelete }){
  const upcoming = reminders.filter(r=>!r.completato).sort((a,b)=>a.data.localeCompare(b.data));
  const done     = reminders.filter(r=>r.completato).sort((a,b)=>b.data.localeCompare(a.data));

  const Section = ({title, items})=>(
    <div style={{marginBottom:24}}>
      <h4 style={{fontSize:"0.75rem",opacity:.4,letterSpacing:1.5,marginBottom:12}}>{title}</h4>
      {items.length===0 && <p style={{opacity:.4,fontSize:"0.85rem"}}>Nessuno</p>}
      {items.map(r=>{
        const d=daysFromNow(r.data);
        const b=bonsaiList.find(x=>x.id===r.bonsaiId);
        const urgent = !r.completato && d!=null && d<=3;
        return (
          <div key={r.id} style={{background: urgent?"#f8717110":"#ffffff08",
            borderRadius:12,padding:"12px 14px",marginBottom:8,
            border: urgent?"1px solid #f8717140":"1px solid transparent",
            display:"flex",gap:12,alignItems:"center"}}>
            <span style={{fontSize:"1.3rem"}}>{WORK_ICONS[r.tipo]||"📝"}</span>
            <div style={{flex:1}}>
              <p style={{margin:0,fontSize:"0.88rem",fontWeight:600,textDecoration:r.completato?"line-through":undefined}}>{r.nota||r.tipo}</p>
              <p style={{margin:"2px 0 0",fontSize:"0.75rem",opacity:.5}}>
                {b?.nome||b?.specie||r.bonsaiNome||"—"} · {fmtDate(r.data)}
              </p>
            </div>
            {!r.completato && d!=null && (
              <span style={{fontSize:"0.72rem",padding:"2px 8px",borderRadius:20,whiteSpace:"nowrap",
                background: d<=0?"#f8717130":d<=7?"#facc1520":"#4ade8015",
                color: d<=0?"#f87171":d<=7?"#facc15":"#4ade80"}}>
                {d<=0?"Scaduto":d===1?"Domani":`${d}g`}
              </span>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              <button onClick={()=>onToggle(r.id)} title={r.completato?"Riapri":"Completato"}
                style={{background:"none",border:"none",cursor:"pointer",fontSize:"1rem"}}>{r.completato?"↩️":"✅"}</button>
              <button onClick={()=>onEdit(r)}
                style={{background:"none",border:"none",cursor:"pointer",opacity:.4,fontSize:"0.85rem"}}>✏️</button>
              <button onClick={()=>onDelete(r.id)}
                style={{background:"none",border:"none",cursor:"pointer",opacity:.3,color:"#f87171",fontSize:"0.85rem"}}>🗑️</button>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{margin:0}}>Promemoria</h2>
          {upcoming.length>0 && <p style={{margin:"2px 0 0",fontSize:"0.82rem",opacity:.5}}>{upcoming.length} in attesa</p>}
        </div>
        <button className="btn-primary" onClick={()=>onAdd(null)}>+ Aggiungi</button>
      </div>
      <Section title="IN ATTESA" items={upcoming}/>
      {done.length>0 && <Section title="COMPLETATI" items={done}/>}
    </div>
  );
}

// ── Stats helpers ──────────────────────────────────────────────────────────────
function getMonthlyCounts(allLavorazioni, months=6){
  const result = [];
  for(let i=months-1;i>=0;i--){
    const d = new Date(TODAY.getFullYear(), TODAY.getMonth()-i, 1);
    const key = `${d.getFullYear()}-${pad(d.getMonth()+1)}`;
    const count = allLavorazioni.filter(l=> l.data && l.data.startsWith(key)).length;
    result.push({ label: MONTHS[d.getMonth()], key, count });
  }
  return result;
}

function getWorkTypeCounts(allLavorazioni){
  const counts = {};
  allLavorazioni.forEach(l=>{ counts[l.tipo]=(counts[l.tipo]||0)+1; });
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]);
}

// ── Bar Chart SVG ──────────────────────────────────────────────────────────────
function BarChart({ data, color="#8db840" }){
  const W=320, H=120, PAD={l:8,r:8,t:10,b:28};
  const max = Math.max(...data.map(d=>d.count), 1);
  const bw = (W - PAD.l - PAD.r) / data.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",overflow:"visible"}}>
      {data.map((d,i)=>{
        const bh = ((d.count/max) * (H-PAD.t-PAD.b)) || 2;
        const x = PAD.l + i*bw + bw*0.15;
        const y = H - PAD.b - bh;
        const isMax = d.count===max && max>0;
        return (
          <g key={d.key}>
            <rect x={x} y={y} width={bw*0.7} height={bh}
              rx={4} fill={isMax?color:color+"66"}/>
            {d.count>0 && (
              <text x={x+bw*0.35} y={y-4} textAnchor="middle"
                fontSize={9} fill={color} fontFamily="DM Sans,sans-serif">{d.count}</text>
            )}
            <text x={x+bw*0.35} y={H-PAD.b+12} textAnchor="middle"
              fontSize={9} fill="#ffffff60" fontFamily="DM Sans,sans-serif">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Donut Chart SVG ────────────────────────────────────────────────────────────
function DonutChart({ data }){
  const COLORS=["#8db840","#5fa020","#facc15","#60a5fa","#f87171","#c084fc","#fb923c","#34d399","#a78bfa"];
  const total = data.reduce((s,[,v])=>s+v,0)||1;
  const R=52, cx=70, cy=70, stroke=18;
  let offset=0;
  const arcs = data.slice(0,8).map(([label,val],i)=>{
    const pct = val/total;
    const arc = { label, val, pct, offset, color:COLORS[i%COLORS.length] };
    offset += pct;
    return arc;
  });

  function polarToXY(pct, r){
    const a = (pct*2*Math.PI) - Math.PI/2;
    return [cx + r*Math.cos(a), cy + r*Math.sin(a)];
  }
  function describeArc(startPct, endPct){
    if(endPct-startPct>=1) endPct=0.9999;
    const [sx,sy]=polarToXY(startPct,R);
    const [ex,ey]=polarToXY(endPct,R);
    const large = (endPct-startPct)>0.5?1:0;
    return `M${sx},${sy} A${R},${R} 0 ${large} 1 ${ex},${ey}`;
  }

  return (
    <div style={{display:"flex",gap:16,alignItems:"center"}}>
      <svg viewBox="0 0 140 140" style={{width:130,flexShrink:0}}>
        {arcs.map((a,i)=>(
          <path key={i}
            d={describeArc(a.offset, a.offset+a.pct)}
            fill="none" stroke={a.color} strokeWidth={stroke}
            strokeLinecap="round"/>
        ))}
        <circle cx={cx} cy={cy} r={R-stroke/2-2} fill="#16220f"/>
        <text x={cx} y={cy-6} textAnchor="middle" fontSize={20} fill="#e8eed8" fontFamily="Playfair Display,serif">{total}</text>
        <text x={cx} y={cy+10} textAnchor="middle" fontSize={8} fill="#ffffff50" fontFamily="DM Sans,sans-serif">lavorazioni</text>
      </svg>
      <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
        {arcs.map((a,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:7}}>
            <div style={{width:8,height:8,borderRadius:2,background:a.color,flexShrink:0}}/>
            <span style={{fontSize:".75rem",flex:1,opacity:.8}}>{WORK_ICONS[a.label]||""} {a.label}</span>
            <span style={{fontSize:".75rem",fontWeight:600}}>{a.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Health Timeline SVG ────────────────────────────────────────────────────────
function HealthLine({ readings }){
  if(readings.length<2) return (
    <p style={{opacity:.4,fontSize:".82rem",padding:"20px 0"}}>Aggiungi almeno 2 analisi AI per vedere l'andamento.</p>
  );
  const W=320, H=90, PAD={l:24,r:8,t:12,b:20};
  const scores = readings.map(r=>r.salute);
  const min=Math.max(0,Math.min(...scores)-10), max=Math.min(100,Math.max(...scores)+10);
  const xStep=(W-PAD.l-PAD.r)/(readings.length-1);
  function xp(i){ return PAD.l+i*xStep; }
  function yp(v){ return PAD.t+(1-(v-min)/(max-min||1))*(H-PAD.t-PAD.b); }
  const pts=readings.map((r,i)=>`${xp(i)},${yp(r.salute)}`).join(" ");
  const area=`M${xp(0)},${yp(readings[0].salute)} `+readings.slice(1).map((_,i)=>`L${xp(i+1)},${yp(readings[i+1].salute)}`).join(" ")+` L${xp(readings.length-1)},${H-PAD.b} L${xp(0)},${H-PAD.b} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%"}}>
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8db840" stopOpacity=".4"/>
          <stop offset="100%" stopColor="#8db840" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[25,50,75,100].map(v=>(
        <line key={v} x1={PAD.l} x2={W-PAD.r} y1={yp(v)} y2={yp(v)}
          stroke="#ffffff10" strokeWidth={1} strokeDasharray="4,4"/>
      ))}
      <path d={area} fill="url(#hg)"/>
      <polyline points={pts} fill="none" stroke="#8db840" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      {readings.map((r,i)=>(
        <g key={i}>
          <circle cx={xp(i)} cy={yp(r.salute)} r={4} fill="#8db840" stroke="#0e1a08" strokeWidth={2}/>
          <text x={xp(i)} y={H-PAD.b+12} textAnchor="middle" fontSize={8} fill="#ffffff50" fontFamily="DM Sans,sans-serif">{r.label}</text>
        </g>
      ))}
      {[50,75].map(v=>(
        <text key={v} x={PAD.l-2} y={yp(v)+3} textAnchor="end" fontSize={7} fill="#ffffff40" fontFamily="DM Sans,sans-serif">{v}</text>
      ))}
    </svg>
  );
}

// ── Stats View ─────────────────────────────────────────────────────────────────
function StatsView({ bonsai, reminders }){
  const allLav = bonsai.flatMap(b=>(b.lavorazioni||[]).map(l=>({...l,bonsaiNome:b.nome||b.specie})));
  const monthly = getMonthlyCounts(allLav, 6);
  const byType  = getWorkTypeCounts(allLav);
  const totalLav = allLav.length;
  const totalRem = reminders.length;
  const doneRem  = reminders.filter(r=>r.completato).length;
  const pctDone  = totalRem>0 ? Math.round(doneRem/totalRem*100) : 0;

  // Most active bonsai
  const mostActive = [...bonsai].sort((a,b)=>((b.lavorazioni||[]).length)-((a.lavorazioni||[]).length))[0];

  // Health readings per bonsai (salute + label = specie troncata)
  const healthReadings = bonsai.filter(b=>b.salute!=null)
    .map(b=>({ salute:parseInt(b.salute), label:(b.nome||b.specie||"?").slice(0,6) }));

  // Average health
  const avgHealth = healthReadings.length>0
    ? Math.round(healthReadings.reduce((s,r)=>s+r.salute,0)/healthReadings.length) : null;

  const StatCard=({icon,label,value,sub})=>(
    <div style={{background:"var(--surface2)",borderRadius:14,padding:"14px 16px",flex:1,minWidth:0}}>
      <p style={{fontSize:"1.4rem",margin:0}}>{icon}</p>
      <p style={{fontSize:"1.6rem",fontWeight:700,fontFamily:"'Playfair Display',serif",margin:"4px 0 2px",lineHeight:1}}>{value}</p>
      <p style={{fontSize:".72rem",opacity:.5,margin:0}}>{label}</p>
      {sub && <p style={{fontSize:".7rem",color:"var(--moss)",margin:"3px 0 0"}}>{sub}</p>}
    </div>
  );

  return (
    <div>
      <h2 style={{marginBottom:4}}>Statistiche</h2>
      <p style={{opacity:.4,fontSize:".82rem",marginBottom:20}}>Il tuo diario bonsai</p>

      {bonsai.length===0 && (
        <div style={{textAlign:"center",padding:"60px 20px",opacity:.4}}>
          <div style={{fontSize:64}}>📊</div>
          <p style={{marginTop:12,fontFamily:"'Playfair Display',serif"}}>Aggiungi bonsai e lavorazioni per vedere le statistiche</p>
        </div>
      )}

      {bonsai.length>0 && (
        <>
          {/* KPI row */}
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            <StatCard icon="🌳" label="Bonsai" value={bonsai.length}/>
            <StatCard icon="🌿" label="Lavorazioni" value={totalLav}/>
            <StatCard icon="✅" label="Completati" value={`${pctDone}%`} sub={`${doneRem}/${totalRem} rem.`}/>
          </div>

          {avgHealth!=null && (
            <div style={{background:"var(--surface2)",borderRadius:14,padding:"14px 16px",marginBottom:16,
              display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:56,height:56,borderRadius:"50%",
                background:`conic-gradient(${avgHealth>=80?"#4ade80":avgHealth>=50?"#facc15":"#f87171"} ${avgHealth}%, #ffffff10 0)`,
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <div style={{width:42,height:42,borderRadius:"50%",background:"var(--surface2)",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:".9rem",fontWeight:700}}>
                  {avgHealth}
                </div>
              </div>
              <div>
                <p style={{margin:0,fontWeight:600}}>Salute media</p>
                <p style={{margin:"2px 0 0",fontSize:".78rem",opacity:.5}}>
                  {avgHealth>=80?"Collezione in ottima forma 💪":avgHealth>=50?"Qualche pianta da monitorare 👀":"Attenzione richiesta ⚠️"}
                </p>
              </div>
            </div>
          )}

          {/* Attività mensile */}
          <div style={{background:"var(--surface2)",borderRadius:14,padding:"16px",marginBottom:16}}>
            <p style={{fontWeight:600,marginBottom:4,fontSize:".9rem"}}>📈 Attività ultimi 6 mesi</p>
            <p style={{fontSize:".72rem",opacity:.4,marginBottom:12}}>Lavorazioni totali per mese</p>
            <BarChart data={monthly}/>
          </div>

          {/* Tipo lavorazioni */}
          {byType.length>0 && (
            <div style={{background:"var(--surface2)",borderRadius:14,padding:"16px",marginBottom:16}}>
              <p style={{fontWeight:600,marginBottom:4,fontSize:".9rem"}}>🥧 Distribuzione lavorazioni</p>
              <p style={{fontSize:".72rem",opacity:.4,marginBottom:14}}>Per tipo</p>
              <DonutChart data={byType}/>
            </div>
          )}

          {/* Salute per bonsai */}
          {healthReadings.length>0 && (
            <div style={{background:"var(--surface2)",borderRadius:14,padding:"16px",marginBottom:16}}>
              <p style={{fontWeight:600,marginBottom:4,fontSize:".9rem"}}>❤️ Salute per pianta</p>
              <p style={{fontSize:".72rem",opacity:.4,marginBottom:12}}>Punteggio AI (0–100)</p>
              <HealthLine readings={healthReadings}/>
            </div>
          )}

          {/* Bonsai più attivo */}
          {mostActive && (mostActive.lavorazioni||[]).length>0 && (
            <div style={{background:"var(--surface2)",borderRadius:14,padding:"16px",marginBottom:16,
              display:"flex",gap:14,alignItems:"center"}}>
              {mostActive.foto
                ? <img src={mostActive.foto} style={{width:56,height:56,borderRadius:10,objectFit:"cover",flexShrink:0}}/>
                : <div style={{width:56,height:56,borderRadius:10,background:"#1a2010",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>🌳</div>
              }
              <div>
                <p style={{fontSize:".7rem",opacity:.4,margin:0,letterSpacing:1}}>BONSAI PIÙ CURATO</p>
                <p style={{fontWeight:600,margin:"2px 0"}}>🏆 {mostActive.nome||mostActive.specie||"—"}</p>
                <p style={{fontSize:".78rem",opacity:.5,margin:0}}>{(mostActive.lavorazioni||[]).length} lavorazioni registrate</p>
              </div>
            </div>
          )}

          {/* Per-bonsai breakdown */}
          <div style={{background:"var(--surface2)",borderRadius:14,padding:"16px"}}>
            <p style={{fontWeight:600,marginBottom:12,fontSize:".9rem"}}>📋 Riepilogo per pianta</p>
            {bonsai.map(b=>{
              const lavs=(b.lavorazioni||[]).length;
              const myRems=reminders.filter(r=>r.bonsaiId===b.id);
              const pendRems=myRems.filter(r=>!r.completato).length;
              return (
                <div key={b.id} style={{display:"flex",alignItems:"center",gap:12,
                  padding:"10px 0",borderBottom:"1px solid var(--border)"}}>
                  {b.foto
                    ? <img src={b.foto} style={{width:40,height:40,borderRadius:8,objectFit:"cover",flexShrink:0}}/>
                    : <div style={{width:40,height:40,borderRadius:8,background:"#1a2010",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🌳</div>
                  }
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{margin:0,fontWeight:500,fontSize:".85rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.nome||b.specie||"Bonsai"}</p>
                    <p style={{margin:0,fontSize:".72rem",opacity:.4}}>{lavs} lavoraz. · {pendRems} promem. attivi</p>
                  </div>
                  {b.salute!=null && <HealthBadge score={b.salute}/>}
                  {/* Mini bar */}
                  <div style={{width:40,height:4,borderRadius:2,background:"#ffffff10",flexShrink:0}}>
                    <div style={{height:"100%",borderRadius:2,background:"var(--moss)",
                      width:`${totalLav>0?Math.round(lavs/totalLav*100):0}%`}}/>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ── Weather helpers ────────────────────────────────────────────────────────────
const WMO_ICONS = {
  0:"☀️",1:"🌤️",2:"⛅",3:"☁️",
  45:"🌫️",48:"🌫️",
  51:"🌦️",53:"🌦️",55:"🌧️",
  61:"🌧️",63:"🌧️",65:"🌧️",
  71:"🌨️",73:"🌨️",75:"❄️",
  80:"🌦️",81:"🌧️",82:"⛈️",
  95:"⛈️",96:"⛈️",99:"⛈️"
};
const WMO_DESC = {
  0:"Sereno",1:"Poco nuvoloso",2:"Parzialmente nuvoloso",3:"Nuvoloso",
  45:"Nebbia",48:"Nebbia con brina",
  51:"Pioggia leggera",53:"Pioggia moderata",55:"Pioggia intensa",
  61:"Pioggia",63:"Pioggia moderata",65:"Pioggia forte",
  71:"Neve leggera",73:"Neve",75:"Neve intensa",
  80:"Rovesci",81:"Rovesci forti",82:"Rovesci violenti",
  95:"Temporale",96:"Temporale con grandine",99:"Temporale forte"
};

function getStagione(){
  const m = TODAY.getMonth();
  if(m>=2&&m<=4) return "Primavera";
  if(m>=5&&m<=7) return "Estate";
  if(m>=8&&m<=10) return "Autunno";
  return "Inverno";
}
const STAGIONE_ICON = { Primavera:"🌸", Estate:"☀️", Autunno:"🍂", Inverno:"❄️" };

async function fetchWeather(lat, lon){
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weathercode,windspeed_10m,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum&timezone=auto&forecast_days=5`;
  const res = await fetch(url);
  return res.json();
}

// ── Weather View ───────────────────────────────────────────────────────────────
function WeatherView({ bonsai }){
  const [geo,     setGeo]     = useState(null);   // {lat,lon,city}
  const [weather, setWeather] = useState(null);
  const [geoErr,  setGeoErr]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [advice,  setAdvice]  = useState({});     // bonsaiId -> {text,loading}
  const [selBonsai, setSelBonsai] = useState(null);
  const stagione = getStagione();

  // ── Auto-load location on mount ──
  useEffect(()=>{
    const cached = sessionStorage.getItem("bonsai_geo");
    if(cached){ try{ const g=JSON.parse(cached); setGeo(g); loadWeather(g); } catch{} }
  },[]);

  async function requestGeo(){
    setLoading(true); setGeoErr(null);
    if(!navigator.geolocation){ setGeoErr("Geolocalizzazione non supportata."); setLoading(false); return; }
    navigator.geolocation.getCurrentPosition(async pos=>{
      const { latitude:lat, longitude:lon } = pos.coords;
      // Reverse geocode via nominatim
      let city = "La tua posizione";
      try{
        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const d = await r.json();
        city = d.address?.city || d.address?.town || d.address?.village || d.address?.county || city;
      } catch{}
      const g = { lat, lon, city };
      setGeo(g);
      sessionStorage.setItem("bonsai_geo", JSON.stringify(g));
      await loadWeather(g);
      setLoading(false);
    }, err=>{ setGeoErr("Permesso negato. Abilita la posizione nel browser."); setLoading(false); });
  }

  async function loadWeather(g){
    setLoading(true);
    try{
      const d = await fetchWeather(g.lat, g.lon);
      setWeather(d);
    } catch{ setGeoErr("Errore nel recupero del meteo."); }
    setLoading(false);
  }

  async function getAIAdvice(b){
    if(advice[b.id]?.text) return;
    setAdvice(a=>({...a,[b.id]:{loading:true,text:null}}));
    const w = weather?.current;
    const prompt = `Sei un esperto di bonsai. Fornisci consigli pratici BREVISSIMI (3-4 punti, max 60 parole totali) per questa pianta in questo momento.
Bonsai: ${b.specie||b.nomeComuneIt||b.nome||"specie non nota"} (${b.stile||"stile libero"})
Stagione: ${stagione}
Meteo attuale: ${w ? `${Math.round(w.temperature_2m)}°C, ${WMO_DESC[w.weathercode]||"variabile"}, umidità ${w.relative_humidity_2m}%` : stagione+" in Italia"}
Salute: ${b.salute!=null?b.salute+"/100":"non rilevata"}
Rispondi in italiano, sii diretto e pratico. Formato: lista con emoji per ogni punto.`;
    try{
      const text = await callClaude([{role:"user",content:prompt}],
        "Sei un maestro di bonsai. Rispondi SEMPRE in italiano con consigli brevi e pratici.");
      setAdvice(a=>({...a,[b.id]:{loading:false,text}}));
    } catch{
      setAdvice(a=>({...a,[b.id]:{loading:false,text:"Impossibile generare consigli al momento."}}));
    }
  }

  const cur = weather?.current;
  const daily = weather?.daily;

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
        <div>
          <h2 style={{margin:0}}>Meteo & Consigli</h2>
          <p style={{opacity:.4,fontSize:".82rem",margin:"2px 0 0"}}>{STAGIONE_ICON[stagione]} {stagione}</p>
        </div>
        {geo && <button className="btn-outline" style={{fontSize:".78rem",padding:"6px 12px"}} onClick={()=>loadWeather(geo)}>↻ Aggiorna</button>}
      </div>

      {/* ── No geo yet ── */}
      {!geo && !loading && (
        <div style={{textAlign:"center",padding:"40px 20px",background:"var(--surface2)",borderRadius:16}}>
          <div style={{fontSize:56,marginBottom:12}}>📍</div>
          <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",marginBottom:8}}>Dove si trovano i tuoi bonsai?</p>
          <p style={{fontSize:".82rem",opacity:.5,marginBottom:20}}>Il meteo locale ci permette di darti consigli precisi per la stagione</p>
          <button className="btn-primary" onClick={requestGeo}>🌍 Usa la mia posizione</button>
          {geoErr && <p style={{color:"#f87171",fontSize:".8rem",marginTop:12}}>{geoErr}</p>}
        </div>
      )}

      {loading && (
        <div style={{textAlign:"center",padding:"40px 0"}}>
          <div className="spinner"/>
          <p style={{marginTop:16,opacity:.5,fontSize:".85rem"}}>Recupero meteo…</p>
        </div>
      )}

      {geo && !loading && cur && (
        <>
          {/* ── Current weather card ── */}
          <div style={{background:"linear-gradient(135deg,#1e3a0f,#2a4a18)",borderRadius:18,
            padding:"20px",marginBottom:16,border:"1px solid #4a7a2040",position:"relative",overflow:"hidden"}}>
            {/* bg blob */}
            <div style={{position:"absolute",right:-20,top:-20,fontSize:90,opacity:.15,lineHeight:1}}>
              {WMO_ICONS[cur.weathercode]||"🌤️"}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <p style={{fontSize:".75rem",opacity:.5,margin:0,letterSpacing:1}}>📍 {geo.city.toUpperCase()}</p>
                <div style={{display:"flex",alignItems:"flex-end",gap:8,margin:"8px 0 4px"}}>
                  <span style={{fontSize:"3rem",fontFamily:"'Playfair Display',serif",lineHeight:1,fontWeight:700}}>
                    {Math.round(cur.temperature_2m)}°
                  </span>
                  <span style={{fontSize:"1.2rem",marginBottom:8}}>{WMO_ICONS[cur.weathercode]||"🌤️"}</span>
                </div>
                <p style={{margin:0,fontSize:".85rem",opacity:.7}}>{WMO_DESC[cur.weathercode]||"Variabile"}</p>
                <p style={{margin:"4px 0 0",fontSize:".75rem",opacity:.5}}>
                  Percepita {Math.round(cur.apparent_temperature)}° · Umidità {cur.relative_humidity_2m}% · Vento {Math.round(cur.windspeed_10m)} km/h
                </p>
              </div>
            </div>
          </div>

          {/* ── 5-day forecast ── */}
          {daily && (
            <div style={{background:"var(--surface2)",borderRadius:14,padding:"14px 16px",marginBottom:16}}>
              <p style={{fontSize:".75rem",opacity:.4,letterSpacing:1,marginBottom:12}}>PREVISIONI 5 GIORNI</p>
              <div style={{display:"flex",gap:0,overflowX:"auto"}}>
                {daily.time.slice(0,5).map((t,i)=>{
                  const d=new Date(t);
                  const isToday=i===0;
                  return (
                    <div key={i} style={{flex:"0 0 20%",textAlign:"center",padding:"8px 4px",
                      borderRadius:10,background:isToday?"#ffffff10":"transparent"}}>
                      <p style={{fontSize:".68rem",opacity:.5,margin:"0 0 4px"}}>{isToday?"Oggi":DAYS[d.getDay()]}</p>
                      <p style={{fontSize:"1.3rem",margin:"0 0 4px"}}>{WMO_ICONS[daily.weathercode[i]]||"🌤️"}</p>
                      <p style={{fontSize:".72rem",fontWeight:600,margin:0}}>{Math.round(daily.temperature_2m_max[i])}°</p>
                      <p style={{fontSize:".68rem",opacity:.4,margin:0}}>{Math.round(daily.temperature_2m_min[i])}°</p>
                      {daily.precipitation_sum[i]>0 && (
                        <p style={{fontSize:".62rem",color:"#60a5fa",margin:"2px 0 0"}}>💧{daily.precipitation_sum[i].toFixed(1)}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Seasonal general tips ── */}
          <div style={{background:"var(--surface2)",borderRadius:14,padding:"14px 16px",marginBottom:16}}>
            <p style={{fontSize:".75rem",opacity:.4,letterSpacing:1,marginBottom:10}}>CONSIGLI STAGIONALI · {stagione.toUpperCase()}</p>
            {stagione==="Primavera" && <>
              <Tip icon="🌱" text="Periodo ideale per il rinvaso (entro fine aprile per la maggior parte delle specie)."/>
              <Tip icon="✂️" text="Inizia la potatura di struttura dopo la ripresa vegetativa."/>
              <Tip icon="🌿" text="Riprendi la concimazione con fertilizzante bilanciato (N-P-K 10-10-10)."/>
              <Tip icon="💧" text="Aumenta l'irrigazione con il crescere delle temperature."/>
            </>}
            {stagione==="Estate" && <>
              <Tip icon="💧" text="Irrigazione quotidiana o due volte al giorno nelle giornate più calde."/>
              <Tip icon="🌿" text="Concima ogni 2 settimane con fertilizzante povero di azoto."/>
              <Tip icon="☀️" text="Proteggi le specie delicate dall'esposizione diretta nelle ore più calde."/>
              <Tip icon="🍃" text="Pinzatura dei rami per mantenere la forma compatta."/>
            </>}
            {stagione==="Autunno" && <>
              <Tip icon="🍂" text="Riduci la concimazione, passa a un fertilizzante con meno azoto."/>
              <Tip icon="💧" text="Diminuisci gradualmente l'irrigazione."/>
              <Tip icon="🔩" text="Periodo ideale per applicazione del filo (agosto-settembre per specie decidue)."/>
              <Tip icon="🛡️" text="Prepara la protezione invernale per specie sensibili al gelo."/>
            </>}
            {stagione==="Inverno" && <>
              <Tip icon="❄️" text="Riduce al minimo l'irrigazione; verifica solo che il substrato non si asciughi del tutto."/>
              <Tip icon="🌡️" text="Proteggi le specie tropicali dal freddo (min 8-10°C per ficus e simili)."/>
              <Tip icon="😴" text="Non concimare: le piante sono in riposo vegetativo."/>
              <Tip icon="👁️" text="Controlla regolarmente la presenza di parassiti invernali."/>
            </>}
          </div>

          {/* ── Per-bonsai AI advice ── */}
          {bonsai.length>0 && (
            <div>
              <p style={{fontSize:".75rem",opacity:.4,letterSpacing:1,marginBottom:12}}>CONSIGLI AI PER LE TUE PIANTE</p>
              {bonsai.map(b=>(
                <div key={b.id} style={{background:"var(--surface2)",borderRadius:14,marginBottom:10,overflow:"hidden",
                  border:`1px solid ${selBonsai===b.id?"var(--moss)":"transparent"}`}}>
                  {/* Header */}
                  <div style={{display:"flex",gap:12,alignItems:"center",padding:"12px 14px",cursor:"pointer"}}
                    onClick={()=>{
                      setSelBonsai(s=>s===b.id?null:b.id);
                      if(selBonsai!==b.id) getAIAdvice(b);
                    }}>
                    {b.foto
                      ? <img src={b.foto} style={{width:44,height:44,borderRadius:10,objectFit:"cover",flexShrink:0}}/>
                      : <div style={{width:44,height:44,borderRadius:10,background:"#1a2010",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>🌳</div>
                    }
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{margin:0,fontWeight:600,fontSize:".88rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.nome||b.specie||"Bonsai"}</p>
                      <p style={{margin:0,fontSize:".72rem",opacity:.5}}>{b.specie||b.nomeComuneIt||"—"}</p>
                    </div>
                    <span style={{fontSize:".85rem",opacity:.5,transition:"transform .2s",
                      transform:selBonsai===b.id?"rotate(90deg)":"none"}}>›</span>
                  </div>

                  {/* AI advice panel */}
                  {selBonsai===b.id && (
                    <div style={{borderTop:"1px solid var(--border)",padding:"14px"}}>
                      {advice[b.id]?.loading && (
                        <div style={{display:"flex",alignItems:"center",gap:10,opacity:.6}}>
                          <div className="spinner" style={{width:20,height:20,borderWidth:2}}/>
                          <span style={{fontSize:".82rem"}}>Chiedo consiglio all'AI…</span>
                        </div>
                      )}
                      {advice[b.id]?.text && (
                        <div>
                          <p style={{fontSize:".72rem",opacity:.4,letterSpacing:1,marginBottom:8}}>🤖 CONSIGLI AI · {stagione.toUpperCase()}</p>
                          <p style={{fontSize:".85rem",lineHeight:1.6,margin:0,whiteSpace:"pre-line"}}>{advice[b.id].text}</p>
                          <button className="btn-outline" style={{fontSize:".75rem",padding:"5px 12px",marginTop:12,width:"100%"}}
                            onClick={()=>{ setAdvice(a=>({...a,[b.id]:null})); setTimeout(()=>getAIAdvice(b),50); }}>
                            🔄 Rigenera consigli
                          </button>
                        </div>
                      )}
                      {!advice[b.id] && (
                        <button className="btn-primary" style={{width:"100%",fontSize:".85rem"}}
                          onClick={()=>getAIAdvice(b)}>
                          🤖 Genera consigli AI
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Tip({ icon, text }){
  return (
    <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8}}>
      <span style={{fontSize:"1rem",flexShrink:0}}>{icon}</span>
      <p style={{margin:0,fontSize:".82rem",opacity:.8,lineHeight:1.5}}>{text}</p>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App(){
  const [data, setData]   = useState(loadData);
  const [tab,  setTab]    = useState("home");

  // Modals
  const [showBonsaiForm,  setShowBonsaiForm]  = useState(false);
  const [editingBonsai,   setEditingBonsai]   = useState(null);
  const [detailBonsai,    setDetailBonsai]    = useState(null);
  const [showLavModal,    setShowLavModal]    = useState(false);
  const [showRemModal,    setShowRemModal]    = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [prefilledDate,   setPrefilledDate]   = useState(null);

  // Auto-save
  useEffect(()=>saveData(data),[data]);

  const { bonsai, reminders } = data;

  // ── CRUD helpers ──
  const saveBonsai = (b)=>{
    setData(d=>{
      const list = d.bonsai.find(x=>x.id===b.id)
        ? d.bonsai.map(x=>x.id===b.id?b:x)
        : [...d.bonsai, b];
      return {...d, bonsai:list};
    });
    setShowBonsaiForm(false); setEditingBonsai(null);
    if(detailBonsai) setDetailBonsai(b);
  };

  const deleteBonsai = (id)=>{
    setData(d=>({...d, bonsai:d.bonsai.filter(b=>b.id!==id), reminders:d.reminders.filter(r=>r.bonsaiId!==id)}));
    setDetailBonsai(null);
  };

  const saveLavorazione = (bonsaiId, lav, reminder)=>{
    setData(d=>{
      const list = d.bonsai.map(b=>{
        if(b.id!==bonsaiId) return b;
        return {...b, lavorazioni:[...(b.lavorazioni||[]), lav]};
      });
      const rems = reminder ? [...d.reminders, reminder] : d.reminders;
      return {...d, bonsai:list, reminders:rems};
    });
    setShowLavModal(false);
    // refresh detail
    if(detailBonsai?.id===bonsaiId)
      setData(d=>{ const b=d.bonsai.find(x=>x.id===bonsaiId); if(b) setDetailBonsai(b); return d; });
  };

  const deleteLavorazione = (bonsaiId, lavId)=>{
    setData(d=>{
      const list = d.bonsai.map(b=>{
        if(b.id!==bonsaiId) return b;
        return {...b, lavorazioni:(b.lavorazioni||[]).filter(l=>l.id!==lavId)};
      });
      return {...d, bonsai:list};
    });
  };

  const saveReminder = (r)=>{
    setData(d=>{
      const list = d.reminders.find(x=>x.id===r.id)
        ? d.reminders.map(x=>x.id===r.id?r:x)
        : [...d.reminders, r];
      return {...d, reminders:list};
    });
    setShowRemModal(false); setEditingReminder(null);
  };

  const toggleReminder = (id)=>{
    setData(d=>({...d, reminders:d.reminders.map(r=>r.id===id?{...r,completato:!r.completato}:r)}));
  };

  const deleteReminder = (id)=>{
    setData(d=>({...d, reminders:d.reminders.filter(r=>r.id!==id)}));
  };

  // Badge counts
  const urgentCount = reminders.filter(r=>!r.completato && daysFromNow(r.data)!=null && daysFromNow(r.data)<=7).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root{
          --bg:#0e1a08; --surface:#16220f; --surface2:#1e2e15;
          --moss:#8db840; --moss2:#6a9630; --text:#e8eed8;
          --border:#ffffff18;
        }
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;min-height:100dvh;overscroll-behavior:none;}
        h1,h2,h3,h4{font-family:'Playfair Display',serif;}

        .app{max-width:480px;margin:0 auto;display:flex;flex-direction:column;min-height:100dvh;position:relative;}
        .scroll-area{flex:1;overflow-y:auto;padding:24px 16px 100px;-webkit-overflow-scrolling:touch;}
        .scroll-area::-webkit-scrollbar{display:none;}

        /* Bottom Nav */
        .bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:480px;
          background:#111d0a;border-top:1px solid var(--border);display:flex;align-items:center;
          padding:8px 0 env(safe-area-inset-bottom,8px);z-index:100;}
        .nav-item{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;
          padding:6px 4px;border:none;background:none;color:var(--text);transition:all .2s;position:relative;}
        .nav-item span:first-child{font-size:1.3rem;}
        .nav-item span:last-child{font-size:0.6rem;opacity:.5;letter-spacing:.5px;font-weight:500;}
        .nav-item.active span:last-child{opacity:1;color:var(--moss);}
        .nav-item.active span:first-child{filter:drop-shadow(0 0 6px var(--moss));}
        .badge{position:absolute;top:4px;right:calc(50% - 16px);background:#f87171;color:#fff;
          font-size:.55rem;font-weight:700;width:14px;height:14px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;}

        /* Modals */
        .modal-overlay{position:fixed;inset:0;background:#000000b0;z-index:200;display:flex;align-items:flex-end;
          animation:fadeIn .15s ease;}
        .modal-box{background:var(--surface);border-radius:20px 20px 0 0;width:100%;max-height:90dvh;
          overflow-y:auto;padding:24px 20px;animation:slideUp .25s cubic-bezier(.22,1,.36,1);}
        .modal-box::-webkit-scrollbar{display:none;}
        .detail-box{border-radius:20px 20px 0 0;padding:0 20px 24px;}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}

        /* Inputs */
        .input{background:#ffffff0c;border:1px solid var(--border);color:var(--text);
          padding:10px 14px;border-radius:10px;font-size:.9rem;font-family:'DM Sans',sans-serif;
          width:100%;outline:none;transition:border .2s;}
        .input:focus{border-color:var(--moss);}
        select.input option{background:#1e2e15;}

        /* Buttons */
        .btn-primary{background:var(--moss);color:#0a1200;border:none;padding:10px 20px;
          border-radius:10px;font-weight:700;cursor:pointer;font-size:.9rem;font-family:'DM Sans',sans-serif;
          transition:background .2s;}
        .btn-primary:hover{background:var(--moss2);}
        .btn-outline{background:transparent;color:var(--text);border:1px solid var(--border);padding:10px 16px;
          border-radius:10px;cursor:pointer;font-size:.9rem;font-family:'DM Sans',sans-serif;transition:border .2s;}
        .btn-outline:hover{border-color:var(--moss);}
        .nav-btn{background:#ffffff10;border:none;color:var(--text);width:36px;height:36px;
          border-radius:50%;cursor:pointer;font-size:1.2rem;}

        /* Toggle */
        .toggle{width:40px;height:22px;border-radius:11px;background:#ffffff20;cursor:pointer;
          position:relative;transition:background .2s;flex-shrink:0;}
        .toggle::after{content:"";position:absolute;top:3px;left:3px;width:16px;height:16px;
          border-radius:50%;background:#fff;transition:transform .2s;}
        .toggle.on{background:var(--moss);}
        .toggle.on::after{transform:translateX(18px);}

        /* Chips */
        .chip{background:#ffffff0f;border:1px solid var(--border);border-radius:20px;
          padding:3px 10px;font-size:.75rem;color:var(--text);opacity:.8;}

        /* Info row */
        .info-row{display:flex;justify-content:space-between;align-items:center;
          padding:6px 0;border-bottom:1px solid var(--border);font-size:.85rem;}
        .info-row span:first-child{opacity:.5;}

        /* Spinner */
        .spinner{width:36px;height:36px;border:3px solid #ffffff20;border-top-color:var(--moss);
          border-radius:50%;animation:spin .8s linear infinite;margin:0 auto;}
        @keyframes spin{to{transform:rotate(360deg)}}

        /* Bonsai card */
        .bonsai-card{background:var(--surface);border-radius:16px;overflow:hidden;cursor:pointer;
          border:1px solid var(--border);transition:transform .2s,border-color .2s;}
        .bonsai-card:hover{transform:translateY(-2px);border-color:var(--moss);}
      `}</style>

      <div className="app">
        <div className="scroll-area">

          {/* ─── HOME ─── */}
          {tab==="home" && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
                <div>
                  <h1 style={{fontSize:"1.8rem",lineHeight:1.1}}>I miei<br/>Bonsai</h1>
                  <p style={{opacity:.5,fontSize:".85rem",marginTop:4}}>{bonsai.length} {bonsai.length===1?"pianta":"piante"}</p>
                </div>
                <button className="btn-primary" onClick={()=>{ setEditingBonsai(null); setShowBonsaiForm(true); }}>+ Aggiungi</button>
              </div>

              {bonsai.length===0 && (
                <div style={{textAlign:"center",padding:"60px 20px",opacity:.4}}>
                  <div style={{fontSize:72,marginBottom:16}}>🌱</div>
                  <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem"}}>Aggiungi il tuo primo bonsai</p>
                  <p style={{fontSize:".82rem",marginTop:8}}>Scatta una foto e lascia che l'AI identifichi la specie</p>
                </div>
              )}

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {bonsai.map(b=>{
                  const nextRem = reminders.filter(r=>r.bonsaiId===b.id && !r.completato)
                    .sort((a,c)=>a.data.localeCompare(c.data))[0];
                  return (
                    <div key={b.id} className="bonsai-card" onClick={()=>setDetailBonsai(b)}>
                      <div style={{height:140,background:"#1a2010",position:"relative"}}>
                        {b.foto
                          ? <img src={b.foto} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                          : <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",fontSize:48,opacity:.3}}>🌳</div>
                        }
                        {b.salute!=null && (
                          <div style={{position:"absolute",top:8,right:8}}>
                            <HealthBadge score={b.salute}/>
                          </div>
                        )}
                      </div>
                      <div style={{padding:"10px 12px"}}>
                        <p style={{fontWeight:600,fontSize:".88rem",margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.nome||b.specie||"Bonsai"}</p>
                        <p style={{fontSize:".75rem",opacity:.5,margin:"2px 0 0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.specie||b.nomeComuneIt||"—"}</p>
                        {nextRem && (
                          <p style={{fontSize:".7rem",marginTop:6,color:"var(--moss)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                            {WORK_ICONS[nextRem.tipo]} {nextRem.nota||nextRem.tipo}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Upcoming reminders strip */}
              {urgentCount>0 && (
                <div style={{marginTop:28,background:"#f8717110",border:"1px solid #f8717140",borderRadius:14,padding:"14px 16px"}}>
                  <p style={{fontSize:".8rem",color:"#f87171",fontWeight:600,marginBottom:8}}>⚠️ {urgentCount} lavori urgenti nei prossimi 7 giorni</p>
                  {reminders.filter(r=>!r.completato && daysFromNow(r.data)!=null && daysFromNow(r.data)<=7)
                    .sort((a,b)=>a.data.localeCompare(b.data)).slice(0,3).map(r=>(
                    <div key={r.id} style={{display:"flex",gap:10,alignItems:"center",padding:"5px 0"}}>
                      <span style={{fontSize:".95rem"}}>{WORK_ICONS[r.tipo]}</span>
                      <div style={{flex:1}}>
                        <p style={{margin:0,fontSize:".82rem"}}>{r.nota||r.tipo} · {r.bonsaiNome||bonsai.find(b=>b.id===r.bonsaiId)?.nome||"?"}</p>
                      </div>
                      <span style={{fontSize:".72rem",color:"#f87171"}}>{fmtDate(r.data)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── CALENDAR ─── */}
          {tab==="calendar" && (
            <div>
              <h2 style={{marginBottom:20}}>Calendario</h2>
              <CalendarView
                reminders={reminders} bonsaiList={bonsai}
                onAddReminder={(d)=>{ setPrefilledDate(d); setEditingReminder(null); setShowRemModal(true); }}
                onEditReminder={(r)=>{ setEditingReminder(r); setShowRemModal(true); }}
                onToggleReminder={toggleReminder}/>
            </div>
          )}

          {/* ─── WEATHER ─── */}
          {tab==="weather" && (
            <WeatherView bonsai={bonsai}/>
          )}

          {/* ─── STATS ─── */}
          {tab==="stats" && (
            <StatsView bonsai={bonsai} reminders={reminders}/>
          )}

          {/* ─── REMINDERS ─── */}
          {tab==="reminders" && (
            <RemindersView
              reminders={reminders} bonsaiList={bonsai}
              onAdd={()=>{ setEditingReminder(null); setShowRemModal(true); }}
              onEdit={(r)=>{ setEditingReminder(r); setShowRemModal(true); }}
              onToggle={toggleReminder}
              onDelete={deleteReminder}/>
          )}

        </div>

        {/* Bottom Nav */}
        <nav className="bottom-nav">
          {[
            { id:"home",      label:"Bonsai",    icon:"🌳" },
            { id:"calendar",  label:"Calendario",icon:"📅" },
            { id:"reminders", label:"Promemoria", icon:"🔔", badge: urgentCount },
            { id:"weather",   label:"Meteo",      icon:"☀️" },
            { id:"stats",     label:"Statistiche",icon:"📊" },
          ].map(t=>(
            <button key={t.id} className={`nav-item ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>
              <span>{t.icon}</span>
              <span>{t.label}</span>
              {t.badge>0 && <div className="badge">{t.badge}</div>}
            </button>
          ))}
        </nav>

        {/* ─── MODALS ─── */}
        {showBonsaiForm && (
          <BonsaiFormModal
            bonsai={editingBonsai}
            onSave={saveBonsai}
            onClose={()=>{ setShowBonsaiForm(false); setEditingBonsai(null); }}/>
        )}

        {detailBonsai && (
          <BonsaiDetail
            bonsai={detailBonsai}
            reminders={reminders}
            onEdit={()=>{ setEditingBonsai(detailBonsai); setShowBonsaiForm(true); }}
            onAddLav={()=>setShowLavModal(true)}
            onClose={()=>setDetailBonsai(null)}
            onDeleteLav={(bId,lId)=>{ deleteLavorazione(bId,lId); setDetailBonsai(d=>({...d,lavorazioni:(d.lavorazioni||[]).filter(l=>l.id!==lId)})); }}
          />
        )}

        {showLavModal && detailBonsai && (
          <LavorazioneModal
            bonsaiId={detailBonsai.id}
            bonsaiNome={detailBonsai.nome||detailBonsai.specie}
            onSave={(lav,rem)=>{
              saveLavorazione(detailBonsai.id, lav, rem);
              // aggiorna detail panel
              setDetailBonsai(d=>({...d, lavorazioni:[...(d.lavorazioni||[]), lav]}));
              setShowLavModal(false);
            }}
            onClose={()=>setShowLavModal(false)}/>
        )}

        {showRemModal && (
          <ReminderModal
            bonsaiList={bonsai}
            reminder={editingReminder ? editingReminder : (prefilledDate ? {
              id:genId(), bonsaiId:"", bonsaiNome:"", tipo:"Concimazione",
              data:prefilledDate, nota:"", completato:false
            } : null)}
            onSave={saveReminder}
            onClose={()=>{ setShowRemModal(false); setEditingReminder(null); setPrefilledDate(null); }}/>
        )}

      </div>
    </>
  );
}
