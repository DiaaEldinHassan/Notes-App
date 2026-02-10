import {
  findOne,
  generateToken,
  hashCompare,
  insertOne,
  throwError,
  throwSuccess,
} from "../../index.js";
export async function signUp(userData) {
  if (
    !userData.email ||
    !userData.firstName ||
    !userData.lastName ||
    !userData.password
  ) {
    throwError(404, "No Data Found");
  }
  try {
    const newUser = await insertOne(userData);
    return throwSuccess("New User Added Successfully", newUser);
  } catch (error) {
    throwError(error.status, error.message);
  }
}

export async function signIn(userData) {
  if (!userData.email || !userData.password) {
    throwError(401, "Please complete your data");
  }
  try {
    let user = await findOne({ email: userData.email });
    if (!user) {
      throwError(401, "User is not exist");
    }
    const pass = await hashCompare(userData.password, user.password);
    if (!pass) {
      throwError(401, "User is not authorized");
    }
    user = user.toObject();
    delete user.password;
    const token = await generateToken(user);
    return throwSuccess("Logged In",user, token);
  } catch (error) {
    throwError(error.status, error.message);
  }
}
