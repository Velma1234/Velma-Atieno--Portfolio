 // ========================================
        // DARK MODE TOGGLE
        // This checks if user previously selected a theme and applies it
        // ========================================
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        // Check if user has a saved theme preference in localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        }

        // Toggle theme when button is clicked
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Update button icon and save preference
            if (body.classList.contains('dark-mode')) {
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });

        // ========================================
        // SMOOTH SCROLLING FOR NAVIGATION
        // When you click a nav link, it smoothly scrolls to that section
        // ========================================
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get target section ID from href attribute
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                // Smooth scroll to the section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link styling
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu if it's open
                document.getElementById('navLinks').classList.remove('active');
            });
        });

        // ========================================
        // MOBILE MENU TOGGLE
        // Shows/hides navigation menu on mobile devices
        // ========================================
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navLinksEl = document.getElementById('navLinks');

        mobileMenuBtn.addEventListener('click', () => {
            navLinksEl.classList.toggle('active');
            // Change icon between hamburger and X
            mobileMenuBtn.textContent = navLinksEl.classList.contains('active') ? '✕' : '☰';
        });

        // ========================================
        // ACTIVE SECTION HIGHLIGHTING ON SCROLL
        // As you scroll, it highlights the current section in nav
        // ========================================
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            // Check which section is currently in view
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // ========================================
        // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
        // Sections fade in as you scroll to them
        // ========================================
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // When section enters viewport, fade it in
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections for animation
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
