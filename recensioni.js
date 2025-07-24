document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reviewForm');
  const recensioniList = document.getElementById('recensioniList');

  // Carica le recensioni salvate
  const recensioni = JSON.parse(localStorage.getItem('recensioni')) || [];
  recensioni.forEach(showRecensione);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value || "Anonimo";
    const email = document.getElementById('email').value || "Non fornita";
    const voto = parseInt(document.getElementById('voto').value);
    const testo = document.getElementById('testo').value;
    const fotoInput = document.getElementById('foto');

    const reader = new FileReader();
    reader.onload = function () {
      const foto = reader.result;

      const nuovaRecensione = { nome, email, voto, testo, foto };
      recensioni.push(nuovaRecensione);
      localStorage.setItem('recensioni', JSON.stringify(recensioni));

      showRecensione(nuovaRecensione);
      form.reset();
    };

    if (fotoInput.files[0]) {
      reader.readAsDataURL(fotoInput.files[0]);
    } else {
      const nuovaRecensione = { nome, email, voto, testo, foto: null };
      recensioni.push(nuovaRecensione);
      localStorage.setItem('recensioni', JSON.stringify(recensioni));
      showRecensione(nuovaRecensione);
      form.reset();
    }
  });

  function showRecensione({ nome, email, voto, testo, foto }) {
    const div = document.createElement('div');
    div.classList.add('recensione');

    const stelle = '⭐'.repeat(voto);
    div.innerHTML = `
      <p><strong>${nome}</strong> - <span class="stelle">${stelle}</span></p>
      <p>${testo}</p>
      ${foto ? `<img src="${foto}" alt="Foto utente" />` : ''}
    `;

    recensioniList.prepend(div);
  }
});
