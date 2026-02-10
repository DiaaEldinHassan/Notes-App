import { UserContext } from "../../userContext";
import { useContext, useState } from "react";
import { updateUser as updateUserApi } from "../../Services/users.service.js";

export default function UpdateProfileForm() {
  const { user, setUser } = useContext(UserContext);
  const [isSaving, setIsSaving] = useState(false);
  // Use local state so we don't spam the Global Context while typing
  const [formData, setFormData] = useState(() => ({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    bio: user?.bio || "",
  }));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleUpdate() {
    try {
      // 1. Call your Service/API
      setIsSaving(true);
      const res = await updateUserApi(formData);
      setIsSaving(false);

      setUser(res.data.data);
      alert("Profile updated successfully!");
      
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Error updating profile");
    }
  }

  return (
    <div className="self-center flex items-center justify-center p-4 w-full">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-emerald-500 p-6">
          <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
          <p className="text-emerald-100 text-sm">
            Update your personal information.
          </p>
        </div>

        <form className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Bio
            </label>
            <textarea
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleUpdate}
              disabled={isSaving}
              type="button"
              className={`flex-1 px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md 
      ${
        isSaving
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-emerald-600 active:scale-[0.98]"
      }`}
            >
              {isSaving ? (
                <span className="flex items-center justify-center gap-2">
                  {/* Simple CSS Spinner */}
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </span>
              ) : (
                "Update Profile"
              )}
            </button>

            <button
              type="button"
              onClick={() => window.location.reload()} // Simple way to reset or just navigate back
              className="px-6 py-3 bg-white text-gray-500 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
