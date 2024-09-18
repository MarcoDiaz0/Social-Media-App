/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { SomeContext } from "../App";

export default function LoginModal({ setShowModal }) {
  const [isLogedin, setislogedin, showPopUp, setShowPopUp] = useContext(SomeContext);
  const [LoginInput, setLoginInput] = useState({
    username: "MarcoDiaz",
    password: "Marco0$",
  });
  const bgModalRef = useRef();
  const [isdisable, setIsdisable] = useState({
    opacity: "0",
    scale: "90%",
  });
  const cancelButton = () => {
    setIsdisable({ opacity: "0", scale: "90%" });
    setTimeout(() => {
      setShowModal("");
    }, 300);
  };
  let hideModal = (e) => {
    if (bgModalRef.current === e.target) {
      cancelButton();
    }
  };
  useEffect(() => {
    setIsdisable({ opacity: "1", scale: "100%" });
  }, []);
  const LoginButtonClicked = () => {
    cancelButton();
    const requestLogin = async () => {
      try {
        const response = await axios.post(
          "https://tarmeezacademy.com/api/v1/login",
          { username: LoginInput.username, password: LoginInput.password }
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setislogedin(true);
        setShowPopUp({
          display: true,
          erorr: false,
          message: "You have loged in successfully",
        });
      } catch (error) {
        setShowPopUp({
          display: true,
          erorr: true,
          message: error.response.data.message,
        });
      }
    };
    requestLogin();
  };

  return (
    <div
      style={{ opacity: isdisable.opacity }}
      className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex duration-300 justify-center "
      onClick={hideModal}
      ref={bgModalRef}
    >
      <div
        style={{
          scale: isdisable.scale,
        }}
        className="bg-[#03012C] my-4 p-2 self-center flex flex-col absolute w-1/3 duration-300 justify-evenly border-prim border-2 rounded-xl"
      >
        <label htmlFor="Username">Username</label>
        <input
          type="text"
          id="Username"
          className="inputStyle"
          value={LoginInput.username}
          onChange={(e) => {
            setLoginInput({ ...LoginInput, username: e.target.value });
          }}
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          className="inputStyle"
          value={LoginInput.password}
          onChange={(e) => {
            setLoginInput({ ...LoginInput, password: e.target.value });
          }}
        />
        <button className="btnStyle bg-[#190E4F]" onClick={LoginButtonClicked}>
          Login
        </button>
        <button className="btnStyle" onClick={cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
}
