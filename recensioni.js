document.getElementById('recensione-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = this.nome.value;
  const testo = this.testo.value;
  const fotoFile = this.foto.files[0];

  if (!fotoFile) return alert("Carica una foto!");

  const reader = new FileReader();
  reader.onload = function (event) {
    const nuovaRecensione = {
      nome,
      testo,
      foto: event.target.result
    };

    const recensioni = JSON.parse(localStorage.getItem("recensioni")) || [];
    recensioni.push(nuovaRecensione);
    localStorage.setItem("recensioni", JSON.stringify(recensioni));
    mostraRecensioni();
    document.getElementById("recensione-form").reset();
  };
  reader.readAsDataURL(fotoFile);
});

function mostraRecensioni() {
  const recensioni = JSON.parse(localStorage.getItem("recensioni")) || [];
  const container = document.getElementById("recensioni-lista");
  container.innerHTML = "";

  recensioni.forEach(r => {
    const div = document.createElement("div");
    div.className = "recensione";
    div.innerHTML = `
      <strong>${r.nome}</strong>
      <p>${r.testo}</p>
      <img src="${r.foto}" alt="Foto di ${r.nome}" />
    `;
    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", mostraRecensioni);
