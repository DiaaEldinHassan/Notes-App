import {
  findOne,
  generateToken,
  hashCompare,
  insertOne,
  throwError,
  throwSuccess,
  googleVerification,
} from "../../index.js";

export async function signUp(userData) {
  try {
    if (
      !userData.email ||
      !userData.firstName ||
      !userData.lastName ||
      !userData.password
    ) {
      throwError(400, "Missing Required Fields");
    }
    const newUser = await insertOne({
      ...userData,
      provider: "local",
    });

    return throwSuccess("New User Added Successfully", newUser);
  } catch (error) {
    throwError(error.status || 500, error.message);
  }
}

export async function signIn(userData) {
  if (userData.token) {
    const { email } = await googleVerification(userData.token);
    try {
      let user = await findOne({ email });
      if (!user) {
        user = await insertOne({
          email,
          firstName: given_name,
          lastName: family_name,
          provider: "google",
          image: picture,
        });
      }

      user = user.toObject();
      delete user.password;

      const token = await generateToken(user);

      return throwSuccess("Logged In With Google", user, token);
    } catch (error) {
      throwError(401, "Not Authorized");
    }
  }
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
    return throwSuccess("Logged In", user, token);
  } catch (error) {
    throwError(error.status, error.message);
  }
}
