import { Router } from "express";
import { getUserData, updateData } from "./user.service.js";
import { success } from "../../index.js";

export const router = Router();

router.get("/userData", async (req, res, next) => {
  try {
    const user = await getUserData(req.user);
    success(res, 200, user);
  } catch (error) {
    next(error);
  }
});

router.patch("/updateUserData", async (req, res, next) => {
  try {
    const updateUser = await updateData(req.body, req.user);
    success(res, 201, updateUser);
  } catch (error) {
    next(error);
  }
});
