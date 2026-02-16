import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../config.service";
import GenderSelection from "../../Components/Gender Selection/Gender.jsx";

export default function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cPassword: "",
    gender: "",
  });
  const [error, setError] = useState([]);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  function genderSelect(gender) {
    setData({ ...data, gender: gender });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.password ||
      !data.cPassword
    ) {
      setError("Please complete your data");
      return;
    }
    if (data.password !== data.cPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      console.log(data);
      await axios.post(`${apiUrl}/auth/signUp`, data);
      navigate("/auth/signIn");
    } catch (err) {
  if (err.response?.data?.details) {
    setError(err.response.data.details);
  } else {
    if(err.response.data.message.split(" ")[0]==="E11000")
    {
      setError(["Email Is Already Exist"]);
    }
    else
    {
      setError(["Something went wrong!"]);
    console.error(err.response);
    }
    
  }
}

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={data.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={data.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="password"
            name="cPassword"
            placeholder="Confirm Password"
            value={data.cPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <GenderSelection gender={genderSelect}></GenderSelection>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Sign Up
          </button>
          <Link
            to="/auth/signIn"
            className="text-emerald-500 font-medium hover:underline w-full text-right"
          >
            Sign In ?
          </Link>
        </form>
      </div>
    </div>
  );
}
