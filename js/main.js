document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);

    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burger.classList.remove('active');
                }
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Animate stats counters
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.about-stats');
    
    function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const current = parseInt(stat.textContent) || 0;
        
        // Если уже достигли цели, пропускаем
        if (current >= target) return;
        
        const duration = 2000;
        const step = Math.max(1, (target - current) / (duration / 16));
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
}
    
    window.addEventListener('scroll', animateStats);

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-level');
    const skillsSection = document.querySelector('.skills');
    
    function animateSkills() {
        const rect = skillsSection.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight - 100 && rect.bottom >= 0);
        
        if (isVisible) {
            skillBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
            });
            
            // Remove event listener after animation
            window.removeEventListener('scroll', animateSkills);
        }
    }
    
    window.addEventListener('scroll', animateSkills);

    // Project filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            // You would implement actual filtering logic here
            // For now it's just a placeholder
            console.log('Filter by:', filter);
        });
    });

    // Initialize animations on page load
    animateStats();
    animateSkills();
});