document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav-links li a');

    // 1. Toggle Menu Open/Close
    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
            mobileMenu.classList.toggle('is-active'); // For animating the bars to an 'X'
        });
    }

    // 2. Close Menu when a link is clicked (important for one-page scrolling)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenu.classList.remove('is-active');
        });
    });
});

// Function to handle scroll visibility
function handleScroll() {
    const btn = document.querySelector('.back-to-top');
    if (btn) {
        // Checking distance (300px) - works on Mobile Safari and Chrome
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrolled > 300) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    }
}

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

// Handle the click to go up
document.querySelector('.back-to-top')?.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});