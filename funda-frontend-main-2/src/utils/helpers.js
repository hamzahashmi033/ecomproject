export const getAsset = (filename) => {
  return process.env.REACT_APP_BACKEND_ENV + "/assets" + filename;
};

export const isPasswordValid = (password) => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialCharacters = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(
    password
  );

  let valid = true;

  if (password.length < minLength) valid = false;
  if (!hasUppercase) valid = false;
  if (!hasLowercase) valid = false;
  if (!hasNumbers) valid = false;
  if (!hasSpecialCharacters) valid = false;

  return valid;
};
