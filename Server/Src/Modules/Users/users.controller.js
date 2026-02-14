import { Router } from "express";
import { getUserData, updateData } from "./user.service.js";
import { success, authorization, role } from "../../index.js";

export const router = Router();

router.get("/userData",authorization([role.user,role.admin]), async (req, res, next) => {
  try {
    const user = await getUserData(req.user);
    success(res, 200, user);
  } catch (error) {
    next(error);
  }
});

router.patch("/updateUserData",authorization([role.user,role.admin]), async (req, res, next) => {
  try {
    const updateUser = await updateData(req.body, req.user);
    success(res, 201, updateUser);
  } catch (error) {
    next(error);
  }
});
