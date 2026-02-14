import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import note from "../../assets/notes.png";
import GoogleSignUp from "../../Components/Google Button/Google.jsx";

export default function SignIn() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const sendingData = await axios.post(
        "http://localhost:3000/auth/signIn",
        data
      );
      localStorage.setItem("token", sendingData.data.token);
      navigate("/notes/myNotes");
    } catch (error) {
      const msg = error.response?.data?.message || "Server error";
      console.log("Login failed:", msg);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <img alt="My Notes" src={note} className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-3xl font-bold text-gray-800">
            Sign in to your account
          </h2>
          <p className="mt-2 text-gray-500">Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-emerald-500 hover:text-emerald-400"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="********"
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Sign In
          </button>
             or 
          <GoogleSignUp>Sign In With Google</GoogleSignUp>
        </form>

        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link
            to="/auth/signUp"
            className="text-emerald-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
