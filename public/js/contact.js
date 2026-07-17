const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clearErrors() {
  form.querySelectorAll(".field-error").forEach((el) => {
    el.textContent = "";
  });
  form.querySelectorAll(".invalid").forEach((el) => {
    el.classList.remove("invalid");
  });
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
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.subject.trim()) {
    errors.subject = "Subject is required.";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();
  hideStatus();

  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
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
    const response = await fetch("/api/contact", {
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
  } catch {
    showStatus("Network error. Please check your connection and try again.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send message";
  }
});

form.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    field.classList.remove("invalid");
    const errorEl = form.querySelector(`[data-error="${field.name}"]`);
    if (errorEl) errorEl.textContent = "";
  });
});
