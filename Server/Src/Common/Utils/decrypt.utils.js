import crypto from "node:crypto";
import { encryption_sk } from "../../../Config/config.service.js";

const algorithm = "aes-256-cbc";

export function decryption(note) {
  if (!note?.iv || !note?.data) {
    throw new Error("Invalid encrypted note");
  }

  // Key must be 32 bytes Buffer
  const key = Buffer.from(encryption_sk, "hex");

  // IV must be 16 bytes Buffer
  const iv = Buffer.from(note.iv, "hex");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  // note.data is hex string, output is utf8
  let decrypted = decipher.update(note.data, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
