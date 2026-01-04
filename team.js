document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.review-card');
    let autoScrollInterval;

    // --- SCROLL FUNCTION ---
    window.moveSlide = function(direction) {
        if (!container || cards.length === 0) return;
        
        const cardWidth = cards[0].offsetWidth + 20; // Width + Gap
        const maxScroll = container.scrollWidth - container.clientWidth;

        // Loop Logic: If moving right at the end, jump to start. 
        // If moving left at start, jump to end.
        if (direction === 1 && container.scrollLeft >= maxScroll - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else if (direction === -1 && container.scrollLeft <= 10) {
            container.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
            container.scrollBy({
                left: direction * cardWidth,
                behavior: 'smooth'
            });
        }
        resetTimer(); 
    };

    // --- AUTO-SCROLL LOGIC ---
    function startTimer() {
        autoScrollInterval = setInterval(() => {
            moveSlide(1);
        }, 3000); // 3 Seconds
    }

    function resetTimer() {
        clearInterval(autoScrollInterval);
        startTimer();
    }

    startTimer();

    // Pause auto-scroll when user touches or clicks
    container.addEventListener('touchstart', () => clearInterval(autoScrollInterval), {passive: true});
    container.addEventListener('mousedown', () => clearInterval(autoScrollInterval));

    // --- MOBILE MENU ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
            mobileMenu.classList.toggle('is-active');
        });
    }
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