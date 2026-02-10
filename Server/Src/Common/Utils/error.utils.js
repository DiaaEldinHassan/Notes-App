export function throwError(code,message) {
    const err=new Error(message);
    err.statusCode=code;
    throw err;
}