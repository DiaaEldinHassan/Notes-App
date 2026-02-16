import { Router } from "express";
import { signIn, signUp } from "./auth.service.js";
import { success, validate } from "../../index.js";
import { signInSchema, signUpSchema } from "./auth.validation.js";


export const router = Router();

router.post("/signUp", validate(signUpSchema), async (req, res, next) => {
  try {
    const newUser = await signUp(req.body);
    success(res, 200, newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/signIn", validate(signInSchema), async (req, res, next) => {
  try {
    const user = await signIn(req.body);
    success(res, 200, user);
  } catch (error) {
    next(error);
  }
});
