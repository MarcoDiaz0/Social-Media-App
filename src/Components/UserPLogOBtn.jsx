/* eslint-disable no-unused-vars */
import { FaRegCircleUser } from "react-icons/fa6";
import { useContext } from "react";
import { SomeContext } from "../App";

export default function UserPLogOBtn() {
  const mode = useContext(SomeContext);
  const [isLogedin, setislogedin] = mode;
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className=" flex justify-evenly items-center p-2 text-xl ">
      { typeof user.profile_image == "string" ? (
        <img src={user.profile_image} className="w-8 h-1/2 m-2 rounded-full" />
      ) : (
        <FaRegCircleUser className="w-8 h-1/2 m-2 rounded-full" />
      )}
      <h1 className="m-2">{user.username}</h1>
      <button
        className="btnStyle"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setislogedin(false);
        }}
      >
        Log Out
      </button>
    </div>
  );
}
