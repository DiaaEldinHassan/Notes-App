import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Signing/Sign Up/SignUp";
import SignIn from "./Signing/Sign In/SignIn";
import Home from "./Home/Home.jsx";
import Checked from "./Home/Checked/Checked.jsx";
import Deleted from "./Home/Deleted/Deleted.jsx";
import Profile from "./Home/Profile/Profile.jsx";
import ProtectRoutes from "./ProtectRoutes.jsx";
import UserProvider from "./userData.jsx";
import NotFound from "./Components/Not Found Page/NotFound.jsx";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth/signUp" element={<SignUp></SignUp>} />
            <Route path="/auth/signIn" element={<SignIn></SignIn>}></Route>
            <Route path="/profile" element={<ProtectRoutes><Profile></Profile></ProtectRoutes> }></Route>
            <Route path="/notes/myNotes" element={<ProtectRoutes> <Home></Home></ProtectRoutes>}></Route>
            <Route path="/notes/checked" element={<ProtectRoutes><Checked></Checked></ProtectRoutes> }></Route>
            <Route path="/notes/deleted" element={<ProtectRoutes><Deleted></Deleted></ProtectRoutes> }></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
