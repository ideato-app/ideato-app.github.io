// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a nav link on mobile
    const navItems = document.querySelectorAll('.nav-links a, .nav-connect-btn');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
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

    // Localization functionality
    const translations = {
        en: {
            // Navigation
            'nav-home': 'Home',
            'nav-services': 'Services',
            'nav-idea': 'Idea Analysis',
            'nav-uiux': 'UI/UX',
            'nav-dev': 'Development',
            'nav-deploy': 'Deployment',
            'nav-security': 'Security',
            'nav-about': 'About',
            'nav-contact': 'Contact',
            'nav-connect': 'Connect with Us',

            // Hero section
            'hero-title': 'Turn Your Idea into a Real App',
            'hero-subtitle': 'We help you bring your ideas to life using Flutter and FastAPI.',
            'hero-connect': 'Connect with Us',

            // Services section
            'services-title': 'Our Services',
            'idea-service': 'Idea Analysis & Validation',
            'idea-desc': 'We help you refine your concept and validate market potential.',
            'uiux-service': 'UI/UX Design',
            'uiux-desc': 'Beautiful, intuitive interfaces that users love.',
            'dev-service': 'App Development',
            'dev-desc': 'Cross-platform development with Flutter and robust backends with FastAPI.',
            'deploy-service': 'App Deployment',
            'deploy-desc': 'We handle the entire process of publishing to app stores.',
            'security-service': 'Penetration Testing',
            'security-desc': 'Comprehensive security assessment to identify vulnerabilities in your application before hackers do.',

            // Idea Analysis Section
            'idea-title': 'Idea Analysis & Validation',
            'idea-intro-title': 'Transform Your Concept into a Viable Product',
            'idea-intro-desc': 'Great apps start with great ideas, but not all ideas translate into successful products. Our idea analysis and validation service helps you refine your concept, identify your target market, and validate your assumptions before investing in full-scale development.',

            // UI/UX Section
            'uiux-title': 'UI/UX Design',
            'uiux-intro-title': 'Create Delightful User Experiences',
            'uiux-intro-desc': 'The success of your app depends heavily on how users interact with it. Our UI/UX design process focuses on creating intuitive, engaging, and visually appealing interfaces that enhance user satisfaction and drive retention.',

            // Development Section
            'dev-title': 'App Development',
            'dev-intro-title': 'Bring Your Vision to Life',
            'dev-intro-desc': 'Our development team specializes in creating high-performance, cross-platform applications using Flutter for frontend and FastAPI for backend services. This combination ensures rapid development, beautiful interfaces, and robust, scalable backend systems.',

            // Deployment Section
            'deploy-title': 'App Deployment',
            'deploy-intro-title': 'From Development to Your Users\' Hands',
            'deploy-intro-desc': 'Getting your app to market involves navigating complex submission processes, optimizing for different platforms, and ensuring everything complies with store guidelines. We handle the entire deployment process so you can focus on growing your user base.',

            // Security Section
            'security-title': 'Application Security & Penetration Testing',
            'security-intro-title': 'Why Security Matters',
            'security-intro-desc': 'In today\'s digital landscape, security isn\'t optional—it\'s essential. A single vulnerability can lead to data breaches, compromised user information, and irreparable damage to your brand\'s reputation.',

            // About Section
            'about-title': 'About Me',

            // Contact section
            'contact-title': 'Let\'s Connect',
            'contact-intro': 'Get in touch with me directly using one of the methods below:',
            'follow-us': 'Follow Us',

            // Footer
            'footer-text': '© 2023 Ideato App Development. All rights reserved.'
        },
        ar: {
            // Navigation
            'nav-home': 'الرئيسية',
            'nav-services': 'خدماتنا',
            'nav-idea': 'تحليل الأفكار',
            'nav-uiux': 'تصميم الواجهة',
            'nav-dev': 'تطوير التطبيقات',
            'nav-deploy': 'نشر التطبيقات',
            'nav-security': 'الحماية',
            'nav-about': 'عننا',
            'nav-contact': 'اتصل بينا',
            'nav-connect': 'تواصل معانا',

            // Hero section
            'hero-title': 'حول فكرتك لتطبيق حقيقي',
            'hero-subtitle': 'هنساعدك تحول أفكارك لواقع باستخدام Flutter و FastAPI.',
            'hero-connect': 'تواصل معانا',

            // Services section
            'services-title': 'خدماتنا',
            'idea-service': 'تحليل وتقييم الفكرة',
            'idea-desc': 'هنساعدك تطور فكرتك ونتأكد إنها تنفع في السوق.',
            'uiux-service': 'تصميم واجهة المستخدم',
            'uiux-desc': 'واجهات حلوة وسهلة الاستخدام بيحبها المستخدمين.',
            'dev-service': 'تطوير التطبيقات',
            'dev-desc': 'تطوير لكل الأجهزة مع Flutter وأنظمة خلفية قوية مع FastAPI.',
            'deploy-service': 'نشر التطبيقات',
            'deploy-desc': 'هنتعامل مع كل خطوات النشر في متاجر التطبيقات.',
            'security-service': 'اختبار الاختراق',
            'security-desc': 'فحص أمني شامل لاكتشاف الثغرات في تطبيقك قبل ما الهاكرز يلاقوها.',

            // Idea Analysis Section
            'idea-title': 'تحليل وتقييم الفكرة',
            'idea-intro-title': 'حول مفهومك لمنتج قابل للتطبيق',
            'idea-intro-desc': 'التطبيقات الرائعة تبدأ بأفكار عظيمة، لكن مش كل الأفكار بتتحول لمنتجات ناجحة. خدمة تحليل وتقييم الفكرة بتساعدك تحسن مفهومك، وتحدد السوق المستهدف، وتتحقق من افتراضاتك قبل الاستثمار في التطوير الكامل.',

            // UI/UX Section
            'uiux-title': 'تصميم واجهة المستخدم',
            'uiux-intro-title': 'إنشاء تجارب مستخدم ممتعة',
            'uiux-intro-desc': 'نجاح تطبيقك يعتمد بشكل كبير على تفاعل المستخدمين معاه. عملية تصميم واجهة المستخدم بتركز على إنشاء واجهات بديهية وجذابة وجميلة بصريًا بتعزز رضا المستخدم وتزيد من اهتمامه.',

            // Development Section
            'dev-title': 'تطوير التطبيقات',
            'dev-intro-title': 'حول رؤيتك لواقع',
            'dev-intro-desc': 'فريق التطوير لدينا متخصص في إنشاء تطبيقات عالية الأداء ومتعددة المنصات باستخدام Flutter للواجهة الأمامية و FastAPI للخدمات الخلفية. هذه التركيبة بتضمن تطوير سريع وواجهات جميلة وأنظمة خلفية قوية وقابلة للتوسع.',

            // Deployment Section
            'deploy-title': 'نشر التطبيقات',
            'deploy-intro-title': 'من التطوير لأيدي المستخدمين',
            'deploy-intro-desc': 'وصول تطبيقك للسوق بيتضمن التعامل مع عمليات تقديم معقدة، والتحسين لمنصات مختلفة، والتأكد من التوافق مع إرشادات المتاجر. إحنا بنتعامل مع عملية النشر بالكامل عشان تقدر تركز على زيادة قاعدة المستخدمين.',

            // Security Section
            'security-title': 'أمان التطبيقات واختبار الاختراق',
            'security-intro-title': 'ليه الأمان مهم',
            'security-intro-desc': 'في العالم الرقمي الحالي، الأمان مش اختياري - ده ضروري. ثغرة واحدة ممكن تؤدي لتسريب البيانات، والمعلومات الشخصية للمستخدمين، وضرر لا يمكن إصلاحه لسمعة علامتك التجارية.',

            // About Section
            'about-title': 'عننا',

            // Contact section
            'contact-title': 'تواصل معانا',
            'contact-intro': 'تواصل معانا مباشرة باستخدام إحدى الطرق دي:',
            'follow-us': 'تابعنا',

            // Footer
            'footer-text': '© 2023 آيدياتو لتطوير التطبيقات. كل الحقوق محفوظة.'
        }
    };

    // Add data-lang attributes to elements
    function addLangAttributes() {
        try {
            // Navigation items - handle the actual visible links only (not commented out ones)
            const navLinks = document.querySelectorAll('.nav-links li a');
            for (let i = 0; i < navLinks.length; i++) {
                // Set data-lang attribute only if it doesn't already have one
                if (!navLinks[i].hasAttribute('data-lang')) {
                    if (i === 0) navLinks[i].setAttribute('data-lang', 'nav-home');
                    else if (i === 1) navLinks[i].setAttribute('data-lang', 'nav-services');
                    else if (navLinks[i].href.includes('#ui-ux')) navLinks[i].setAttribute('data-lang', 'nav-uiux');
                    else if (navLinks[i].href.includes('#development')) navLinks[i].setAttribute('data-lang', 'nav-dev');
                    else if (navLinks[i].href.includes('#deployment')) navLinks[i].setAttribute('data-lang', 'nav-deploy');
                    else if (navLinks[i].href.includes('#pentest')) navLinks[i].setAttribute('data-lang', 'nav-security');
                    else if (navLinks[i].href.includes('#about')) navLinks[i].setAttribute('data-lang', 'nav-about');
                    else if (navLinks[i].href.includes('#contact')) navLinks[i].setAttribute('data-lang', 'nav-contact');
                }
            }

            // Nav connect button
            const navConnectBtn = document.querySelector('.nav-connect-btn');
            if (navConnectBtn && !navConnectBtn.hasAttribute('data-lang')) {
                navConnectBtn.setAttribute('data-lang', 'nav-connect');
            }

            // Hero section
            const heroTitle = document.querySelector('.hero-content h1');
            if (heroTitle && !heroTitle.hasAttribute('data-lang')) {
                heroTitle.setAttribute('data-lang', 'hero-title');
            }

            const heroSubtitle = document.querySelector('.hero-content p');
            if (heroSubtitle && !heroSubtitle.hasAttribute('data-lang')) {
                heroSubtitle.setAttribute('data-lang', 'hero-subtitle');
            }

            const connectButton = document.querySelector('.hero-buttons .connect-button');
            if (connectButton && !connectButton.hasAttribute('data-lang')) {
                connectButton.setAttribute('data-lang', 'hero-connect');
            }

            // Services section
            const servicesTitle = document.querySelector('.services-section h2');
            if (servicesTitle && !servicesTitle.hasAttribute('data-lang')) {
                servicesTitle.setAttribute('data-lang', 'services-title');
            }

            const serviceCards = document.querySelectorAll('.service-card');
            if (serviceCards.length > 0) {
                // First card - Idea Analysis
                if (serviceCards[0]) {
                    const cardTitle = serviceCards[0].querySelector('h3');
                    const cardDesc = serviceCards[0].querySelector('p');
                    if (cardTitle && !cardTitle.hasAttribute('data-lang')) cardTitle.setAttribute('data-lang', 'idea-service');
                    if (cardDesc && !cardDesc.hasAttribute('data-lang')) cardDesc.setAttribute('data-lang', 'idea-desc');
                }

                // Second card - UI/UX
                if (serviceCards[1]) {
                    const cardTitle = serviceCards[1].querySelector('h3');
                    const cardDesc = serviceCards[1].querySelector('p');
                    if (cardTitle && !cardTitle.hasAttribute('data-lang')) cardTitle.setAttribute('data-lang', 'uiux-service');
                    if (cardDesc && !cardDesc.hasAttribute('data-lang')) cardDesc.setAttribute('data-lang', 'uiux-desc');
                }

                // Third card - Development
                if (serviceCards[2]) {
                    const cardTitle = serviceCards[2].querySelector('h3');
                    const cardDesc = serviceCards[2].querySelector('p');
                    if (cardTitle && !cardTitle.hasAttribute('data-lang')) cardTitle.setAttribute('data-lang', 'dev-service');
                    if (cardDesc && !cardDesc.hasAttribute('data-lang')) cardDesc.setAttribute('data-lang', 'dev-desc');
                }

                // Fourth card - Deployment
                if (serviceCards[3]) {
                    const cardTitle = serviceCards[3].querySelector('h3');
                    const cardDesc = serviceCards[3].querySelector('p');
                    if (cardTitle && !cardTitle.hasAttribute('data-lang')) cardTitle.setAttribute('data-lang', 'deploy-service');
                    if (cardDesc && !cardDesc.hasAttribute('data-lang')) cardDesc.setAttribute('data-lang', 'deploy-desc');
                }

                // Fifth card - Security
                if (serviceCards[4]) {
                    const cardTitle = serviceCards[4].querySelector('h3');
                    const cardDesc = serviceCards[4].querySelector('p');
                    if (cardTitle && !cardTitle.hasAttribute('data-lang')) cardTitle.setAttribute('data-lang', 'security-service');
                    if (cardDesc && !cardDesc.hasAttribute('data-lang')) cardDesc.setAttribute('data-lang', 'security-desc');
                }
            }

            // Detailed Idea Analysis section
            const ideaSection = document.querySelector('#idea-analysis');
            if (ideaSection) {
                const sectionTitle = ideaSection.querySelector('h2');
                if (sectionTitle && !sectionTitle.hasAttribute('data-lang')) {
                    sectionTitle.setAttribute('data-lang', 'idea-title');
                }

                const introTitle = ideaSection.querySelector('.service-intro h3');
                if (introTitle && !introTitle.hasAttribute('data-lang')) {
                    introTitle.setAttribute('data-lang', 'idea-intro-title');
                }

                const introDesc = ideaSection.querySelector('.service-intro p');
                if (introDesc && !introDesc.hasAttribute('data-lang')) {
                    introDesc.setAttribute('data-lang', 'idea-intro-desc');
                }
            }

            // Detailed UI/UX section
            const uiuxSection = document.querySelector('#ui-ux');
            if (uiuxSection) {
                const sectionTitle = uiuxSection.querySelector('h2');
                if (sectionTitle && !sectionTitle.hasAttribute('data-lang')) {
                    sectionTitle.setAttribute('data-lang', 'uiux-title');
                }

                const introTitle = uiuxSection.querySelector('.service-intro h3');
                if (introTitle && !introTitle.hasAttribute('data-lang')) {
                    introTitle.setAttribute('data-lang', 'uiux-intro-title');
                }

                const introDesc = uiuxSection.querySelector('.service-intro p');
                if (introDesc && !introDesc.hasAttribute('data-lang')) {
                    introDesc.setAttribute('data-lang', 'uiux-intro-desc');
                }
            }

            // Detailed Development section
            const devSection = document.querySelector('#development');
            if (devSection) {
                const sectionTitle = devSection.querySelector('h2');
                if (sectionTitle && !sectionTitle.hasAttribute('data-lang')) {
                    sectionTitle.setAttribute('data-lang', 'dev-title');
                }

                const introTitle = devSection.querySelector('.service-intro h3');
                if (introTitle && !introTitle.hasAttribute('data-lang')) {
                    introTitle.setAttribute('data-lang', 'dev-intro-title');
                }

                const introDesc = devSection.querySelector('.service-intro p');
                if (introDesc && !introDesc.hasAttribute('data-lang')) {
                    introDesc.setAttribute('data-lang', 'dev-intro-desc');
                }
            }

            // Detailed Deployment section
            const deploySection = document.querySelector('#deployment');
            if (deploySection) {
                const sectionTitle = deploySection.querySelector('h2');
                if (sectionTitle && !sectionTitle.hasAttribute('data-lang')) {
                    sectionTitle.setAttribute('data-lang', 'deploy-title');
                }

                const introTitle = deploySection.querySelector('.service-intro h3');
                if (introTitle && !introTitle.hasAttribute('data-lang')) {
                    introTitle.setAttribute('data-lang', 'deploy-intro-title');
                }

                const introDesc = deploySection.querySelector('.service-intro p');
                if (introDesc && !introDesc.hasAttribute('data-lang')) {
                    introDesc.setAttribute('data-lang', 'deploy-intro-desc');
                }
            }

            // Security section
            const securitySection = document.querySelector('#pentest');
            if (securitySection) {
                const sectionTitle = securitySection.querySelector('h2');
                if (sectionTitle && !sectionTitle.hasAttribute('data-lang')) {
                    sectionTitle.setAttribute('data-lang', 'security-title');
                }

                const introTitle = securitySection.querySelector('.pentest-intro h3');
                if (introTitle && !introTitle.hasAttribute('data-lang')) {
                    introTitle.setAttribute('data-lang', 'security-intro-title');
                }

                const introDesc = securitySection.querySelector('.pentest-intro p:first-of-type');
                if (introDesc && !introDesc.hasAttribute('data-lang')) {
                    introDesc.setAttribute('data-lang', 'security-intro-desc');
                }
            }

            // About section
            const aboutTitle = document.querySelector('.about-section h2');
            if (aboutTitle && !aboutTitle.hasAttribute('data-lang')) {
                aboutTitle.setAttribute('data-lang', 'about-title');
            }

            // Contact section
            const contactTitle = document.querySelector('.contact-section h2');
            if (contactTitle && !contactTitle.hasAttribute('data-lang')) {
                contactTitle.setAttribute('data-lang', 'contact-title');
            }

            const contactIntro = document.querySelector('.contact-info > p');
            if (contactIntro && !contactIntro.hasAttribute('data-lang')) {
                contactIntro.setAttribute('data-lang', 'contact-intro');
            }

            const followUs = document.querySelector('.social-media h3');
            if (followUs && !followUs.hasAttribute('data-lang')) {
                followUs.setAttribute('data-lang', 'follow-us');
            }

            // Footer
            const footerText = document.querySelector('.footer-content p');
            if (footerText && !footerText.hasAttribute('data-lang')) {
                footerText.setAttribute('data-lang', 'footer-text');
            }
        } catch (error) {
            console.error("Error adding language attributes:", error);
        }
    }

    // Set language
    function setLanguage(lang) {
        console.log("Setting language to:", lang);
        document.documentElement.lang = lang;

        if (lang === 'en') {
            document.body.classList.remove('rtl');
            document.body.classList.add('ltr');
            document.body.style.direction = 'ltr';
        } else {
            document.body.classList.remove('ltr');
            document.body.classList.add('rtl');
            document.body.style.direction = 'rtl';
        }

        const elements = document.querySelectorAll('[data-lang]');
        console.log("Found elements with data-lang:", elements.length);

        elements.forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang][key]) {
                // For links with href attributes, don't change the href
                if (element.tagName === 'A' && element.hasAttribute('href')) {
                    element.textContent = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
                console.log("Updated element:", key, "with:", translations[lang][key]);
            } else {
                console.log("No translation found for:", key);
            }
        });

        // Update active state on language buttons
        document.getElementById('lang-en').classList.toggle('active', lang === 'en');
        document.getElementById('lang-ar').classList.toggle('active', lang === 'ar');

        // Save language preference
        localStorage.setItem('preferredLanguage', lang);
    }

    // Initialize language attributes
    addLangAttributes();

    // Set initial language based on saved preference or default to Arabic
    const savedLang = localStorage.getItem('preferredLanguage') || 'ar';
    setLanguage(savedLang);

    // Add event listeners to language buttons
    document.getElementById('lang-en').addEventListener('click', function () {
        setLanguage('en');
    });

    document.getElementById('lang-ar').addEventListener('click', function () {
        setLanguage('ar');
    });
}); 