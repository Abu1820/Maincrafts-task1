const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

function validateForm() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "") {
        alert("Please enter your name");
        return false;
    }

    if (email === "") {
        alert("Please enter your email");
        return false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email");
        return false;
    }

    if (message === "") {
        alert("Please enter your message");
        return false;
    }

    // Save to LocalStorage
    let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

    submissions.push({
        name: name,
        email: email,
        message: message,
        time: new Date().toLocaleString()
    });

    localStorage.setItem("submissions", JSON.stringify(submissions));

    alert("Form Submitted Successfully!");

    document.getElementById("contactForm").reset();

    return false;
}

const submissionList = document.getElementById("submissionList");

if (submissionList) {

    let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

    if (submissions.length === 0) {

        submissionList.innerHTML = `
        <div class="about-card">
            <h3>📭 No Submissions Yet</h3>
            <p>Your submitted messages will appear here.</p>
        </div>
        `;

    } else {

        submissions.forEach((data, index) => {

            submissionList.innerHTML += `
            <div class="about-card">
                <h3>📩 Submission ${index + 1}</h3>

                <p><strong>👤 Name:</strong> ${data.name}</p>

                <p><strong>📧 Email:</strong> ${data.email}</p>

                <p><strong>💬 Message:</strong></p>

                <p class="message-box">
                    ${data.message}
                </p>

                <p class="timestamp">
                    🕒 Sent on: ${data.time}
                </p>
            </div>
            <br>
            `;
        });
    }
}

function clearSubmissions() {
    if (confirm("Are you sure you want to delete all submissions?")) {
        localStorage.removeItem("submissions");
        location.reload();
    }
}