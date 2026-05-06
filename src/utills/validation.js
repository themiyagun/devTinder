const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("All fields are required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email format");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols",
    );
  }
};

const validatePassword = (req) => {
  const { password } = req.body;

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols",
    );
  }
};

const validateProfileEditData = (req) => {
  const allowedUpdateFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "about",
    "skills",
    "gender",
    "age",
  ];

  const isAllowedEdit = Object.keys(req.body).every((field) =>
    allowedUpdateFields.includes(field),
  );

  return isAllowedEdit;
};

module.exports = {
  validateSignUpData,
  validateProfileEditData,
  validatePassword,
};
