const form = document.getElementById("contact2-form");
const submitBtn = document.getElementById("submit2-btn");
const formStatus = document.getElementById("form2-status");
const submitHint = document.getElementById("submit-hint");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_STRIP = /[^0-9]/g;

function clearErrors() {
  form.querySelectorAll(".field-error").forEach((el) => (el.textContent = ""));
  form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
}

function showFieldErrors(errors) {
  for (const [field, message] of Object.entries(errors)) {
    const errorEl = form.querySelector(`[data-error="${field}"]`);
    const inputEl = form.querySelector(`[name="${field}"]`);
    if (errorEl) errorEl.textContent = message;
    if (inputEl) inputEl.classList.add("invalid");
  }
}

function showStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  formStatus.hidden = false;
}

function hideStatus() {
  formStatus.hidden = true;
  formStatus.textContent = "";
  formStatus.className = "form-status";
}

function validateClient(data) {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (data.name.trim().length > 100) {
    errors.name = "Name is too long.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone is required.";
  } else {
    const digits = data.phone.replace(PHONE_STRIP, "");
    if (digits.length < 7) {
      errors.phone = "Please enter a valid phone number.";
    }
  }

  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

function updateSubmitState() {
  const formData = new FormData(form);
  const data = {
    name: formData.get("name") || "",
    email: formData.get("email") || "",
    phone: formData.get("phone") || "",
    message: formData.get("message") || "",
  };

  const errors = validateClient(data);
  const hasErrors = Object.keys(errors).length > 0;

  submitBtn.disabled = hasErrors;
  // Provide a clear, visible hint when the button is disabled so the user knows why
  if (submitHint) {
    if (hasErrors) {
      // If individual field errors exist, show a generic prompt to correct fields
      submitHint.textContent = "Please correct the highlighted fields to enable the Send message button.";
      submitHint.classList.remove("hint-ok");
      submitHint.classList.add("hint-error");
      submitBtn.title = "Please complete required fields correctly.";
    } else {
      submitHint.textContent = "All fields look good — ready to send.";
      submitHint.classList.remove("hint-error");
      submitHint.classList.add("hint-ok");
      submitBtn.title = "Send message";
    }
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();
  hideStatus();

  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  const clientErrors = validateClient(data);
  if (Object.keys(clientErrors).length > 0) {
    showFieldErrors(clientErrors);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    const response = await fetch("/api/contact2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.errors) {
        showFieldErrors(result.errors);
      } else {
        showStatus(result.message || "Something went wrong.", "error");
      }
      return;
    }

    showStatus(result.message, "success");
    form.reset();
    submitBtn.disabled = true; // keep disabled until inputs change
    if (submitHint) {
      submitHint.textContent = "Message sent — thank you.";
      submitHint.classList.remove("hint-error");
      submitHint.classList.add("hint-ok");
    }
  } catch (err) {
    showStatus("Network error. Please check your connection and try again.", "error");
  } finally {
    submitBtn.textContent = "Send message";
    // final enabling will be handled by input listeners
  }
});

form.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    field.classList.remove("invalid");
    const errorEl = form.querySelector(`[data-error="${field.name}"]`);
    if (errorEl) errorEl.textContent = "";
    updateSubmitState();
  });
});

// initialize submit state on load
updateSubmitState();