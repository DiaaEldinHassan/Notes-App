import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Signing/Sign Up/SignUp";
import "./App.css";
import SignIn from "./Signing/Sign In/SignIn";
import Home from "./Home/Home.jsx";
import Checked from "./Home/Checked/Checked.jsx";
import Deleted from "./Home/Deleted/Deleted.jsx";
import Profile from "./Home/Profile/Profile.jsx";
import UserProvider from "./userData.jsx";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth/signUp" element={<SignUp></SignUp>} />
            <Route path="/auth/signIn" element={<SignIn></SignIn>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/notes/myNotes" element={<Home></Home>}></Route>
            <Route path="/notes/checked" element={<Checked></Checked>}></Route>
            <Route path="/notes/deleted" element={<Deleted></Deleted>}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
