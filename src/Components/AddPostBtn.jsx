import { MdOutlinePostAdd } from "react-icons/md";
import CreatNewPost from "./CreatNewPost";
import { useState } from "react";
export default function AddPostBtn() {
    const [showModal ,setShowModal] = useState()
    return (
    <div >
    <button onClick={()=>{
        setShowModal(<CreatNewPost setShowModal={setShowModal}/>)
      }} className="flex justify-center items-center fixed rounded-full bg-[#03012C] w-14 h-14 bottom-10 right-20 btnStyle changeText ">
        <MdOutlinePostAdd className="w-full h-full "/>
    </button>
    {showModal}
    </div>
        
  )
}
