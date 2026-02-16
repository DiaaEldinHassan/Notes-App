import Nav from "../../Components/NavBar/NavBar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import male from "../../assets/male.png";
import female from "../../assets/artist.png";
import { useContext } from "react";
import { UserContext } from "../../userContext.jsx";
import UpdateProfileForm from "../../Components/Update Form/UpdateForm.jsx";

export default function Profile() {
  const { user } = useContext(UserContext);
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-emerald-200 rounded-full mb-4"></div>
          <p className="text-gray-500 font-medium">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />

      <main className="flex-1 flex flex-col lg:flex-row gap-8 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
        {/* Sidebar: Profile Summary */}
        <aside className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <img
                src={
                  user.image
                    ? user.image
                    : user && user.gender === "Male"
                      ? male
                      : female
                }
                alt="Avatar"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-emerald-500/10"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 capitalize">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500 text-sm mb-6 lowercase">
              @{user.username}
            </p>

            <div className="w-full space-y-4 pt-6 border-t border-gray-100 text-left">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400 uppercase">
                  Role
                </span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase">
                  {user.role}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase">
                  Email
                </span>
                <p className="text-sm text-gray-700 break-all">{user.email}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase">
                  Bio
                </span>
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  {user.bio || "No bio added yet. Tell us about yourself!"}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content: Update Form */}
        <section className="flex-1">
          <UpdateProfileForm key={user._id} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
