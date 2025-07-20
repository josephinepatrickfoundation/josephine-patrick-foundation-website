function sendMail() {
  const submitBtn = document.getElementById("submitBtn");
  const sendError = document.getElementById("sendError");

  var params = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    subject: document.getElementById("subject").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  var validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const serviceID = "service_ufpnqon";
  const templateID = "template_o3gffny";

  // Clear previous error messages and remove red borders
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("subjectError").textContent = "";
  document.getElementById("messageError").textContent = "";
  sendError.textContent = "";

  document.getElementById("name").classList.remove("error-border");
  document.getElementById("email").classList.remove("error-border");
  document.getElementById("subject").classList.remove("error-border");
  document.getElementById("message").classList.remove("error-border");

  // Validate the fields and show error messages
  let isValid = true;

  if (!params.name) {
    document.getElementById("nameError").textContent =
      "Please enter your name.";
    document.getElementById("name").classList.add("error-border");
    isValid = false;
  }

  if (!params.email) {
    document.getElementById("emailError").textContent =
      "Please enter your email.";
    document.getElementById("email").classList.add("error-border");
    isValid = false;
  } else if (!params.email.match(validEmailRegex)) {
    document.getElementById("emailError").textContent =
      "Please enter a valid email address.";
    document.getElementById("email").classList.add("error-border");
    isValid = false;
  }

  if (!params.subject) {
    document.getElementById("subjectError").textContent =
      "Please enter a subject.";
    document.getElementById("subject").classList.add("error-border");
    isValid = false;
  }

  if (!params.message) {
    document.getElementById("messageError").textContent =
      "Please enter your message.";
    document.getElementById("message").classList.add("error-border");
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";

      sendError.textContent = "Message sent successfully!";
      sendError.style.color = "#6ce781";
    })
    .catch((err) => {
      console.error("Error sending email:", err);
      sendError.textContent =
        "An error occurred while sending your message. Please try again.";
      sendError.style.color = "#ff8181";
    })
    .finally(() => {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    });
}
