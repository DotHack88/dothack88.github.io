const slides = document.querySelector('.slides');
const totalSlides = slides.children.length;
let currentIndex = 0;

const dotsContainer = document.querySelector('.dots');

// Crea i pallini in base al numero di slide
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('button');
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateSlider();
    resetAutoSlide();
  });
  dotsContainer.appendChild(dot);
}

// Funzione per aggiornare slider e dots
function updateSlider() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  const dots = dotsContainer.children;
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.toggle('active', i === currentIndex);
  }
}

// Auto slide con reset dopo click manuale
let autoSlideInterval = setInterval(nextSlide, 4000);

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 4000);
}

// Inizializza
updateSlider();
