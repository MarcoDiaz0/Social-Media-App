/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { SomeContext } from "../App";
export default function DeletePopup({ id, hidepopUp }) {
  const [isLogedin, setislogedin, showPopUp, setShowPopUp] =
    useContext(SomeContext);

  const bgModalRef = useRef();

  const [isdisable, setIsdisable] = useState({
    opacity: "0",
    scale: "90%",
  });
  const cancelButton = () => {
    setIsdisable({ opacity: "0", scale: "90%" });
    setTimeout(() => {
      hidepopUp("");
    }, 300);
  };
  const hidePopup = (e) => {
    if (bgModalRef.current === e.target) {
      cancelButton();
    }
  };
  const deletePost = async () => {
    cancelButton()
    
    try {
      await axios.delete(`https://tarmeezacademy.com/api/v1/posts/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      setShowPopUp({
        display: true,
        erorr: false,
        message: "You deleted a Post successfully",
      });
    } catch (error) {
      setShowPopUp({
        display: true,
        erorr: true,
        message: "The operation failed",
      });
    }
  };
  useEffect(() => {
    setIsdisable({ opacity: "1", scale: "100%" });
  }, []);
  return (
    <div
      style={{ opacity: isdisable.opacity }}
      className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex duration-500 justify-center "
      onClick={hidePopup}
      ref={bgModalRef}
    >
      <div
        style={{
          scale: isdisable.scale,
        }}
        className="bg-[#03012C] my-4 p-2 self-center items-center flex flex-col absolute w-1/3 duration-300 justify-evenly border-prim border-2 rounded-xl"
      >
        <h1>Are you sure you want to delete ??</h1>
        <button
          onClick={deletePost}
          className="flexC btnStyle w-full  deleteBtn "
        >
          Yes
        </button>
        <button
          onClick={cancelButton}
          className="flexC btnStyle w-full editBtn"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}