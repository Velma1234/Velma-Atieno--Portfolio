
// DARK MODE TOGGLE
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check if user has a saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update button icon
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});


// SMOOTH SCROLLING FOR NAVIGATION
const navLinks = document.querySelectorAll('.navLinks a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu if open
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});


// MOBILE MENU TOGGLE

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinksEl = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinksEl.classList.toggle('active');
    // Change icon
    mobileMenuBtn.textContent = navLinksEl.classList.contains('active') ? '✕' : '☰';
});


// ACTIVE SECTION HIGHLIGHTING ON SCROLL
// Highlights current section in nav as you scroll

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});