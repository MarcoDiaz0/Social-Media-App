/* eslint-disable no-unused-vars */
import PostsContainer from "../Components/PostsContainer";
import AddPostBtn from "../Components/AddPostBtn";
import { useContext } from "react";
import { SomeContext } from "../App";
export default function Home() {
  const value = useContext(SomeContext);
  const [isLogedin, setislogedin] = value;
  return (
    <div className="flex flex-col">
      {isLogedin && <AddPostBtn />}
      <PostsContainer />
    </div>
  );
}
