// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
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

            // Theme toggle
            'theme-light': 'Light',
            'theme-dark': 'Dark',

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
            'dev-title': 'Development',
            'dev-intro-title': 'Bringing Your Vision to Life',
            'dev-intro-desc': 'Our development team specializes in building high-performance, cross-platform apps using Flutter for the frontend and FastAPI for the backend. This approach ensures fast development with outstanding user interfaces and flexible, scalable backend systems.',

            // Deployment Section
            'deploy-title': 'App Deployment & Launch',
            'deploy-intro-title': 'From Development to User\'s Hands',
            'deploy-intro-desc': 'Launching your app in the market involves dealing with complex submission processes, platform compatibility, and ensuring compliance with store guidelines. We handle the entire deployment process so you can focus on growing your user base.',

            // Security Section
            'security-title': 'App Security & Penetration Testing',
            'security-intro-title': 'The Importance of Cybersecurity',
            'security-intro-desc': 'In today\'s digital landscape, security is not an option, it\'s a necessity. A single security vulnerability can lead to data breaches, user information compromise, and irreparable damage to your brand reputation.',

            // About Section
            'about-title': 'About Me',

            // Contact section
            'contact-title': 'Let\'s Connect',
            'contact-intro': 'Get in touch with me directly using one of the methods below:',
            'follow-us': 'Follow Us',

            // Footer
            'footer-text': '© 2025 Ideato App Development. All rights reserved.',

            // Common elements
            'outcome-title': 'What You\'ll Get',

            // Idea Analysis cards
            'market-research-title': 'Market Research',
            'market-research-desc': 'We conduct thorough market research to identify your target audience, analyze competitors, and determine market gaps that your app can fill.',
            'user-interviews-title': 'User Interviews',
            'user-interviews-desc': 'We engage with potential users to gather insights, understand pain points, and validate whether your solution addresses real needs.',
            'feasibility-title': 'Feasibility Study',
            'feasibility-desc': 'We assess the technical, financial, and operational feasibility of your idea to ensure that it can be successfully implemented.',

            // UI/UX cards
            'user-research-title': 'User Research',
            'user-research-desc': 'We start by understanding your users\' needs, motivations, and behaviors to create experiences that resonate with them.',
            'info-arch-title': 'Information Architecture',
            'info-arch-desc': 'We organize content and functionality in a way that\'s intuitive and accessible to users, creating a solid foundation for your app.',
            'visual-design-title': 'Visual Design',
            'visual-design-desc': 'We create visually stunning interfaces that align with your brand identity and enhance user engagement.',

            // Development cards
            'frontend-title': 'Frontend Development',
            'frontend-desc': 'We use Flutter to create responsive interfaces that perform efficiently across iOS, Android, and web platforms.',
            'backend-title': 'Backend Development',
            'backend-desc': 'We build powerful, scalable backend systems using FastAPI to provide the underlying infrastructure for your app\'s functionality.',
            'qa-title': 'Quality Assurance',
            'qa-desc': 'We implement rigorous testing methodologies to ensure your app is free of bugs and meets the expected performance.',

            // Deployment cards
            'app-store-title': 'App Store Deployment',
            'app-store-desc': 'We prepare and submit your app to the Apple App Store, ensuring compliance with all criteria and requirements.',
            'play-store-title': 'Google Play Store Deployment',
            'play-store-desc': 'We optimize your app for the Android platform and handle all the deployment procedures in the Google Play Store.',
            'cicd-title': 'Continuous Deployment for Updates',
            'cicd-desc': 'We set up CI/CD systems for smooth, ongoing updates and maintenance after your app\'s initial launch.',

            // Security section
            'mobile-testing-title': 'Mobile App Security Testing',
            'web-testing-title': 'Web App Security Testing',
            'api-testing-title': 'API Security Testing',
            'methodology-title': 'Our Security Testing Methodology',
            'step-1-title': 'Information Gathering',
            'step-1-desc': 'Gathering data about the target application to understand its structural layout and potential entry points.',
            'step-2-title': 'Vulnerability Analysis',
            'step-2-desc': 'Identifying security vulnerabilities using manual and advanced automated techniques.',
            'step-3-title': 'Penetration Testing',
            'step-3-desc': 'Attempting to exploit discovered vulnerabilities in a safe manner to confirm their existence and assess their potential impact.',
            'step-4-title': 'Detailed Reporting',
            'step-4-desc': 'Comprehensive documentation of results with clear steps for remediation and prioritization of fixes.',
            'step-5-title': 'Remediation Support',
            'step-5-desc': 'Assisting in remediating discovered vulnerabilities and verifying the effectiveness of applied fixes.',

            // About paragraphs
            'about-para-1': 'I am Idea To App, an app developer specializing in turning ideas into real-world applications.',
            'about-para-2': 'With expertise in Flutter for beautiful cross-platform apps and FastAPI for powerful backends, I create seamless digital experiences that bring your vision to reality.',
            'about-para-3': 'I am also a certified security professional with expertise in penetration testing. I ensure your applications are not only functional and beautiful but also secure against common and advanced threats.',

            // List items for Idea Analysis section
            'market-list-1': 'Competitor analysis',
            'market-list-2': 'Target audience identification',
            'market-list-3': 'Market trends evaluation',
            'market-list-4': 'SWOT analysis',

            'user-interviews-list-1': 'Focus group discussions',
            'user-interviews-list-2': 'One-on-one interviews',
            'user-interviews-list-3': 'User surveys',
            'user-interviews-list-4': 'Feedback analysis',

            'feasibility-list-1': 'Technical feasibility assessment',
            'feasibility-list-2': 'Cost-benefit analysis',
            'feasibility-list-3': 'Resource requirements',
            'feasibility-list-4': 'Timeline estimation',

            // Outcome items for Idea Analysis
            'idea-outcome-1': 'Comprehensive validation report',
            'idea-outcome-2': 'Refined product vision',
            'idea-outcome-3': 'Prioritized feature list',
            'idea-outcome-4': 'Strategic roadmap',

            // List items for UI/UX section
            'user-research-list-1': 'User personas development',
            'user-research-list-2': 'Journey mapping',
            'user-research-list-3': 'Behavioral analysis',
            'user-research-list-4': 'Usability testing',

            'info-arch-list-1': 'Content structure',
            'info-arch-list-2': 'User flow diagrams',
            'info-arch-list-3': 'Wireframing',
            'info-arch-list-4': 'Navigation patterns',

            'visual-design-list-1': 'Brand-aligned UI elements',
            'visual-design-list-2': 'Color scheme development',
            'visual-design-list-3': 'Typography selection',
            'visual-design-list-4': 'Custom iconography',

            // Outcome items for UI/UX
            'uiux-outcome-1': 'Information architecture map',
            'uiux-outcome-2': 'Interactive prototypes',
            'uiux-outcome-3': 'UI style guide',
            'uiux-outcome-4': 'Export-ready design assets',

            // List items for Development section
            'frontend-list-1': 'Cross-platform compatibility',
            'frontend-list-2': 'Custom animations',
            'frontend-list-3': 'Responsive layouts',
            'frontend-list-4': 'Performance optimization',

            'backend-list-1': 'RESTful API development',
            'backend-list-2': 'Database design and structure',
            'backend-list-3': 'Authentication and authorization systems',
            'backend-list-4': 'Third-party service integrations',

            'qa-list-1': 'Automated testing',
            'qa-list-2': 'Performance testing',
            'qa-list-3': 'Cross-device compatibility testing',
            'qa-list-4': 'Regression testing',

            // Outcome items for Development
            'dev-outcome-1': 'Clean, documented source code',
            'dev-outcome-2': 'Scalable backend architecture',
            'dev-outcome-3': 'Thoroughly tested application',
            'dev-outcome-4': 'Complete technical documentation',

            // List items for Deployment section
            'app-store-list-1': 'App Store listing preparation',
            'app-store-list-2': 'Screenshots and preview videos',
            'app-store-list-3': 'Metadata optimization',
            'app-store-list-4': 'Guidelines compliance verification',

            'play-store-list-1': 'Google Play Store listing setup',
            'play-store-list-2': 'Android-specific optimizations',
            'play-store-list-3': 'App version management',
            'play-store-list-4': 'Content rating compliance',

            'cicd-list-1': 'CI/CD pipeline setup',
            'cicd-list-2': 'Version and release management',
            'cicd-list-3': 'Future updates strategy planning',
            'cicd-list-4': 'Rollback procedures development',

            // Outcome items for Deployment
            'deploy-outcome-1': 'App published in official stores',
            'deploy-outcome-2': 'Analytics platforms integration',
            'deploy-outcome-3': 'Crash reporting system setup',
            'deploy-outcome-4': 'Integrated updates management system',

            // List items for Security section
            'mobile-testing-list-1': 'Code-level security review',
            'mobile-testing-list-2': 'Data storage vulnerabilities',
            'mobile-testing-list-3': 'Authentication bypass testing',
            'mobile-testing-list-4': 'API security assessment',

            'web-testing-list-1': 'OWASP Top 10 vulnerabilities evaluation',
            'web-testing-list-2': 'Cross-site scripting (XSS) detection',
            'web-testing-list-3': 'SQL injection testing',
            'web-testing-list-4': 'Session management flaws',

            'api-testing-list-1': 'Authentication/authorization vulnerabilities',
            'api-testing-list-2': 'Data validation vulnerabilities',
            'api-testing-list-3': 'Rate limiting assessment',
            'api-testing-list-4': 'Sensitive data exposure testing'
        },
        ar: {
            // Navigation
            'nav-home': 'الرئيسية',
            'nav-services': 'الخدمات',
            'nav-idea': 'تحليل الأفكار',
            'nav-uiux': ' UI/UX',
            'nav-dev': 'التطوير',
            'nav-deploy': 'النشر',
            'nav-security': 'الحماية',
            'nav-about': 'عننا',
            'nav-contact': 'اتصل بينا',
            'nav-connect': 'كلمنا',

            // Theme toggle
            'theme-light': 'فاتح',
            'theme-dark': 'غامق',

            // Hero section
            'hero-title': 'حوّل فكرتك لتطبيق حقيقي',
            'hero-subtitle': 'هنساعدك تحول أفكارك لمنتجات رقمية باستخدام Flutter و FastAPI.',
            'hero-connect': 'كلمنا دلوقتي',

            // Services section
            'services-title': 'خدماتنا',
            'idea-service': 'تحليل وتقييم الفكرة',
            'idea-desc': 'هنساعدك تطور فكرتك ونتأكد من إمكانية تسويقها.',
            'uiux-service': 'تصميم واجهات المستخدم UI/UX',
            'uiux-desc': 'واجهات مستخدم جذابة وسهلة هتحسن تجربة المستخدم بشكل كبير.',
            'dev-service': 'تطوير التطبيقات',
            'dev-desc': 'تطوير على كل الأنظمة باستخدام Flutter وخدمات خلفية قوية بـ FastAPI.',
            'deploy-service': 'نشر التطبيقات',
            'deploy-desc': 'هنتولى عملية النشر كاملة في متاجر التطبيقات المختلفة.',
            'security-service': 'اختبار الاختراق الأمني',
            'security-desc': 'تقييم أمني شامل لاكتشاف الثغرات في تطبيقك قبل ما يكتشفها الهاكرز.',

            // Idea Analysis Section
            'idea-title': 'تحليل وتقييم الفكرة',
            'idea-intro-title': 'نحول فكرتك لمنتج ممكن تنفيذه',
            'idea-intro-desc': 'التطبيقات الناجحة بتبدأ بأفكار مبتكرة، بس مش كل الأفكار بتتحول لمنتجات ناجحة. خدمة تحليل وتقييم الفكرة بتاعتنا هتساعدك تصقل فكرتك، وتحدد السوق المستهدف، وتتأكد من فرضياتك قبل ما تستثمر في التطوير الكامل.',

            // UI/UX Section
            'uiux-title': 'تصميم واجهات وتجربة المستخدم',
            'uiux-intro-title': 'تصميم تجارب مستخدم استثنائية',
            'uiux-intro-desc': 'نجاح تطبيقك بيعتمد بشكل أساسي على إزاي المستخدمين بيتفاعلوا معاه. عملية تصميم واجهات وتجربة المستخدم بتاعتنا بتركز على إنشاء واجهات سهلة وتفاعلية وجذابة بتحسن رضا المستخدم وبتزيد احتفاظك بالعملاء.',

            // Development Section
            'dev-title': 'تطوير التطبيقات',
            'dev-intro-title': 'نحول رؤيتك لواقع رقمي',
            'dev-intro-desc': 'فريق التطوير بتاعنا متخصص في إنشاء تطبيقات عالية الأداء على كل الأنظمة باستخدام Flutter للواجهة و FastAPI للباك اند. الطريقة دي بتضمن تطوير سريع مع واجهات مستخدم حلوة وأنظمة خلفية مرنة وقابلة للتوسع.',

            // Deployment Section
            'deploy-title': 'نشر وإطلاق التطبيقات',
            'deploy-intro-title': 'من التطوير لإيد المستخدمين',
            'deploy-intro-desc': 'إطلاق تطبيقك في السوق بيتطلب التعامل مع عمليات تقديم معقدة، وتحسين التوافق مع الأنظمة المختلفة، وضمان الامتثال لشروط المتاجر. احنا هنتولى عملية النشر بالكامل عشان تقدر تركز على زيادة عدد المستخدمين.',

            // Security Section
            'security-title': 'أمن التطبيقات واختبار الاختراق',
            'security-intro-title': 'أهمية الأمن السيبراني',
            'security-intro-desc': 'في عالم اليوم الرقمي، الأمن مش اختياري، ده ضروري جدًا. ثغرة أمنية واحدة ممكن تؤدي لتسريب البيانات، واختراق معلومات المستخدمين، وضرر كبير لسمعة علامتك التجارية.',

            // About Section
            'about-title': 'عن الشركة',

            // Contact section
            'contact-title': 'كلمنا',
            'contact-intro': 'تواصل معانا مباشرة باستخدام إحدى الطرق دي:',
            'follow-us': 'تابعنا',

            // Footer
            'footer-text': '© 2025 آيدياتو لتطوير التطبيقات. كل الحقوق محفوظة.',

            // Common elements
            'outcome-title': 'اللي هتحصل عليه',

            // Idea Analysis cards
            'market-research-title': 'بحوث السوق',
            'market-research-desc': 'هنعمل بحوث سوقية شاملة عشان نحدد الجمهور المستهدف، ونحلل المنافسين، ونحدد الفجوات اللي ممكن تطبيقك يملاها.',
            'user-interviews-title': 'مقابلات المستخدمين',
            'user-interviews-desc': 'هنتواصل مع المستخدمين المحتملين عشان نجمع أفكارهم، ونفهم مشاكلهم، ونتأكد إن حلك بيلبي احتياجات حقيقية.',
            'feasibility-title': 'دراسة الجدوى',
            'feasibility-desc': 'هنقيّم الجدوى التقنية والمالية والتشغيلية لفكرتك عشان نتأكد إنها ممكن تتنفذ بنجاح.',

            // UI/UX cards
            'user-research-title': 'أبحاث المستخدم',
            'user-research-desc': 'هنبدأ بفهم احتياجات المستخدمين ودوافعهم وسلوكياتهم عشان نعمل تجارب بتتواصل معاهم بشكل فعال.',
            'info-arch-title': 'هندسة المعلومات',
            'info-arch-desc': 'هننظم المحتوى والوظائف بطريقة منطقية وسهلة الاستخدام، ده بيوفر أساس قوي لتطبيقك.',
            'visual-design-title': 'التصميم المرئي',
            'visual-design-desc': 'هنبتكر واجهات مستخدم حلوة بتتوافق مع هوية علامتك التجارية وبتعزز التفاعل مع المستخدم.',

            // Development cards
            'frontend-title': 'تطوير الواجهة الأمامية',
            'frontend-desc': 'هنستخدم Flutter عشان نعمل واجهات مستخدم متجاوبة بتشتغل كويس على iOS وAndroid والويب.',
            'backend-title': 'تطوير الخدمات الخلفية',
            'backend-desc': 'هنبني خدمات خلفية قوية وقابلة للتوسع باستخدام FastAPI عشان نوفر البنية التحتية اللازمة لتطبيقك.',
            'qa-title': 'ضمان الجودة',
            'qa-desc': 'هنطبق طرق اختبار صارمة عشان نتأكد إن التطبيق خالي من الباجز وبيحقق الأداء المطلوب.',

            // Deployment cards
            'app-store-title': 'النشر في App Store',
            'app-store-desc': 'هنجهز ونقدم تطبيقك لمتجر Apple App Store، مع ضمان الامتثال لكل المعايير والمتطلبات.',
            'play-store-title': 'النشر في جوجل بلاي',
            'play-store-desc': 'هنحسن تطبيقك لنظام Android ونتعامل مع كل إجراءات النشر في Google Play Store.',
            'cicd-title': 'النشر المستمر للتحديثات',
            'cicd-desc': 'هنعد أنظمة CI/CD للتحديثات السلسة والصيانة المستمرة بعد إطلاق تطبيقك.',

            // Security section
            'mobile-testing-title': 'اختبار أمن تطبيقات الموبايل',
            'web-testing-title': 'اختبار أمن تطبيقات الويب',
            'api-testing-title': 'اختبار أمن واجهات API',
            'methodology-title': 'طريقتنا في الاختبار الأمني',
            'step-1-title': 'جمع المعلومات',
            'step-1-desc': 'جمع بيانات عن التطبيق المستهدف عشان نفهم هيكله ونقط الدخول المحتملة.',
            'step-2-title': 'تحليل نقط الضعف',
            'step-2-desc': 'تحديد الثغرات الأمنية باستخدام تقنيات الاختبار اليدوية والآلية المتطورة.',
            'step-3-title': 'محاكاة الاختراق',
            'step-3-desc': 'محاولة استغلال الثغرات المكتشفة بطريقة آمنة عشان نتأكد من وجودها ونقيّم تأثيرها المحتمل.',
            'step-4-title': 'إعداد التقارير التفصيلية',
            'step-4-desc': 'توثيق شامل للنتائج مع خطوات واضحة للإصلاح وترتيب الأولويات.',
            'step-5-title': 'دعم عمليات الإصلاح',
            'step-5-desc': 'المساعدة في إصلاح الثغرات المكتشفة والتأكد من فعالية الحلول المطبقة.',

            // About paragraphs
            'about-para-1': 'احنا "آيديا تو آب"، مطوري تطبيقات متخصصين في تحويل الأفكار المبتكرة لتطبيقات رقمية فعالة.',
            'about-para-2': 'بفضل خبرتنا في Flutter لتطوير تطبيقات على كل الأنظمة و FastAPI لبناء باك اند قوي، بنقدم تجارب رقمية متكاملة بتحقق رؤيتك على أرض الواقع.',
            'about-para-3': 'احنا كمان متخصصين معتمدين في مجال الأمن السيبراني مع خبرة في اختبار الاختراق. بنضمن إن تطبيقاتك مش بس شغالة وحلوة لكن كمان محمية ضد التهديدات الأمنية العادية والمتقدمة.',

            // List items for Idea Analysis section
            'market-list-1': 'تحليل استراتيجي للمنافسين',
            'market-list-2': 'تحديد وتقسيم الجمهور المستهدف',
            'market-list-3': 'تقييم اتجاهات السوق',
            'market-list-4': 'تحليل SWOT (القوة، الضعف، الفرص، التهديدات)',

            'user-interviews-list-1': 'جلسات مجموعات التركيز',
            'user-interviews-list-2': 'مقابلات فردية معمقة',
            'user-interviews-list-3': 'استطلاعات رأي المستخدمين',
            'user-interviews-list-4': 'تحليل آراء وملاحظات المستخدمين',

            'feasibility-list-1': 'تقييم الجدوى التقنية',
            'feasibility-list-2': 'تحليل التكلفة والعائد',
            'feasibility-list-3': 'تحديد الموارد المطلوبة',
            'feasibility-list-4': 'تقدير المدة الزمنية للتنفيذ',

            // Outcome items for Idea Analysis
            'idea-outcome-1': 'تقرير تحقق شامل للفكرة',
            'idea-outcome-2': 'رؤية منتج محسنة ومحددة',
            'idea-outcome-3': 'قائمة مميزات مرتبة حسب الأهمية',
            'idea-outcome-4': 'خطة طريق استراتيجية للتنفيذ',

            // List items for UI/UX section
            'user-research-list-1': 'تطوير نماذج شخصيات المستخدمين',
            'user-research-list-2': 'رسم خرائط رحلة المستخدم',
            'user-research-list-3': 'تحليل سلوك المستخدم',
            'user-research-list-4': 'اختبارات سهولة الاستخدام',

            'info-arch-list-1': 'هيكلة المحتوى',
            'info-arch-list-2': 'تصميم مخططات تدفق المستخدم',
            'info-arch-list-3': 'عمل المخططات الأولية',
            'info-arch-list-4': 'تصميم أنماط التنقل',

            'visual-design-list-1': 'تصميم متوافق مع الهوية البصرية',
            'visual-design-list-2': 'تطوير نظام ألوان متناسق',
            'visual-design-list-3': 'اختيار الخطوط المناسبة',
            'visual-design-list-4': 'تصميم أيقونات مخصصة',

            // Outcome items for UI/UX
            'uiux-outcome-1': 'خريطة هيكلية للمعلومات',
            'uiux-outcome-2': 'نماذج تفاعلية للاختبار',
            'uiux-outcome-3': 'دليل تصميم واجهة المستخدم',
            'uiux-outcome-4': 'ملفات تصميم جاهزة للتنفيذ',

            // List items for Development section
            'frontend-list-1': 'توافق بين كل الأنظمة',
            'frontend-list-2': 'أنيميشن مخصص',
            'frontend-list-3': 'تصميمات متجاوبة',
            'frontend-list-4': 'تحسين الأداء',

            'backend-list-1': 'تطوير واجهات API',
            'backend-list-2': 'تصميم قواعد البيانات',
            'backend-list-3': 'أنظمة التسجيل والصلاحيات',
            'backend-list-4': 'ربط مع خدمات خارجية',

            'qa-list-1': 'اختبارات آلية',
            'qa-list-2': 'اختبارات الأداء',
            'qa-list-3': 'اختبارات التوافق بين الأجهزة',
            'qa-list-4': 'اختبارات الانحدار',

            // Outcome items for Development
            'dev-outcome-1': 'كود نظيف وموثق',
            'dev-outcome-2': 'بنية خلفية قابلة للتوسع',
            'dev-outcome-3': 'تطبيق مختبر بشكل كامل',
            'dev-outcome-4': 'توثيق تقني شامل',

            // List items for Deployment section
            'app-store-list-1': 'تجهيز صفحة التطبيق في App Store',
            'app-store-list-2': 'لقطات شاشة وفيديوهات',
            'app-store-list-3': 'تحسين البيانات الوصفية',
            'app-store-list-4': 'التأكد من الامتثال للشروط',

            'play-store-list-1': 'إعداد صفحة التطبيق في Google Play',
            'play-store-list-2': 'تحسينات خاصة بـ Android',
            'play-store-list-3': 'إدارة الإصدارات',
            'play-store-list-4': 'الامتثال لتصنيف المحتوى',

            'cicd-list-1': 'إعداد نظام CI/CD',
            'cicd-list-2': 'إدارة الإصدارات والتحديثات',
            'cicd-list-3': 'تخطيط استراتيجية التحديثات',
            'cicd-list-4': 'إعداد إجراءات الاسترجاع',

            // Outcome items for Deployment
            'deploy-outcome-1': 'تطبيق منشور في المتاجر الرسمية',
            'deploy-outcome-2': 'ربط مع منصات التحليلات',
            'deploy-outcome-3': 'نظام لتقارير الأعطال',
            'deploy-outcome-4': 'نظام متكامل لإدارة التحديثات',

            // List items for Security section
            'mobile-testing-list-1': 'مراجعة أمنية للكود',
            'mobile-testing-list-2': 'ثغرات تخزين البيانات',
            'mobile-testing-list-3': 'اختبار تجاوز تسجيل الدخول',
            'mobile-testing-list-4': 'تقييم أمن API',

            'web-testing-list-1': 'تقييم ثغرات OWASP Top 10',
            'web-testing-list-2': 'اكتشاف ثغرات XSS',
            'web-testing-list-3': 'اختبار حقن SQL',
            'web-testing-list-4': 'مشاكل إدارة الجلسات',

            'api-testing-list-1': 'ثغرات التحقق والصلاحيات',
            'api-testing-list-2': 'ثغرات التحقق من البيانات',
            'api-testing-list-3': 'تقييم حدود الطلبات',
            'api-testing-list-4': 'اختبار تسريب البيانات الحساسة'
        }
    };

    // Add data-lang attributes to elements
    function addLangAttributes() {
        try {
            // Navigation items - handle the actual visible links only (not commented out ones)
            const navLinks = document.querySelectorAll('.nav-links li a:not([style*="display: none"])');
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

            // Theme toggle text
            const themeLightText = document.querySelector('.theme-text:first-of-type');
            const themeDarkText = document.querySelector('.theme-text:last-of-type');

            if (themeLightText && !themeLightText.hasAttribute('data-lang')) {
                themeLightText.setAttribute('data-lang', 'theme-light');
            }

            if (themeDarkText && !themeDarkText.hasAttribute('data-lang')) {
                themeDarkText.setAttribute('data-lang', 'theme-dark');
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

                // Market Research card
                const marketResearchTitle = ideaSection.querySelector('.detail-card:nth-of-type(1) h3');
                if (marketResearchTitle) marketResearchTitle.setAttribute('data-lang', 'market-research-title');

                const marketResearchDesc = ideaSection.querySelector('.detail-card:nth-of-type(1) p');
                if (marketResearchDesc) marketResearchDesc.setAttribute('data-lang', 'market-research-desc');

                // User Interviews card
                const userInterviewsTitle = ideaSection.querySelector('.detail-card:nth-of-type(2) h3');
                if (userInterviewsTitle) userInterviewsTitle.setAttribute('data-lang', 'user-interviews-title');

                const userInterviewsDesc = ideaSection.querySelector('.detail-card:nth-of-type(2) p');
                if (userInterviewsDesc) userInterviewsDesc.setAttribute('data-lang', 'user-interviews-desc');

                // Feasibility Study card
                const feasibilityTitle = ideaSection.querySelector('.detail-card:nth-of-type(3) h3');
                if (feasibilityTitle) feasibilityTitle.setAttribute('data-lang', 'feasibility-title');

                const feasibilityDesc = ideaSection.querySelector('.detail-card:nth-of-type(3) p');
                if (feasibilityDesc) feasibilityDesc.setAttribute('data-lang', 'feasibility-desc');

                // What You'll Get section
                const outcomeTitle = ideaSection.querySelector('.service-outcome h3');
                if (outcomeTitle) outcomeTitle.setAttribute('data-lang', 'outcome-title');
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

                // User Research card
                const userResearchTitle = uiuxSection.querySelector('.detail-card:nth-of-type(1) h3');
                if (userResearchTitle) userResearchTitle.setAttribute('data-lang', 'user-research-title');

                const userResearchDesc = uiuxSection.querySelector('.detail-card:nth-of-type(1) p');
                if (userResearchDesc) userResearchDesc.setAttribute('data-lang', 'user-research-desc');

                // Information Architecture card
                const infoArchTitle = uiuxSection.querySelector('.detail-card:nth-of-type(2) h3');
                if (infoArchTitle) infoArchTitle.setAttribute('data-lang', 'info-arch-title');

                const infoArchDesc = uiuxSection.querySelector('.detail-card:nth-of-type(2) p');
                if (infoArchDesc) infoArchDesc.setAttribute('data-lang', 'info-arch-desc');

                // Visual Design card
                const visualDesignTitle = uiuxSection.querySelector('.detail-card:nth-of-type(3) h3');
                if (visualDesignTitle) visualDesignTitle.setAttribute('data-lang', 'visual-design-title');

                const visualDesignDesc = uiuxSection.querySelector('.detail-card:nth-of-type(3) p');
                if (visualDesignDesc) visualDesignDesc.setAttribute('data-lang', 'visual-design-desc');

                // What You'll Get section
                const outcomeTitle = uiuxSection.querySelector('.service-outcome h3');
                if (outcomeTitle) outcomeTitle.setAttribute('data-lang', 'outcome-title');
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

                // Frontend Development card
                const frontendTitle = devSection.querySelector('.detail-card:nth-of-type(1) h3');
                if (frontendTitle) frontendTitle.setAttribute('data-lang', 'frontend-title');

                const frontendDesc = devSection.querySelector('.detail-card:nth-of-type(1) p');
                if (frontendDesc) frontendDesc.setAttribute('data-lang', 'frontend-desc');

                // Backend Development card
                const backendTitle = devSection.querySelector('.detail-card:nth-of-type(2) h3');
                if (backendTitle) backendTitle.setAttribute('data-lang', 'backend-title');

                const backendDesc = devSection.querySelector('.detail-card:nth-of-type(2) p');
                if (backendDesc) backendDesc.setAttribute('data-lang', 'backend-desc');

                // QA card
                const qaTitle = devSection.querySelector('.detail-card:nth-of-type(3) h3');
                if (qaTitle) qaTitle.setAttribute('data-lang', 'qa-title');

                const qaDesc = devSection.querySelector('.detail-card:nth-of-type(3) p');
                if (qaDesc) qaDesc.setAttribute('data-lang', 'qa-desc');

                // What You'll Get section
                const outcomeTitle = devSection.querySelector('.service-outcome h3');
                if (outcomeTitle) outcomeTitle.setAttribute('data-lang', 'outcome-title');
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

                // App Store Submission card
                const appStoreTitle = deploySection.querySelector('.detail-card:nth-of-type(1) h3');
                if (appStoreTitle) appStoreTitle.setAttribute('data-lang', 'app-store-title');

                const appStoreDesc = deploySection.querySelector('.detail-card:nth-of-type(1) p');
                if (appStoreDesc) appStoreDesc.setAttribute('data-lang', 'app-store-desc');

                // Google Play Submission card
                const playStoreTitle = deploySection.querySelector('.detail-card:nth-of-type(2) h3');
                if (playStoreTitle) playStoreTitle.setAttribute('data-lang', 'play-store-title');

                const playStoreDesc = deploySection.querySelector('.detail-card:nth-of-type(2) p');
                if (playStoreDesc) playStoreDesc.setAttribute('data-lang', 'play-store-desc');

                // Continuous Deployment card
                const cicdTitle = deploySection.querySelector('.detail-card:nth-of-type(3) h3');
                if (cicdTitle) cicdTitle.setAttribute('data-lang', 'cicd-title');

                const cicdDesc = deploySection.querySelector('.detail-card:nth-of-type(3) p');
                if (cicdDesc) cicdDesc.setAttribute('data-lang', 'cicd-desc');

                // What You'll Get section
                const outcomeTitle = deploySection.querySelector('.service-outcome h3');
                if (outcomeTitle) outcomeTitle.setAttribute('data-lang', 'outcome-title');
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

                // Mobile App Testing card
                const mobileTestingTitle = securitySection.querySelector('.pentest-service:nth-of-type(1) h3');
                if (mobileTestingTitle) mobileTestingTitle.setAttribute('data-lang', 'mobile-testing-title');

                // Web App Testing card
                const webTestingTitle = securitySection.querySelector('.pentest-service:nth-of-type(2) h3');
                if (webTestingTitle) webTestingTitle.setAttribute('data-lang', 'web-testing-title');

                // API Testing card
                const apiTestingTitle = securitySection.querySelector('.pentest-service:nth-of-type(3) h3');
                if (apiTestingTitle) apiTestingTitle.setAttribute('data-lang', 'api-testing-title');

                // Methodology section
                const methodologyTitle = securitySection.querySelector('.pentest-methodology h3');
                if (methodologyTitle) methodologyTitle.setAttribute('data-lang', 'methodology-title');

                // Methodology steps
                const steps = securitySection.querySelectorAll('.step-content h4');
                if (steps.length > 0) {
                    for (let i = 0; i < steps.length; i++) {
                        steps[i].setAttribute('data-lang', `step-${i + 1}-title`);
                    }

                    const stepDescriptions = securitySection.querySelectorAll('.step-content p');
                    for (let i = 0; i < stepDescriptions.length; i++) {
                        stepDescriptions[i].setAttribute('data-lang', `step-${i + 1}-desc`);
                    }
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

            // Add translations for all detailed service sections

            // About section paragraphs
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const aboutParagraphs = aboutSection.querySelectorAll('.about-content p');
                if (aboutParagraphs.length > 0) {
                    for (let i = 0; i < aboutParagraphs.length; i++) {
                        aboutParagraphs[i].setAttribute('data-lang', `about-para-${i + 1}`);
                    }
                }
            }

            // Add attributes to list items and outcome items
            addListItemAttributes();
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

        // Ensure logo is visible
        const logoImg = document.querySelector('.logo-img');
        if (logoImg) {
            logoImg.style.display = 'block';
            logoImg.style.visibility = 'visible';
        }

        // Re-add language attributes to ensure all elements have them
        addLangAttributes();

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

    // Function to add data-lang attributes to list items
    function addListItemAttributes() {
        try {
            // Idea Analysis section list items
            const ideaSection = document.querySelector('#idea-analysis');
            if (ideaSection) {
                // Market Research list items
                const marketResearchItems = ideaSection.querySelector('.detail-card:nth-of-type(1) ul').querySelectorAll('li');
                for (let i = 0; i < marketResearchItems.length; i++) {
                    marketResearchItems[i].setAttribute('data-lang', `market-list-${i + 1}`);
                }

                // User Interviews list items
                const userInterviewsItems = ideaSection.querySelector('.detail-card:nth-of-type(2) ul').querySelectorAll('li');
                for (let i = 0; i < userInterviewsItems.length; i++) {
                    userInterviewsItems[i].setAttribute('data-lang', `user-interviews-list-${i + 1}`);
                }

                // Feasibility Study list items
                const feasibilityItems = ideaSection.querySelector('.detail-card:nth-of-type(3) ul').querySelectorAll('li');
                for (let i = 0; i < feasibilityItems.length; i++) {
                    feasibilityItems[i].setAttribute('data-lang', `feasibility-list-${i + 1}`);
                }

                // Outcome items
                const outcomeItems = ideaSection.querySelectorAll('.outcome-item p');
                for (let i = 0; i < outcomeItems.length; i++) {
                    outcomeItems[i].setAttribute('data-lang', `idea-outcome-${i + 1}`);
                }
            }

            // UI/UX section list items
            const uiuxSection = document.querySelector('#ui-ux');
            if (uiuxSection) {
                // User Research list items
                const userResearchItems = uiuxSection.querySelector('.detail-card:nth-of-type(1) ul').querySelectorAll('li');
                for (let i = 0; i < userResearchItems.length; i++) {
                    userResearchItems[i].setAttribute('data-lang', `user-research-list-${i + 1}`);
                }

                // Information Architecture list items
                const infoArchItems = uiuxSection.querySelector('.detail-card:nth-of-type(2) ul').querySelectorAll('li');
                for (let i = 0; i < infoArchItems.length; i++) {
                    infoArchItems[i].setAttribute('data-lang', `info-arch-list-${i + 1}`);
                }

                // Visual Design list items
                const visualDesignItems = uiuxSection.querySelector('.detail-card:nth-of-type(3) ul').querySelectorAll('li');
                for (let i = 0; i < visualDesignItems.length; i++) {
                    visualDesignItems[i].setAttribute('data-lang', `visual-design-list-${i + 1}`);
                }

                // Outcome items
                const outcomeItems = uiuxSection.querySelectorAll('.outcome-item p');
                for (let i = 0; i < outcomeItems.length; i++) {
                    outcomeItems[i].setAttribute('data-lang', `uiux-outcome-${i + 1}`);
                }
            }

            // Development section list items
            const devSection = document.querySelector('#development');
            if (devSection) {
                // Frontend Development list items
                const frontendItems = devSection.querySelector('.detail-card:nth-of-type(1) ul').querySelectorAll('li');
                for (let i = 0; i < frontendItems.length; i++) {
                    frontendItems[i].setAttribute('data-lang', `frontend-list-${i + 1}`);
                }

                // Backend Development list items
                const backendItems = devSection.querySelector('.detail-card:nth-of-type(2) ul').querySelectorAll('li');
                for (let i = 0; i < backendItems.length; i++) {
                    backendItems[i].setAttribute('data-lang', `backend-list-${i + 1}`);
                }

                // QA list items
                const qaItems = devSection.querySelector('.detail-card:nth-of-type(3) ul').querySelectorAll('li');
                for (let i = 0; i < qaItems.length; i++) {
                    qaItems[i].setAttribute('data-lang', `qa-list-${i + 1}`);
                }

                // Outcome items
                const outcomeItems = devSection.querySelectorAll('.outcome-item p');
                for (let i = 0; i < outcomeItems.length; i++) {
                    outcomeItems[i].setAttribute('data-lang', `dev-outcome-${i + 1}`);
                }
            }

            // Deployment section list items
            const deploySection = document.querySelector('#deployment');
            if (deploySection) {
                // App Store Submission list items
                const appStoreItems = deploySection.querySelector('.detail-card:nth-of-type(1) ul').querySelectorAll('li');
                for (let i = 0; i < appStoreItems.length; i++) {
                    appStoreItems[i].setAttribute('data-lang', `app-store-list-${i + 1}`);
                }

                // Google Play Submission list items
                const playStoreItems = deploySection.querySelector('.detail-card:nth-of-type(2) ul').querySelectorAll('li');
                for (let i = 0; i < playStoreItems.length; i++) {
                    playStoreItems[i].setAttribute('data-lang', `play-store-list-${i + 1}`);
                }

                // Continuous Deployment list items
                const cicdItems = deploySection.querySelector('.detail-card:nth-of-type(3) ul').querySelectorAll('li');
                for (let i = 0; i < cicdItems.length; i++) {
                    cicdItems[i].setAttribute('data-lang', `cicd-list-${i + 1}`);
                }

                // Outcome items
                const outcomeItems = deploySection.querySelectorAll('.outcome-item p');
                for (let i = 0; i < outcomeItems.length; i++) {
                    outcomeItems[i].setAttribute('data-lang', `deploy-outcome-${i + 1}`);
                }
            }

            // Security section list items
            const securitySection = document.querySelector('#pentest');
            if (securitySection) {
                // Mobile App Testing list items
                const mobileTestingItems = securitySection.querySelector('.pentest-service:nth-of-type(1) ul').querySelectorAll('li');
                for (let i = 0; i < mobileTestingItems.length; i++) {
                    mobileTestingItems[i].setAttribute('data-lang', `mobile-testing-list-${i + 1}`);
                }

                // Web App Testing list items
                const webTestingItems = securitySection.querySelector('.pentest-service:nth-of-type(2) ul').querySelectorAll('li');
                for (let i = 0; i < webTestingItems.length; i++) {
                    webTestingItems[i].setAttribute('data-lang', `web-testing-list-${i + 1}`);
                }

                // API Testing list items
                const apiTestingItems = securitySection.querySelector('.pentest-service:nth-of-type(3) ul').querySelectorAll('li');
                for (let i = 0; i < apiTestingItems.length; i++) {
                    apiTestingItems[i].setAttribute('data-lang', `api-testing-list-${i + 1}`);
                }
            }
        } catch (error) {
            console.error("Error adding list item language attributes:", error);
        }
    }
}); 