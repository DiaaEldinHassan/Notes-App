export function success(res, statusCode,data) {
 
  res.status(statusCode).json(data);
}
