// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            // Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                // Prevent scrolling when menu is open
                body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // Allow scrolling when menu is closed
                body.style.overflow = '';
            }
        });
    }

    // Theme toggling functionality
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const themeLightText = document.querySelector('.theme-text:first-of-type');
    const themeDarkText = document.querySelector('.theme-text:last-of-type');

    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-theme');
        themeToggle.checked = true;
    }

    // Function to set the theme
    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-theme');
            themeToggle.checked = true;
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            themeToggle.checked = false;
            localStorage.setItem('theme', 'light');
        }
    }

    // Toggle theme when checkbox changes
    themeToggle.addEventListener('change', function () {
        setTheme(this.checked);
    });

    // Toggle theme when text labels are clicked
    if (themeLightText) {
        themeLightText.addEventListener('click', function () {
            setTheme(false);
        });
    }

    if (themeDarkText) {
        themeDarkText.addEventListener('click', function () {
            setTheme(true);
        });
    }

    // Update theme when system preference changes
    prefersDarkScheme.addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches);
        }
    });

    // Close menu when clicking a nav link on mobile
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                // Allow scrolling again
                body.style.overflow = '';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
            // Check if click is outside the navigation
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                // Allow scrolling again
                body.style.overflow = '';
            }
        }
    });

    // Add scroll animation for sections
    const revealElements = document.querySelectorAll('.glass-card');

    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to add reveal animation
    function revealOnScroll() {
        revealElements.forEach(element => {
            if (isInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial styles for animation
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Listen for scroll events
    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // Scroll to top button functionality
    const scrollTopButton = document.getElementById('scrollTop');

    // Show/hide scroll to top button
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    scrollTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // English-only website - set document language
    function setLanguage() {
        document.documentElement.lang = 'en';
        document.body.classList.remove('rtl');
        document.body.classList.add('ltr');
        document.body.style.direction = 'ltr';

        // Ensure logo is visible
        const logoImg = document.querySelector('.logo-img');
        if (logoImg) {
            logoImg.style.display = 'block';
            logoImg.style.visibility = 'visible';
        }
    }

    // Initialize with English language
    setLanguage();

    // Counter animation for stats
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2500; // Animation duration in milliseconds
        const start = 0;
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        const increment = (target - start) / totalFrames;
        let currentNumber = start;
        let frame = 0;

        const easeOutQuart = x => 1 - Math.pow(1 - x, 4); // Easing function for smooth animation

        const animate = () => {
            frame++;
            const progress = frame / totalFrames;
            const easedProgress = easeOutQuart(progress);
            currentNumber = start + (target - start) * easedProgress;

            if (frame <= totalFrames) {
                element.textContent = Math.round(currentNumber);
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };

        animate();
    }

    // Intersection Observer for stats animation
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });

    statsNumbers.forEach(number => {
        statsObserver.observe(number);
    });

    // Workflow steps animation
    function handleWorkflowAnimations() {
        const workflowSteps = document.querySelectorAll('.workflow-step');

        workflowSteps.forEach((step, index) => {
            // Add a small delay to each step
            setTimeout(() => {
                if (step.classList.contains('workflow-step')) {
                    step.style.opacity = '1';
                    step.style.transform = 'translateX(0)';
                }
            }, index * 200); // 200ms delay between each step
        });
    }

    // Initialize animations when DOM is loaded
    handleWorkflowAnimations();
});