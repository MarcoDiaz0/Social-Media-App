import { useState } from "react";
import "../App.css";
import RejesterModal from "./RejisterModal";
import LoginModal from "./LoginModal";
export default function LogRejBtn() {
  const [showModal ,setShowModal] = useState()
  return (
    <div className=" flex justify-evenly p-2 text-xl ">
      <button className="btnStyle" onClick={()=>{
        setShowModal(<LoginModal setShowModal={setShowModal}/>)
      }}>
        Login
      </button>
      <button className="btnStyle" onClick={()=>{
        setShowModal(<RejesterModal setShowModal={setShowModal}/>)
      }}>Rejester</button>
      {showModal}
    </div>
    
  );
}
