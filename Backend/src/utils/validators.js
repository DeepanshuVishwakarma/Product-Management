const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidName = (name) => {
  if (!name || name.length > 20) return false;
};

const isValidPassword = (pass) => {
  if (!pass || pass.length > 20 || pass.length < 4) return false;
};

const isProductValid = (product) => {};

module.exports = { isEmailValid, isValidPassword, isValidName };
