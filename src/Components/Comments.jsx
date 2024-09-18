/* eslint-disable react/prop-types */
import { FaRegCircleUser } from "react-icons/fa6";
export default function Comments({ UserName, ProfileImage, contant }) {
  const profile =
  typeof ProfileImage == "string" ? (
      <img src={ProfileImage} className=" h-6 w-6 m-2 rounded-full" />
    ) : (
      <FaRegCircleUser className="w-6 h-full rounded-full" />
    );
  return (
    <div className="border-prim border rounded-lg w-full my-2 p-1">
      <div className="flex pb-2">
        {profile}
        <h1 className="mx-2">@{UserName}</h1>
      </div>
      <p className="break-all">{contant}</p>
    </div>
  );
}
