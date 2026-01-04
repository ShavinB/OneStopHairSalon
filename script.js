let currentIndex = 0;
let autoScrollTimer;

// Function to move the slides
function moveSlide(direction) {
    const carousel = document.getElementById('stylistCarousel');
    const cards = document.querySelectorAll('.review-card');
    const totalCards = cards.length;
    
    // Determine how many cards are visible based on screen width
    let visibleCards = window.innerWidth > 992 ? 3 : (window.innerWidth > 768 ? 2 : 1);
    const maxIndex = totalCards - visibleCards;

    currentIndex += direction;

    // Loop logic: Go back to start if at the end, or to end if at the start
    if (currentIndex > maxIndex) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = maxIndex;
    }

    const cardWidth = cards[0].offsetWidth + 30; // Card width + gap
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

// --- AUTO SCROLL LOGIC ---

// Start the timer
function startAutoScroll() {
    autoScrollTimer = setInterval(() => {
        moveSlide(1);
    }, 3000); // 3000ms = 3 seconds
}

// Stop the timer
function stopAutoScroll() {
    clearInterval(autoScrollTimer);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    startAutoScroll();

    // Pause auto-scroll when mouse enters the carousel
    const container = document.querySelector('.carousel-container');
    container.addEventListener('mouseenter', stopAutoScroll);

    // Resume auto-scroll when mouse leaves
    container.addEventListener('mouseleave', startAutoScroll);
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

document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const btn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('thank-you-message');
    
    // UI Feedback: Disable button and show loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.7";

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            // Hide the form smoothly
            form.style.opacity = '0';
            setTimeout(() => {
                form.style.display = 'none';
                // Show the Thank You box
                successMsg.style.display = 'block';
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        alert("Oops! There was a problem. Please try again or call (614) 321-4139.");
        btn.innerHTML = "SEND MESSAGE";
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
    }
});