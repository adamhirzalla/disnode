const Joi = require("joi");
const jwt = require("jsonwebtoken");

const accessKey = process.env.JWT_ACCESS_KEY;
const refreshKey = process.env.JWT_REFRESH_KEY;

const generateAccess = (id) => {
  return jwt.sign({ id }, accessKey, {
    expiresIn: "1d",
  });
};

const generateRefresh = (id) => {
  return jwt.sign({ id }, refreshKey, {
    expiresIn: "1w",
  });
};

/* Input validation for user login */
const validateRegister = (input) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("Username"),
    full_name: Joi.string().min(3).max(40).required().label("Full Name"),
    nickname: Joi.string().min(3).max(40).required().label("Display Name"),
    email: Joi.string().min(5).max(254).required().email().label("Email"),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .label("Password"),
    repeat_password: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Password confirmation")
      .messages({ "any.only": "{{#label}} does not match" }),
  }).with("password", "repeat_password");
  return schema.validate(input);
};

/* Input validation for user login */
const validateLogin = (input) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("Username"),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .label("Password"),
  });
  return schema.validate(input);
};

module.exports = {
  generateAccess,
  generateRefresh,
  validateLogin,
  validateRegister,
};
