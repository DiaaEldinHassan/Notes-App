import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../userContext.jsx";

export default function GoogleSignUp() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const googleToken = credentialResponse.credential;

          const { data } = await axios.post(
            "http://localhost:3000/auth/signIn",
            { token: googleToken }
          );

          localStorage.setItem("token", data.token);

          setUser(data.data);

          navigate("/profile");

        } catch (error) {
          console.error(error.response?.data || error.message);
        }
      }}
      onError={() => {
        console.log("Google Login Failed");
      }}
    />
  );
}
