/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  FaRegCircleUser,
  FaRegCommentDots,
  FaRegTrashCan,
  FaPencil,
} from "react-icons/fa6";
import PostDetails from "./PostDetails";
import DeletePopup from "./DeletePopup";
import EditPopup from "./EditPopup";
import { CiImageOff } from "react-icons/ci";


export default function PostCard({
  id,
  UserName,
  ProfileImage,
  mainImage,
  createdAT,
  desc,
  title,
  commentsNumbre,
}) {
  const [isbtndisable, setbtnIsdisable] = useState(true);
  const [deletePopup, setDeletePopup] = useState("");
  const [editPopup, setEditPopup] = useState("");
  
  const profile = typeof ProfileImage == "string"? (
    <img src={ProfileImage} className=" h-6 m-2 w-6 rounded-full" />
  ) : (
    <FaRegCircleUser className="w-6 h-full rounded-full" />
  );
  const [showDetails, setshowDetails] = useState(false);
  useEffect(() => {
    setbtnIsdisable(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      return user.username != UserName;
    });
  }, []);

  return (
    <>
      <div className="w-2/5 bg-[#03012C] p-3 m-1 flex-grow border-prim border-2 rounded-lg ">
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
        <p className="text-sm break-all m-full">{desc}</p>
        <h1 className="text-lg ">{title}</h1>
        <div className="flex justify-between">
          <button
            className="flexC btnStyle w-2/6"
            onClick={() => {
              setshowDetails(true);
            }}
          >
            <FaRegCommentDots />
            &nbsp;({commentsNumbre})&nbsp;Comments
          </button>
          <button
            disabled={isbtndisable}
            style={{ color: isbtndisable && "gray" }}
            onClick={() =>
              setDeletePopup(<DeletePopup id={id} hidepopUp={setDeletePopup} />)
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
      {showDetails && (
        <PostDetails
          setshowDetails={setshowDetails}
          details={[
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
          ]}
        />
      )}
      {deletePopup}
      {editPopup}
    </>
  );
}
