import { UserContext } from "./userContext.jsx";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectRoutes({ children }) {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to={"/auth/signIn"} replace></Navigate>;
  }
  return children;
}
