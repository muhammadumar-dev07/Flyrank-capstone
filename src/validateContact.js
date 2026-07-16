const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 2000,
};

function validateContact({ name, email, subject, message }) {
  const errors = {};

  const trimmedName = (name ?? "").trim();
  if (!trimmedName) {
    errors.name = "Name is required.";
  } else if (trimmedName.length > FIELD_LIMITS.name) {
    errors.name = `Name must be ${FIELD_LIMITS.name} characters or fewer.`;
  }

  const trimmedEmail = (email ?? "").trim();
  if (!trimmedEmail) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  } else if (trimmedEmail.length > FIELD_LIMITS.email) {
    errors.email = `Email must be ${FIELD_LIMITS.email} characters or fewer.`;
  }

  const trimmedSubject = (subject ?? "").trim();
  if (!trimmedSubject) {
    errors.subject = "Subject is required.";
  } else if (trimmedSubject.length > FIELD_LIMITS.subject) {
    errors.subject = `Subject must be ${FIELD_LIMITS.subject} characters or fewer.`;
  }

  const trimmedMessage = (message ?? "").trim();
  if (!trimmedMessage) {
    errors.message = "Message is required.";
  } else if (trimmedMessage.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (trimmedMessage.length > FIELD_LIMITS.message) {
    errors.message = `Message must be ${FIELD_LIMITS.message} characters or fewer.`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: {
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage,
    },
  };
}

module.exports = { validateContact };
