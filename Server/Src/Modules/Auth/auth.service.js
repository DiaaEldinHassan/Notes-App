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

  // ================= GOOGLE LOGIN =================
  if (userData.token) {
    try {
      const { email, firstName, lastName, picture } =
        await googleVerification(userData.token);

      let user = await findOne({ email });

      if (!user) {
        user = await insertOne({
          email,
          firstName,
          lastName,
          provider: "google",
          image: picture,
        });
      }

      user = user.toObject();
      delete user.password;

      const token = await generateToken(user);

      return throwSuccess("Logged In With Google", user, token);
    } catch (error) {
      throwError(error.status || 500, error.message || "Google Signin error");
    }
  }

  // ================= NORMAL LOGIN =================
  if (!userData.email || !userData.password) {
    throwError(401, "Please complete your data");
  }

  try {
    let user = await findOne({ email: userData.email });

    if (!user) {
      throwError(401, "Invalid email or password");
    }

    if (user.provider === "google") {
      throwError(401, "Please login using Google");
    }

    if (!user.password) {
      throwError(401, "Invalid login method");
    }

    const pass = await hashCompare(userData.password, user.password);

    if (!pass) {
      throwError(401, "Invalid email or password");
    }

    user = user.toObject();
    delete user.password;

    const token = await generateToken(user);

    return throwSuccess("Logged In", user, token);
  } catch (error) {
    throwError(error.status || 500, error.message);
  }
}
