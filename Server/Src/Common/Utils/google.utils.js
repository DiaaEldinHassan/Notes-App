import { OAuth2Client } from "google-auth-library";
import { client_id } from "../../../Config/config.service.js";
const client = new OAuth2Client(client_id);

export async function googleVerification(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: client_id,
  });
  const payload = ticket.getPayload();
  const { email, given_name, family_name, picture } = payload;

  return { email,firstName:given_name,lastName:family_name, picture };
}
