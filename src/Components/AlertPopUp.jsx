/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

export default function AlertPopUp({ message, iserorr, hide }) {
  const [opacity, setOpacity] = useState("1");
  useEffect(() => {
    setOpacity("0");
  }, [message]);
  return (
    <div
      style={{
        borderColor: iserorr ? "red" : "green",
        opacity: opacity,
      }}
      className={`flex justify-between duration-[10000ms] px-2 border-2 items-center fixed bg-[#03012C] min-w-44 rounded-lg h-14 bottom-10 left-20 `}
    >
      <p>{message}</p>
      <button
        onClick={() => hide({ display: false, erorr: false, message: "" })}
        className="w-[10%] h-full text-center ml-2 "
      >
        <FaXmark />
      </button>
    </div>
  );
}
