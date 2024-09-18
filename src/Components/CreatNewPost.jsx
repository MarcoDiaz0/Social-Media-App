/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { FaCheckCircle } from "react-icons/fa";
import { MdNoteAdd } from "react-icons/md";
import { useContext } from "react";
import { SomeContext } from "../App";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function CreatNewPost({ setShowModal }) {
  const mode = useContext(SomeContext);
  const [isLogedin, setislogedin, showPopUp, setShowPopUp] = mode;
  const [postInput, setPostInput] = useState({
    title: "",
    description: "",
    image: "",
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
  const createButtonClicked = () => {
    cancelButton();
    let formdata = new FormData()
    formdata.append("title",postInput.title)
    formdata.append("body",postInput.description)
    formdata.append("image",postInput.image)
    const requestLogin = async () => {
      try {
        await axios.post(
          'https://tarmeezacademy.com/api/v1/posts',
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setShowPopUp({
          display: true,
          erorr: false,
          message: "You added a Post successfully",
        });
      } catch (error) {        
        setShowPopUp({
          display: true,
          erorr: true,
          message: "The operation failed",
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
        className="bg-[#03012C] duration-300 my-4 p-2 self-center flex flex-col absolute w-1/3 justify-evenly border-prim border-2 rounded-xl"
      >
        <label htmlFor="name">Title</label>
        <input
          type="text"
          id="Title"
          value={postInput.title}
          onChange={(e) => {
            setPostInput({ ...postInput, title: e.target.value });
          }}
          className="inputStyle"
        />
        <label htmlFor="Username">description</label>
        <textarea
          id="description"
          value={postInput.description}
          onChange={(e) => {
            setPostInput({ ...postInput, description: e.target.value });
          }}
          className="inputStyle"
        ></textarea>

        <label
          htmlFor="profilePic"
          className="custom-file-upload btnStyle text-center flex justify-center"
        >
          {postInput.image ? (
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
            setPostInput({
              ...postInput,
              image: e.target.files[0],
            });
          }}
        />
        <button className="btnStyle bg-[#190E4F]" onClick={createButtonClicked}>
          Create
        </button>
        <button className="btnStyle" onClick={cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
}
