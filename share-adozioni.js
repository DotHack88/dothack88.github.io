document.querySelectorAll('.share-btn').forEach(button => {
  button.addEventListener('click', async () => {
    const id = button.dataset.id;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Adozione: ' + id,
          url: url
        });
      } catch (err) {
        console.log('Condivisione annullata', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copiato negli appunti!");
      } catch {
        alert("Errore durante la copia del link.");
      }
    }
  });
});
