export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  // in regex ^ means contains others except the defined arguments
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
  return passwordRegex.test(password);
};

export const isValidPhone = (phone) => /^\d{10,15}$/.test(phone); // Validates phone numbers with 10-15 digits
