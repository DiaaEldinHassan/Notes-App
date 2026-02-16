import Joi from "joi";
import {gender} from "../../index.js"
export const signInSchema = Joi.alternatives()
  .try(
    Joi.object({
      email: Joi.string()
        .email()
        .required()
        .messages({
          "string.email": "Please enter a valid email address",
          "string.empty": "Email is required",
          "any.required": "Email is required",
        }),
      password: Joi.string()
        .required()
        .messages({
          "string.empty": "Password is required",
          "any.required": "Password is required",
        }),
    }).unknown(false),

    Joi.object({
      token: Joi.string()
        .required()
        .messages({
          "string.empty": "Google token is required",
          "any.required": "Google token is required",
        }),
    }).unknown(false)
  )
  .messages({
    "alternatives.match":
      "You must provide either email and password OR a Google token",
  });

  export const signUpSchema = Joi.object({
  firstName: Joi.string().min(2).max(20).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
    "string.max": "First name must be at most 20 characters",
  }),

  lastName: Joi.string().min(2).max(20).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters",
    "string.max": "Last name must be at most 20 characters",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),

  cPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Confirm password is required",
    }),

  gender: Joi.string()
    .valid(gender.male, gender.female)
    .default(gender.male)
    .required()
    .messages({
      "any.only": "Gender must be male or female",
      "any.required": "Gender is required",
    }),
}).unknown(false);
