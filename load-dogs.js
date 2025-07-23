fetch('data/dogs.json')
  .then(res => res.json())
  .then(dogs => {
    const container = document.querySelector('.cards');
    container.innerHTML = '';

    dogs.forEach(dog => {
      container.innerHTML += `
        <div class="card dog-card">
          <img src="${dog.immagine}" alt="${dog.nome}">
          <h3>${dog.nome}</h3>
          <p>📍 ${dog.luogo} — ${dog.descrizione}</p>
          <p>🐾 ${dog.note}</p>
          <a href="https://wa.me/${dog.whatsapp}?text=Vorrei+informazioni+su+${dog.nome}" class="btn">Contattaci</a>
        </div>`;
    });
  });
