import { BrowserRouter, Route, Routes } from "react-router-dom";
import AlertPopUp from "./Components/AlertPopUp";
import "./App.css";
import Home from "./pages/Home";
import { createContext, useEffect, useState } from "react";
import Profile from "./pages/Profile";
import NavBar from "./Components/NavBar";
export const SomeContext = createContext();
const token = () => (localStorage.getItem("token") ? true : false);

function App() {
  const [isLogedin, setislogedin] = useState(token);
  const [showPopUp ,setShowPopUp] = useState({ display: false, erorr: false, message: "" });
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopUp({display: false, erorr: false, message: ""})
    }, 10000);
    return () => clearTimeout(timer);
  }, [showPopUp.display]);

  return (
    <SomeContext.Provider value={[isLogedin, setislogedin, showPopUp ,setShowPopUp]}>
      <BrowserRouter>
        <NavBar />
        {showPopUp.display && <AlertPopUp message={showPopUp.message} iserorr={showPopUp.erorr} hide={setShowPopUp} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </SomeContext.Provider>
  );
}

export default App;
