document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or prefer-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Update icon
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile menu functionality (to be implemented with a hamburger menu)
    
    // Show more experience items
    const showMoreExpBtn = document.getElementById('show-more-exp');
    if (showMoreExpBtn) {
        const moreExperience = [
            {
                date: 'Jun 2016 - Dec 2018',
                title: 'DevOps Engineer',
                company: 'MedCrave Group',
                duties: [
                    'Implemented and created information architectures, workflows, and UX designs',
                    'Daily monitoring of RHEL 5/6/7 machines and application servers',
                    'Integrated continuous integration tools (Jenkins)',
                    'Built continuous integration environment and delivery process',
                    'Reduced deployment time for critical agile projects from ~1 month to 2 days'
                ]
            },
            {
                date: 'Jul 2012 - Aug 2015',
                title: 'Linux Administrator',
                company: 'Blue Perl',
                duties: [
                    'Configuration management and RPM management processes',
                    'Deployment and subscription management using RH Satellite, Kickstart',
                    'Established best practices for standardized and automated deployment',
                    'Served as a database administrator for Oracle 11G running on Linux',
                    'Performed backup and recovery utilizing Recovery Manager (RMAN)'
                ]
            }
        ];
        
        showMoreExpBtn.addEventListener('click', () => {
            const timeline = document.querySelector('.timeline');
            
            if (showMoreExpBtn.textContent.includes('Show More')) {
                // Add more experience items
                moreExperience.forEach(exp => {
                    const expItem = document.createElement('div');
                    expItem.className = 'timeline-item';
                    
                    expItem.innerHTML = `
                        <div class="timeline-dot"></div>
                        <div class="timeline-date">${exp.date}</div>
                        <div class="timeline-content">
                            <h3>${exp.title}</h3>
                            <h4>${exp.company}</h4>
                            <ul>
                                ${exp.duties.map(duty => `<li>${duty}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                    
                    timeline.appendChild(expItem);
                });
                
                showMoreExpBtn.textContent = 'Show Less';
            } else {
                // Remove the added items
                const timelineItems = document.querySelectorAll('.timeline-item');
                for (let i = timelineItems.length - 1; i >= 4; i--) {
                    timelineItems[i].remove();
                }
                
                showMoreExpBtn.textContent = 'Show More';
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For now, we'll just show a success message
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // Create a success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <p>Thanks for your message! I'll get back to you soon.</p>
                `;
                
                // Replace the form with the success message
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // Style the success message
                successMessage.style.textAlign = 'center';
                successMessage.style.padding = '2rem';
                successMessage.querySelector('.success-icon').style.fontSize = '3rem';
                successMessage.querySelector('.success-icon').style.color = 'var(--success-color)';
                successMessage.querySelector('p').style.marginTop = '1rem';
                
                // For demonstration only - in reality, you'd use AJAX to submit the form
                console.log('Form submitted:', { name, email, message });
            }
        });
    }
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.section-header, .timeline-item, .project-card, .certification-card, .education-item');
    
    const revealElement = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(revealElement, revealOptions);
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(element);
        });
        
        // Add a class when element is revealed
        document.addEventListener('scroll', () => {
            revealElements.forEach(element => {
                if (element.getBoundingClientRect().top < window.innerHeight) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        });
    }
}); 