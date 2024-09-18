/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaCheckCircle } from "react-icons/fa";
import { MdNoteAdd } from "react-icons/md";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { SomeContext } from "../App";
export default function RejesterModal({ setShowModal }) {
  const mode = useContext(SomeContext);
  const [isLogedin, setislogedin, showPopUp, setShowPopUp] = mode;
  const [register, setregister] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    profileImage: "",
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
    const requestLogin = async () => {
      cancelButton();
      const formdata = new FormData()
      formdata.append('username',register.username)
      formdata.append('password',register.password)
      formdata.append('name',register.name)
      formdata.append('email',register.email)
      formdata.append('image',register.profileImage)
      try {
        const response = await axios.post(
          "https://tarmeezacademy.com/api/v1/register",
          formdata
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        setislogedin(true);
        console.log("seccess");
        
        setShowPopUp({
          display: true,
          erorr: false,
          message: "You have registered successfully",
        });
      } catch (error) {
        setShowPopUp({
          display: true,
          erorr: true,
          message: error.response.data.message,
        })
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
        className="bg-[#03012C] duration-300 my-4 p-2 self-center flex flex-col absolute w-1/3 justify-evenly border-prim border-2 rounded-xl"
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={register.name}
          onChange={(e) => {
            setregister({ ...register, name: e.target.value });
          }}
          className="inputStyle"
        />
        <label htmlFor="Username">Username</label>
        <input
          type="text"
          id="Username"
          value={register.username}
          onChange={(e) => {
            setregister({ ...register, username: e.target.value });
          }}
          className="inputStyle"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={register.email}
          onChange={(e) => {
            setregister({ ...register, email: e.target.value });
          }}
          className="inputStyle"
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          value={register.password}
          onChange={(e) => {
            setregister({ ...register, password: e.target.value });
          }}
          className="inputStyle"
        />
        <label
          htmlFor="profilePic"
          className="custom-file-upload btnStyle text-center flex justify-center"
        >
          {register.profileImage ? (
            <FaCheckCircle
              style={{ display: "inline-flex", alignSelf: "center" }}
            />
          ) : (
            <MdNoteAdd
              style={{ display: "inline-flex", alignSelf: "center" }}
            />
          )}
          &nbsp; Upload a Profile Picture
        </label>
        <input
          type="file"
          id="profilePic"
          accept="image/png"
          onChange={(e) => {
            setregister({
              ...register,
              profileImage: e.target.files[0],
            });
          }}
        />
        <button className="btnStyle bg-[#190E4F]" onClick={LoginButtonClicked}>
          Rejester & Login
        </button>
        <button className="btnStyle" onClick={cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
}
