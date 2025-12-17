const isValid = (input) => {
  if (input === undefined || input === null) return false;

  if (typeof input === "string" && input.trim().length === 0) return false;

  if (typeof input === "number" && isNaN(input)) return false;

  return true;
};

const isValidPositiveNumber = (value) => {
  return typeof value === "number" && value > 0;
};

const isValidDate = (value) => {
  return !isNaN(Date.parse(value));
};

const isValidEmail = (input) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);

const isValidPassword = (input) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/.test(
    input
  );

module.exports = {
  isValid,
  isValidPositiveNumber,
  isValidDate,
  isValidEmail,
  isValidPassword,
};
