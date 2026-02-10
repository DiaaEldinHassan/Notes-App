import jwt from "jsonwebtoken";
import { jwt_sk } from "../../../Config/config.service.js";
export async function generateToken(payload) {
  return await jwt.sign(payload, jwt_sk, { expiresIn: "1d" });
}

export async function verifyToken(token) {
    return await jwt.verify(token,jwt_sk);
}