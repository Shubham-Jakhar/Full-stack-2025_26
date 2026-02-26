document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    const viewJobButtons = document.querySelectorAll('.job-footer .btn-primary');
    viewJobButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jobCard = this.closest('.job-card');
            const jobTitle = jobCard.querySelector('.job-title').textContent;
            const jobCompany = jobCard.querySelector('.job-company').textContent;
            const jobDescription = jobCard.querySelector('.job-description').textContent;
            const salaryRange = jobCard.querySelector('.salary-range').textContent;
            
            localStorage.setItem('viewingJob', JSON.stringify({
                title: jobTitle,
                company: jobCompany,
                description: jobDescription,
                salary: salaryRange
            }));
            
            window.location.href = 'cart.html';
        });
    });

    const viewAllButton = document.querySelector('.section-actions .btn-secondary');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function() {
            document.querySelector('#jobs').scrollIntoView({ behavior: 'smooth' });
        });
    }

    const getStartedButton = document.querySelector('.cta-section .btn-primary');
    if (getStartedButton) {
        getStartedButton.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }

    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const jobTitle = document.querySelector('.search-input').value;
            const location = document.querySelector('.location-input').value;
            
            if (jobTitle || location) {
                console.log('Searching for:', jobTitle, 'in', location);
                document.querySelector('#jobs').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const categoryTags = document.querySelectorAll('.category-tag');
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const category = this.textContent;
            console.log('Selected category:', category);
            document.querySelector('#jobs').scrollIntoView({ behavior: 'smooth' });
        });
    });
});