import bcrypt from "bcrypt";
import { salt } from "../../../Config/config.service.js";

export async function hashing(password) {
  return await bcrypt.hash(password, Number(salt));
}

export async function hashCompare(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
