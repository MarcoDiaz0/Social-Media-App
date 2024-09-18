import { FaRegCircleUser } from "react-icons/fa6";
import PostsContainer from "../Components/PostsContainer";
// import { useEffect, useState } from "react";
// import axios from "axios";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  // const [data,setdata] = useState([])
  // useEffect(() => {
  //   const fetchFunc = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://tarmeezacademy.com/api/v1/users/${user.id}/posts`
  //       );        
  //       setdata(response.data.data);
        
        
  //     } catch (error) {
  //       console.log(error);
        
  //     }
  //   };
  //   fetchFunc();
  // }, []);
  return (
    <div className="w-[99vw] flex flex-col items-center my-2  ">
      <header className="flex w-2/5 flex-wrap items-center border-2 rounded-lg p-1 mt-16 mb-[-40px] border-prim">
        <div className=" rounded-full w-32 h-32 flexC">
          { typeof user.profile_image == "string"? (
            <img className=" rounded-full w-full h-full" src={user.profile_image} />
          ) : (
            <FaRegCircleUser className="w-full h-full" />
          )}
        </div>
        <div className="bg-red-500 m-4 flex flex-col flex-grow">
          <h1>
            User Name: <i>{user.username}</i>
          </h1>
          <h1>
            Name: <i>{user.name}</i>
          </h1>
          <h1>
            Email: <i>{user.email}</i>
          </h1>
          <h1>
            Comments: <i>{user.comments_count}</i>
          </h1>
          <h1>
            Posts: <i>{user.posts_count}</i>
          </h1>
        </div>
      </header>
      <PostsContainer isprofile = {true}/>
    </div>
  );
}

export default Profile;
