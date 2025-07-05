const btn = document.getElementById('theme-toggle');
btn.addEventListener('click', ()=> {
  const body = document.body;
  const dark = body.classList.toggle('dark');
  body.classList.toggle('light', !dark);
  btn.textContent = dark ? '☀️' : '🌙';
});
