// Basic mock database for demo
const mockDoctorDatabase = [
    {
        name: "Dr. Rajesh Kumar",
        registrationNumber: "MH12345",
        state: "Maharashtra",
        specialization: "Cardiology",
        yearOfRegistration: 2015,
        status: "Active"
    },
    {
        name: "Dr. Priya Sharma",
        registrationNumber: "DL67890",
        state: "Delhi",
        specialization: "Pediatrics",
        yearOfRegistration: 2018,
        status: "Active"
    },
    {
        name: "Dr. Amit Patel",
        registrationNumber: "GJ11111",
        state: "Gujarat",
        specialization: "General Medicine",
        yearOfRegistration: 2012,
        status: "Active"
    },
    {
        name: "Dr. Sunita Reddy",
        registrationNumber: "KA22222",
        state: "Karnataka",
        specialization: "Dermatology",
        yearOfRegistration: 2020,
        status: "Active"
    },
    {
        name: "Dr. Vikram Singh",
        registrationNumber: "RJ33333",
        state: "Rajasthan",
        specialization: "Orthopedics",
        yearOfRegistration: 2016,
        status: "Active"
    }
];

document.getElementById('verificationForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const doctorData = {
        name: formData.get('doctorName').trim(),
        registrationNumber: formData.get('registrationNumber').trim().toUpperCase(),
        state: formData.get('state'),
        specialization: formData.get('specialization').trim(),
        yearOfRegistration: formData.get('yearOfRegistration')
    };

    // Show loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('verifyBtn').disabled = true;

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Verify against mock database
    const isVerified = verifyDoctor(doctorData);

    // Hide loading
    document.getElementById('loading').style.display = 'none';
    document.getElementById('verifyBtn').disabled = false;

    // Show results
    displayResult(isVerified, doctorData);
});

function verifyDoctor(inputData) {
    // Check if doctor exists in database
    const foundDoctor = mockDoctorDatabase.find(doctor =>
        doctor.name.toLowerCase().includes(inputData.name.toLowerCase()) &&
        doctor.registrationNumber === inputData.registrationNumber &&
        doctor.state === inputData.state
    );

    return foundDoctor || null;
}

function displayResult(verifiedDoctor, inputData) {
    const resultSection = document.getElementById('resultSection');
    const resultIcon = document.getElementById('resultIcon');
    const resultMessage = document.getElementById('resultMessage');
    const doctorDetails = document.getElementById('doctorDetails');

    resultSection.style.display = 'block';

    if (verifiedDoctor) {
        resultSection.className = 'result-section result-verified';
        resultIcon.textContent = '✅';
        resultMessage.innerHTML = `
            <strong>VERIFIED DOCTOR</strong><br>
            This doctor is registered and authentic
        `;
        doctorDetails.innerHTML = `
            <strong>Verified Details:</strong><br>
            Name: ${verifiedDoctor.name}<br>
            Registration: ${verifiedDoctor.registrationNumber}<br>
            State: ${verifiedDoctor.state}<br>
            Specialization: ${verifiedDoctor.specialization}<br>
            Registered Since: ${verifiedDoctor.yearOfRegistration}<br>
            Status: ${verifiedDoctor.status}
        `;
    } else {
        resultSection.className = 'result-section result-fake';
        resultIcon.textContent = '❌';
        resultMessage.innerHTML = `
            <strong>NOT VERIFIED / FAKE DOCTOR</strong><br>
            No matching record found in our database
        `;
        doctorDetails.innerHTML = `
            <strong>Searched For:</strong><br>
            Name: ${inputData.name}<br>
            Registration: ${inputData.registrationNumber}<br>
            State: ${inputData.state}<br>
            <br>
            <em>⚠️ Please verify with local medical council or report if suspicious</em>
        `;
    }

    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Simple interactive feedback
document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });

    element.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});
