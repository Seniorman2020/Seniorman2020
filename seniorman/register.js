function submitForm() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    if (email === '') {
      alert('Please enter an email address');
      return false;
    }
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return false;
    }
    // Make an AJAX request to verify the email address
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'verification.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
          // Generate a verification code and send it to the email
          const verificationCode = generateVerificationCode();
          sendVerificationCode(email, verificationCode);
          // Open the verification.html page
          window.location.href = "verification.html?code=" + verificationCode;
        } else {
          alert(response.message);
          // If the email already exists, redirect to the login page
          if (response.exists) {
            window.location.href = "login.html";
          }
        }
      }
    };
    xhr.send(`email=${email}`);
    return false;
  }
  
  function generateVerificationCode() {
    // Generate a random 6-digit verification code
    return Math.floor(100000 + Math.random() * 900000);
  }
  
  function sendVerificationCode(email, code) {
    // Send the verification code to the email using your preferred method
    // (e.g., using a mail library or an API)
  }
  