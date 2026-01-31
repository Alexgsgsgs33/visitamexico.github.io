// Navegación responsive
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Slider Hero
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    
    // Cambio automático cada 5 segundos
    setInterval(() => showSlide(currentSlide + 1), 5000);
}

// Mapa interactivo
function initMap() {
    if (document.getElementById('map')) {
        const map = L.map('map').setView([19.935, -97.958], 9);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Marcador Zacatlán
        L.marker([19.9333, -97.9583])
            .addTo(map)
            .bindPopup('<b>Zacatlán de las Manzanas</b><br>Pueblo Mágico')
            .openPopup();
        
        // Marcador Chignahuapan
        L.marker([19.8386, -98.0317])
            .addTo(map)
            .bindPopup('<b>Chignahuapan</b><br>Tierra de esferas');
        
        // Línea entre ambos pueblos
        L.polyline([
            [19.9333, -97.9583],
            [19.8386, -98.0317]
        ], {
            color: 'green',
            weight: 3,
            opacity: 0.7
        }).addTo(map);
    }
}

// Inicializar mapa cuando se cargue la página
document.addEventListener('DOMContentLoaded', initMap);

// Sistema de "reservas" (simulado para localhost)
document.querySelectorAll('.btn-reservar').forEach(button => {
    button.addEventListener('click', function() {
        const hotelName = this.closest('.hotel-card').querySelector('h4').textContent;
        alert(`Para reservar en ${hotelName}, contacta al:\n📞 797 975 1045 (Zacatlán)\n📞 797 971 0046 (Chignahuapan)\n\n*Este es un sistema de demostración para host local*`);
    });
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.info-card, .hotel-card, .lugar-card, .tip-card').forEach(el => {
    observer.observe(el);
});