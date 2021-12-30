const Joi = require("joi");
const jwt = require("jsonwebtoken");

const accessKey = process.env.JWT_ACCESS_KEY;
const refreshKey = process.env.JWT_REFRESH_KEY;

const generateAccess = (id) => {
  return jwt.sign({ id }, accessKey, {
    expiresIn: "30m",
  });
};

const generateRefresh = (id) => {
  return jwt.sign({ id }, refreshKey, {
    expiresIn: "1d",
  });
};

/* Input validation for user login */
const validateRegister = (input) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    full_name: Joi.string().min(3).max(40).required(),
    display_name: Joi.string().min(3).max(40).required(),
    email: Joi.string().min(5).max(254).required().email(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    repeat_password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  }).with("password", "repeat_password");
  return schema.validate(input);
};

/* Input validation for user login */
const validateLogin = (input) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  return schema.validate(input);
};

module.exports = {
  generateAccess,
  generateRefresh,
  validateLogin,
  validateRegister,
};
