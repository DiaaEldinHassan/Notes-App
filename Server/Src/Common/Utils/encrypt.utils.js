import crypto from "node:crypto";
import { encryption_sk } from "../../../Config/config.service.js";
export async function encryption(data) {
  if (typeof data !== "string") {
    throw new Error("Data to encrypt must be a string");
  }
  const alg = "aes-256-cbc";
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    alg,
    Buffer.from(encryption_sk, "hex"),
    iv,
  );
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return { data: encrypted, iv: iv.toString("hex") };
}
