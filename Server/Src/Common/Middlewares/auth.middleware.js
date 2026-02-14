import { role, throwError, verifyToken } from "../index.js";

export function authorization(aud=[role.user]){
 return async(req, res, next)=>{ 
  try {
    const header = req.headers.authorization||req.headers.Authorization;
    if (!header || !header.startsWith("Bearer ")) {
      next(throwError(401, "User is not authorized"));
    }
    const token = header.split(" ")[1];
    if (!token || token === "undefined") {
      next(throwError(401, "JWT Token is missing"));
    }
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(throwError(error.status, error.message));
  }}
}
