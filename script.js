// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {

    // === Preloader ===
    const pageLoader = document.getElementById('pageLoader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (pageLoader) {
                pageLoader.style.opacity = '0';
                setTimeout(() => {
                    pageLoader.style.display = 'none';
                }, 500);
            }
        }, 800); // 800ms to show the cool animation
    });

    // === Mobile Menu Toggle ===
    const toggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const isExpanded = navLinks.classList.contains('show');
            toggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close on link click
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // === Header Scrolled State ===
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // === Smooth Scroll ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === FAQ Accordion Logic ===
    const faqQuestions = document.querySelectorAll('.faq-q');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // Close all
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.style.maxHeight = null;
            });

            // Open clicked
            if (!isExpanded) {
                question.setAttribute('aria-expanded', 'true');
                const answer = question.nextElementSibling;
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // === Intersection Observer for Fade-Up Animations ===
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => fadeObserver.observe(el));

    // === Dynamic Cursor Glow (Optional advanced UI) ===
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (cursorGlow.style.opacity === '0' || cursorGlow.style.opacity === '') {
                cursorGlow.style.opacity = '1';
            }
        });

        // Smooth follow
        function animateCursor() {
            const ease = 0.15;
            currentX += (mouseX - currentX) * ease;
            currentY += (mouseY - currentY) * ease;
            cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hide on leave
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }

    // === Form Submission Mock ===
    const contactForm = document.querySelector('.sleek-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Procesando...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '¡Solicitud Recibida! ✓';
                btn.style.background = '#10b981';
                btn.style.opacity = '1';
                this.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 4000);
            }, 1500);
        });
    }
});

console.log('InfoSolutions 2026 Engine Initialized ✦');