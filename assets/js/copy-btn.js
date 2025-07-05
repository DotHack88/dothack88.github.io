document.querySelectorAll('pre code').forEach(block => {
  const btn = document.createElement('span');
  btn.className = 'copy-btn';
  btn.textContent = 'copy';
  block.parentNode.insertBefore(btn, block);
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(block.textContent);
    btn.textContent = 'copied!';
    setTimeout(()=> btn.textContent = 'copy', 2000);
  });
});
