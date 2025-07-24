document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('recensioneForm');
  const lista = document.getElementById('recensioniList');

  // Carica recensioni da localStorage
  function caricaRecensioni() {
    const data = JSON.parse(localStorage.getItem('recensioni')) || [];
    lista.innerHTML = '';

    data.forEach(rec => {
      const div = document.createElement('div');
      div.className = 'recensione';
      div.innerHTML = `
        <p><strong>${rec.nome || 'Anonimo'}</strong> – ${'⭐'.repeat(rec.voto)}</p>
        <p>${rec.testo}</p>
        ${rec.foto ? `<img src="${rec.foto}" alt="foto recensione" style="max-width:200px;">` : ''}
        <hr>
      `;
      lista.appendChild(div);
    });
  }

  caricaRecensioni();

  // Salva nuova recensione
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    const nome = formData.get('nome');
    const email = formData.get('email');
    const voto = parseInt(formData.get('voto'));
    const testo = formData.get('testo');
    const file = formData.get('foto');

    const reader = new FileReader();
    reader.onload = function () {
      const fotoBase64 = file && file.size > 0 ? reader.result : null;

      const nuovaRecensione = {
        nome,
        email,
        voto,
        testo,
        foto: fotoBase64
      };

      const recensioni = JSON.parse(localStorage.getItem('recensioni')) || [];
      recensioni.push(nuovaRecensione);
      localStorage.setItem('recensioni', JSON.stringify(recensioni));
      form.reset();
      caricaRecensioni();
    };

    if (file && file.size > 0) {
      reader.readAsDataURL(file);
    } else {
      reader.onload(); // Nessuna foto, procedi
    }
  });
});
