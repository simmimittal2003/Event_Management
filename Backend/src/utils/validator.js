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

module.exports = {
  isValid,
  isValidPositiveNumber,
  isValidDate,
};
