// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * Handles the animated typing effect in the terminal window.
     */
    function initTypingEffect() {
        const typingElement = document.getElementById('typing-effect');
        if (!typingElement) return; // Exit if element not found

        const typingText = "initializing Sophie.AI... system online... ready for input.";
        let i = 0;

        function typeWriter() {
            if (i < typingText.length) {
                typingElement.innerHTML += typingText.charAt(i);
                i++;
                setTimeout(typeWriter, 40); // Typing speed in milliseconds
            }
        }
        typeWriter();
    }

    /**
     * Handles the fade-in animation for elements as they are scrolled into view.
     * Uses the Intersection Observer API for performance.
     */
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        if (revealElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If the element is intersecting the viewport, add the 'visible' class
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        revealElements.forEach(el => observer.observe(el));
    }

    /**
     * Implements a "scrollspy" effect to highlight the active navigation link
     * based on the current scroll position.
     */
    function initScrollspy() {
        const navLinks = document.querySelectorAll('.nav-menu a');
        const sections = document.querySelectorAll('section[id]');
        if (navLinks.length === 0 || sections.length === 0) return;

        function onScroll() {
            let currentSectionId = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                // Check if the scroll position is past the top of the section
                // The offset (e.g., 80) accounts for the navbar height
                if (pageYOffset >= sectionTop - 80) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                // Add 'active' class if the link's href matches the current section
                if (link.getAttribute('href').substring(1) === currentSectionId) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', onScroll);
        onScroll(); // Call once on load to set initial state
    }

    // Initialize all features
    initTypingEffect();
    initScrollReveal();
    initScrollspy();

});

