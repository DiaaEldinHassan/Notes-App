export function throwSuccess(message, data, token = "") {
  // Always return a consistent structure
  const response = {
    success: true, 
    message,
    data: data
  };

  if (token) {
    response.token = token;
  }
  return response;
}