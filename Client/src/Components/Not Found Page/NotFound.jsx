import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-7xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-gray-500">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/auth/signIn"
        className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
