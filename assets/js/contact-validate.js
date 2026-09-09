/* =========================================
   NOVALYTE STUDIO — CONTACT FORM VALIDATION
========================================= */

(function () {
  "use strict";

  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameInput = document.getElementById("cf-name");
  const emailInput = document.getElementById("cf-email");
  const phoneInput = document.getElementById("cf-phone");
  const messageInput = document.getElementById("cf-message");
  const formMessage = form.querySelector(".form-message");
  const submitBtn = form.querySelector("button[type='submit']");

  const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  /* ---- auto-growing message box (no manual resize handle) ---- */
  function autoGrow() {
    messageInput.style.height = "auto";
    messageInput.style.height = messageInput.scrollHeight + "px";
  }
  messageInput.addEventListener("input", autoGrow);
  autoGrow();

  /* ---- auto-grow the message textarea as user types ---- */
  function autoGrow() {
    messageInput.style.height = "auto";
    messageInput.style.height = messageInput.scrollHeight + "px";
  }
  if (messageInput) {
    autoGrow(); // set correct initial height
    messageInput.addEventListener("input", autoGrow);
  }

  function getErrorEl(input) {
    return input.closest(".input-icon").parentElement.querySelector(".field-error");
  }

  function markInvalid(input, message) {
    input.closest(".input-icon").classList.add("invalid");
    input.closest(".input-icon").classList.remove("valid");
    getErrorEl(input).textContent = message;
  }

  function markValid(input) {
    input.closest(".input-icon").classList.remove("invalid");
    input.closest(".input-icon").classList.add("valid");
    getErrorEl(input).textContent = "";
  }

  function clearState(input) {
    input.closest(".input-icon").classList.remove("invalid", "valid");
    getErrorEl(input).textContent = "";
  }

  /* ---- individual field validators ---- */

  function validateName() {
    const value = nameInput.value.trim();
    if (!value) {
      markInvalid(nameInput, "Name is required.");
      return false;
    }
    if (value.length < 3) {
      markInvalid(nameInput, "Name must be at least 3 characters.");
      return false;
    }
    if (!/^[a-zA-Z\s.'-]+$/.test(value)) {
      markInvalid(nameInput, "Name can only contain letters.");
      return false;
    }
    markValid(nameInput);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      markInvalid(emailInput, "Email is required.");
      return false;
    }
    if (!GMAIL_REGEX.test(value)) {
      markInvalid(emailInput, "Only Gmail addresses (name@gmail.com) are allowed.");
      return false;
    }
    markValid(emailInput);
    return true;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    if (!value) {
      clearState(phoneInput); // optional field
      return true;
    }
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length < 11) {
      markInvalid(phoneInput, "Phone number must be at least 11 digits.");
      return false;
    }
    markValid(phoneInput);
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (!value) {
      markInvalid(messageInput, "Message is required.");
      return false;
    }
    if (value.length < 10) {
      markInvalid(messageInput, "Please write at least 10 characters.");
      return false;
    }
    markValid(messageInput);
    return true;
  }

  /* ---- live validation: only nag after first error ---- */

  [
    [nameInput, validateName],
    [emailInput, validateEmail],
    [phoneInput, validatePhone],
    [messageInput, validateMessage],
  ].forEach(([input, validator]) => {
    input.addEventListener("blur", validator);
    input.addEventListener("input", () => {
      if (input.closest(".input-icon").classList.contains("invalid")) validator();
    });
  });

  /* ---- submit ---- */

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();

    const allValid = isNameValid && isEmailValid && isPhoneValid && isMessageValid;

    if (!allValid) {
      formMessage.textContent = "Please fix the highlighted fields before sending.";
      formMessage.style.color = "#C0392B";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Simulate submission — replace with a real fetch() call to your backend
    setTimeout(() => {
      formMessage.textContent = "Thanks! Your message has been sent — we'll reply soon.";
      formMessage.style.color = "#3C8A5B";
      form.reset();
      [nameInput, emailInput, phoneInput, messageInput].forEach(clearState);
      autoGrow();
      submitBtn.disabled = false;
      submitBtn.textContent = "Send message ↗";
    }, 900);
  });
})();