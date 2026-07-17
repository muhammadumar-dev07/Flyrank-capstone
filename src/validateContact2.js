const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_STRIP = /[^0-9]/g;

const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  message: 2000,
};

function validateContact2({ name, email, phone, message }) {
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

  const trimmedPhone = (phone ?? "").trim();
  if (!trimmedPhone) {
    errors.phone = "Phone is required.";
  } else {
    // Validate that there are at least 7 digits when non-digit chars are removed
    const digits = trimmedPhone.replace(PHONE_STRIP, "");
    if (digits.length < 7) {
      errors.phone = "Please enter a valid phone number.";
    } else if (trimmedPhone.length > FIELD_LIMITS.phone) {
      errors.phone = `Phone must be ${FIELD_LIMITS.phone} characters or fewer.`;
    }
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
      phone: trimmedPhone,
      message: trimmedMessage,
    },
  };
}

module.exports = { validateContact2 };