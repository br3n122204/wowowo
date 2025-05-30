document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    const showLoginBtn = document.getElementById('showLogin');
    const showSignupBtn = document.getElementById('showSignup');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginMessage = document.getElementById('loginMessage');
    const signupMessage = document.getElementById('signupMessage');
    const typerElement = document.getElementById('typer');
    const typerOutput = document.getElementById('hacker-typer-output');

    // --- Hacker Typer Effect ---
    const linesToType = [
        "Initializing Secure Shell v3.1...",
        "Connecting to Access Node Delta-7...",
        "Bypassing primary firewalls...",
        "Authentication required.",
        "Standby for Agent Input...",
        "System Status: Nominal.",
        "Awaiting credentials...",
        "Warning: Unauthorized access attempts are logged.",
        "Protocol Engaged: Shadow Handshake.",
        "Ready for login or registration."
    ];
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let isTyping = false;
    const typingSpeed = 50; // Milliseconds per character
    const delayBetweenLines = 1500; // Milliseconds

    function typeLine() {
        if (currentLineIndex >= linesToType.length) {
            // Optional: Loop back or stop
             currentLineIndex = 0; // Loop
            // typerElement.textContent = "System Ready."; // Stop
            // return;
        }

        const line = linesToType[currentLineIndex];
        if (currentCharIndex < line.length) {
            isTyping = true;
            typerElement.textContent += line.charAt(currentCharIndex);
            currentCharIndex++;
            // Scroll to bottom of typer output
            typerOutput.scrollTop = typerOutput.scrollHeight;
            setTimeout(typeLine, typingSpeed);
        } else {
            // Line finished, wait then start next line
            isTyping = false;
            currentCharIndex = 0;
            currentLineIndex++;
            setTimeout(() => {
                typerElement.textContent = ""; // Clear for next line
                typeLine();
            }, delayBetweenLines);
        }
    }

    // Start the typer effect
    typeLine();


    // --- Form Switching Logic ---
    function showForm(formToShow, buttonToActivate) {
        // Hide both forms initially
        loginForm.classList.remove('active-form');
        signupForm.classList.remove('active-form');
        // Deactivate both buttons
        showLoginBtn.classList.remove('active');
        showSignupBtn.classList.remove('active');
        // Clear messages
        loginMessage.textContent = '';
        loginMessage.className = 'message'; // Reset class
        signupMessage.textContent = '';
        signupMessage.className = 'message'; // Reset class

        // Show the target form and activate button
        formToShow.classList.add('active-form');
        buttonToActivate.classList.add('active');
    }

    showLoginBtn.addEventListener('click', () => showForm(loginForm, showLoginBtn));
    showSignupBtn.addEventListener('click', () => showForm(signupForm, showSignupBtn));


    // --- Simulated Form Submission ---

    // Login Form Handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission
        const username = loginForm.loginUser.value;
        const password = loginForm.loginPass.value;

        loginMessage.textContent = 'Processing Authentication...';
        loginMessage.className = 'message processing'; // Yellow

        // Simulate network delay & validation
        setTimeout(() => {
            // Basic check (replace with real validation if needed)
            if (username && password.length >= 6) {
                // Simulate success
                loginMessage.textContent = 'Access Granted. Welcome, Agent ' + username + '.';
                loginMessage.className = 'message success'; // Green
                // You could redirect here in a real app: window.location.href = '/dashboard';
            } else {
                 // Simulate failure
                loginMessage.textContent = 'Access Denied. Invalid Credentials or Protocol Mismatch.';
                loginMessage.className = 'message error'; // Red
            }
        }, 1500); // 1.5 second delay
    });

    // Signup Form Handler
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = signupForm.signupUser.value;
        const email = signupForm.signupEmail.value;
        const password = signupForm.signupPass.value;
        const confirmPassword = signupForm.signupConfirmPass.value;

        signupMessage.textContent = 'Registering New Agent Profile...';
        signupMessage.className = 'message processing'; // Yellow

        // Simulate network delay & validation
        setTimeout(() => {
             // Basic checks
            if (!username || !email || !password || !confirmPassword) {
                signupMessage.textContent = 'Registration Failed: All fields are required.';
                signupMessage.className = 'message error';
            } else if (password !== confirmPassword) {
                 signupMessage.textContent = 'Registration Failed: Pass_Keys do not match.';
                 signupMessage.className = 'message error';
            } else if (password.length < 8) {
                signupMessage.textContent = 'Registration Failed: Pass_Key must be at least 8 characters.';
                signupMessage.className = 'message error';
             } else {
                 // Simulate success
                signupMessage.textContent = 'Registration Successful! Agent profile created. Please Login.';
                signupMessage.className = 'message success';
                // Optionally switch back to login form after success
                setTimeout(() => {
                    showForm(loginForm, showLoginBtn);
                }, 2000); // Wait 2 seconds before switching
            }
        }, 1500); // 1.5 second delay
    });

});