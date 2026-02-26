let postedJobs = [];
let allAvailableJobs = [];
let currentEditId = null;
const defaultJobs = [
    {
        id: 101,
        company: "Google",
        position: "Senior Software Engineer",
        location: "Mountain View, CA",
        salary: "$180k - $250k",
        description: "Build scalable systems and work on products used by billions."
    },
    {
        id: 102,
        company: "Meta",
        position: "Product Manager",
        location: "Menlo Park, CA",
        salary: "$160k - $220k",
        description: "Lead product strategy and vision for our next-generation platform."
    },
    {
        id: 103,
        company: "Apple",
        position: "UX/UI Designer",
        location: "Cupertino, CA",
        salary: "$140k - $200k",
        description: "Design beautiful experiences that millions use every day."
    },
    {
        id: 104,
        company: "Microsoft",
        position: "Cloud Architect",
        location: "Redmond, WA",
        salary: "$170k - $230k",
        description: "Design and implement cloud solutions for enterprise clients."
    },
    {
        id: 105,
        company: "Amazon",
        position: "Data Scientist",
        location: "Seattle, WA",
        salary: "$150k - $210k",
        description: "Analyze massive datasets and build predictive models."
    },
    {
        id: 106,
        company: "Tesla",
        position: "Mechanical Engineer",
        location: "Austin, TX",
        salary: "$130k - $190k",
        description: "Work on cutting-edge electric vehicle technology."
    },
    {
        id: 107,
        company: "Netflix",
        position: "Backend Engineer",
        location: "Los Gatos, CA",
        salary: "$160k - $220k",
        description: "Build the infrastructure for millions of streaming users."
    },
    {
        id: 108,
        company: "Airbnb",
        position: "Full Stack Developer",
        location: "San Francisco, CA",
        salary: "$150k - $210k",
        description: "Create experiences that connect people around the world."
    }
];

const jobForm = document.getElementById('jobForm');
const postedJobsDiv = document.getElementById('postedJobs');
const searchJobsInput = document.getElementById('searchJobsInput');
const searchResults = document.getElementById('searchResults');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const closeModalBtn = document.getElementById('closeModal');
const cancelEditBtn = document.getElementById('cancelEdit');
const modalOverlay = document.getElementById('modalOverlay');

window.addEventListener('DOMContentLoaded', () => {
    loadPostedJobs();
    allAvailableJobs = [...defaultJobs];
    renderPostedJobs();
});

jobForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const job = {
        id: Date.now(),
        company: document.getElementById('companyName').value.trim(),
        position: document.getElementById('jobPosition').value.trim(),
        location: document.getElementById('location').value.trim(),
        salaryMin: parseInt(document.getElementById('salaryMin').value),
        salaryMax: parseInt(document.getElementById('salaryMax').value),
        description: document.getElementById('jobDescription').value.trim()
    };

    postedJobs.push(job);
    savePostedJobs();
    renderPostedJobs();
    jobForm.reset();
});

searchJobsInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (!searchTerm) {
        searchResults.innerHTML = '<p class="empty-msg">Enter search terms to find jobs</p>';
        return;
    }

    const filtered = allAvailableJobs.filter(job => 
        job.company.toLowerCase().includes(searchTerm) ||
        job.position.toLowerCase().includes(searchTerm) ||
        job.location.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
        searchResults.innerHTML = '<p class="empty-msg">No jobs found</p>';
        return;
    }

    searchResults.innerHTML = filtered.map(job => `
        <div class="job-item">
            <div class="job-item-header">
                <h4 class="job-item-title">${job.position}</h4>
                <span class="job-item-salary">${job.salary}</span>
            </div>
            <p class="job-item-company">${job.company}</p>
            <p class="job-item-location">${job.location}</p>
            <p class="job-item-desc">${job.description}</p>
        </div>
    `).join('');
});

function renderPostedJobs() {
    if (postedJobs.length === 0) {
        postedJobsDiv.innerHTML = '<p class="empty-msg">No jobs posted yet</p>';
        return;
    }

    postedJobsDiv.innerHTML = postedJobs.map(job => `
        <div class="job-item">
            <div class="job-item-header">
                <div>
                    <h4 class="job-item-title">${job.position}</h4>
                    <p class="job-item-company">${job.company}</p>
                </div>
                <span class="job-item-salary">$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}</span>
            </div>
            <p class="job-item-location">${job.location}</p>
            <p class="job-item-desc">${job.description}</p>
            <div class="job-item-actions">
                <button class="btn btn-small btn-edit" data-id="${job.id}">Edit</button>
                <button class="btn btn-small btn-delete" data-id="${job.id}">Delete</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => openEditModal(parseInt(e.target.dataset.id)));
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => deleteJob(parseInt(e.target.dataset.id)));
    });
}

function openEditModal(id) {
    const job = postedJobs.find(j => j.id === id);
    if (!job) return;

    currentEditId = id;
    document.getElementById('editCompanyName').value = job.company;
    document.getElementById('editJobPosition').value = job.position;
    document.getElementById('editLocation').value = job.location;
    document.getElementById('editSalaryMin').value = job.salaryMin;
    document.getElementById('editSalaryMax').value = job.salaryMax;
    document.getElementById('editJobDescription').value = job.description;

    editModal.classList.add('active');
}

function closeModal() {
    editModal.classList.remove('active');
    currentEditId = null;
    editForm.reset();
}

closeModalBtn.addEventListener('click', closeModal);
cancelEditBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const job = postedJobs.find(j => j.id === currentEditId);
    if (!job) return;

    job.company = document.getElementById('editCompanyName').value.trim();
    job.position = document.getElementById('editJobPosition').value.trim();
    job.location = document.getElementById('editLocation').value.trim();
    job.salaryMin = parseInt(document.getElementById('editSalaryMin').value);
    job.salaryMax = parseInt(document.getElementById('editSalaryMax').value);
    job.description = document.getElementById('editJobDescription').value.trim();

    savePostedJobs();
    renderPostedJobs();
    closeModal();
});

function deleteJob(id) {
    if (confirm('Are you sure you want to delete this job?')) {
        postedJobs = postedJobs.filter(j => j.id !== id);
        savePostedJobs();
        renderPostedJobs();
    }
}

function savePostedJobs() {
    localStorage.setItem('postedJobs', JSON.stringify(postedJobs));
}

function loadPostedJobs() {
    const saved = localStorage.getItem('postedJobs');
    if (saved) {
        try {
            postedJobs = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading jobs:', e);
            postedJobs = [];
        }
    }
}