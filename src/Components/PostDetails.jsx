/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

import Comments from "./Comments";
import {
  FaRegCircleUser,
  FaRegCommentDots,
  FaRegTrashCan,
  FaPencil,
  FaXmark,
} from "react-icons/fa6";
import axios from "axios";
import { useContext } from "react";
import { SomeContext } from "../App";
import DeletePopup from "./DeletePopup";
import EditPopup from "./EditPopup";
import { CiImageOff } from "react-icons/ci";
export default function PostDetails({ details, setshowDetails }) {
  const [
    UserName,
    ProfileImage,
    mainImage,
    createdAT,
    desc,
    title,
    commentsNumbre,
    id,
    setDeletePopup,
    setEditPopup,
  ] = details;
  const [isLogedin, setislogedin, showPopUp, setShowPopUp] =
    useContext(SomeContext);
  const [isbtndisable, setbtnIsdisable] = useState(true);
  const [addcomment, setaddcomment] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const bgModalRef = useRef();
  const [comments, setComments] = useState([]);
  const commentsList = comments.map((com) => {
    return (
      <Comments
        key={com.id}
        UserName={com.author.username}
        ProfileImage={com.author.profile_image}
        contant={com.body}
      />
    );
  });
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(
          `https://tarmeezacademy.com/api/v1/posts/${id}`
        );
        setComments(response.data.data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [addcomment]);

  const profile = ProfileImage ? (
    <img src={ProfileImage} className=" h-6 w-6 m-2 rounded-full" />
  ) : (
    <FaRegCircleUser className="w-6 h-full rounded-full" />
  );
  const [isdisable, setIsdisable] = useState({
    opacity: "0",
    scale: "90%",
  });
  const hideButton = () => {
    setIsdisable({ opacity: "0", scale: "90%" });
    setTimeout(() => {
      setshowDetails(false);
    }, 400);
  };
  let hideDetails = (e) => {
    if (bgModalRef.current === e.target) {
      hideButton();
    }
  };
  useEffect(() => {
    setIsdisable({ opacity: "1", scale: "100%" });
    setbtnIsdisable(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      return user.username != UserName;
    });
  }, []);

  const makeComment = async () => {
    try {
      await axios.post(
        `https://tarmeezacademy.com/api/v1/posts/${id}/comments`,
        { body: commentInput },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCommentInput("");
      setaddcomment((last) => !last);
      setShowPopUp({
        display: true,
        erorr: false,
        message: "You added a comment successfully",
      });
    } catch (error) {
      setShowPopUp({
        display: true,
        erorr: true,
        message: "The operation failed",
      });
    }
  };
  return (
    <div
      onClick={hideDetails}
      ref={bgModalRef}
      style={{ opacity: isdisable.opacity }}
      className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex duration-300 justify-center "
    >
      <div
        style={{
          scale: isdisable.scale,
        }}
        className="bg-[#03012C] h-[95vh] w-3/5 my-4 p-2 self-center flex flex-wrap  duration-300 justify-center border-prim border-2 rounded-xl"
      >
        <button
          onClick={hideButton}
          className="btnStyle absolute top-0 right-0"
        >
          <FaXmark />
        </button>
        <div className="w-2/5 bg-[#03012C] p-3 m-2 flex-grow flex-col flex border-prim border-2 rounded-lg ">
          <div className="flexC pb-2">
            {profile}
            <h1 className="mx-2">@{UserName}</h1>
          </div>
          <hr />
          { typeof mainImage == "string" ?  <img
          src={mainImage}
          alt="No Picture"
          className="rounded-lg w-full my-2"
        /> : <CiImageOff className="w-full h-20 text-prim"/> }
          <p className="text-sm text-prim text-opacity-75">{createdAT}</p>
          <p className="text-sm break-all m-full max-h-16 overflow-auto">
            {desc}
          </p>
          <h1 className="text-lg ">{title}</h1>
          <div className="flex justify-between">
            <button
              disabled={isbtndisable}
              style={{ color: isbtndisable && "gray" }}
              onClick={() =>
                setDeletePopup(
                  <DeletePopup id={id} hidepopUp={setDeletePopup} />
                )
              }
              className="flexC btnStyle w-2/6 flex-grow  deleteBtn "
            >
              <FaRegTrashCan />
              &nbsp;Delete
            </button>
            <button
              disabled={isbtndisable}
              style={{ color: isbtndisable && "gray" }}
              className="flexC btnStyle w-2/6 flex-grow editBtn"
              onClick={() =>
                setEditPopup(<EditPopup id={id} hidepopUp={setEditPopup} />)
              }
            >
              <FaPencil />
              &nbsp;Edit
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center  w-2/5 h-full ">
          <h1 className="mb-3">comments ({commentsNumbre})</h1>
          <div className="w-full pb-10 overflow-auto commentSpace">
            {commentsList}
          </div>
          <div className=" bottom-2 flexC w-2/5 absolute">
            <input
              type="text"
              className="inputStyle flex-grow"
              value={commentInput}
              onChange={(e) => {
                setCommentInput(e.target.value);
              }}
            />
            <button onClick={makeComment} className="btnStyle h-full p-2 ">
              <BsFillSendFill className="h-full" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
