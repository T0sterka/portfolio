// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Фиксированная шапка при прокрутке
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Отправка формы
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь можно добавить код для отправки формы
        alert('Сообщение отправлено! Я свяжусь с вами в ближайшее время.');
        this.reset();
    });
}

// Анимация при прокрутке
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.project-card, .skill');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Инициализация анимации
window.addEventListener('scroll', animateOnScroll);

// Установка начальных стилей для анимации
document.querySelectorAll('.project-card, .skill').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
});

// Запуск анимации при загрузке
window.addEventListener('load', animateOnScroll);