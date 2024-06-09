const countriesAndStates = {
    "USA": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
    "Canada": ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"],
    "Nigeria": ["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"]
};

document.addEventListener('DOMContentLoaded', function() {
    populateCountries();
});

function populateCountries() {
    const nationalitySelect = document.getElementById('nationality');
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Select";
    nationalitySelect.appendChild(defaultOption);

    for (const country in countriesAndStates) {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        nationalitySelect.appendChild(option);
    }
}

function updateStates() {
    const stateSelect = document.getElementById('state');
    const nationalitySelect = document.getElementById('nationality');
    const selectedCountry = nationalitySelect.value;
    
    while (stateSelect.firstChild) {
        stateSelect.removeChild(stateSelect.firstChild);
    }

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Select";
    stateSelect.appendChild(defaultOption);

    if (countriesAndStates[selectedCountry]) {
        countriesAndStates[selectedCountry].forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }
}

function showNextForm(formNumber) {
    const currentForm = document.querySelector('form.active');
    const nextForm = document.getElementById(`form${formNumber}`);
    
    if (validateForm(currentForm)) {
        currentForm.classList.remove('active');
        currentForm.classList.add('hidden');
        nextForm.classList.remove('hidden');
        nextForm.classList.add('active');

        if (formNumber === 4) {
            populatePreview();
        }
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, select');
    for (const input of inputs) {
        if (!input.checkValidity()) {
            alert('Please fill out all required fields.');
            return false;
        }
    }
    return true;
}

function populatePreview() {
    const previewContainer = document.getElementById('preview-container');
    previewContainer.innerHTML = '';

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.type === 'file') {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(input.files[0]);
                img.alt = 'Passport Image';
                img.style.maxWidth = '200px';
                img.style.maxHeight = '200px';
                previewContainer.appendChild(img);
            } else {
                const div = document.createElement('div');
                div.textContent = `${input.previousElementSibling.textContent}: ${input.value}`;
                previewContainer.appendChild(div);
            }
        });
    });
}

function submitForm() {
    if (confirm('Are you sure you want to submit the form?')) {
        alert('Form submitted successfully!');
    }
}
