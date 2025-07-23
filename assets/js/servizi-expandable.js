document.querySelectorAll('.card.servizio').forEach(card => {
  const descText = card.dataset.desc;
  const descDiv = document.createElement('div');
  descDiv.classList.add('desc');
  descDiv.textContent = descText;
  descDiv.style.display = 'none'; // inizialmente nascosto
  card.appendChild(descDiv);

  card.addEventListener('click', () => {
    const isVisible = descDiv.style.display === 'block';
    descDiv.style.display = isVisible ? 'none' : 'block';
  });
});
