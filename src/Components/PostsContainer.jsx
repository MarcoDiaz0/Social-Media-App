/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import { useContext } from "react";
import { SomeContext } from "../App";

const user = JSON.parse(localStorage.getItem("user"));
export default function PostsContainer({ isprofile = false }) {
  const [isLogedin, setislogedin, showPopUp, setShowPopUp] =
    useContext(SomeContext);
  const [fetchMore, setfetchMore] = useState(false);
  const [page, setPage] = useState({ correntPage: 1, lastPage: 2 });
  const [postsData, setPostsData] = useState([]);

  let postsList = postsData.map((onePost) => {
    return (
      <PostCard
        id={onePost.id}
        key={onePost.id}
        UserName={onePost.author.username}
        ProfileImage={onePost.author.profile_image}
        mainImage={onePost.image}
        createdAT={onePost.created_at}
        desc={onePost.body}
        title={onePost.title}
        commentsNumbre={onePost.comments_count}
      />
    );
  });
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const response = await axios.get(
          isprofile
            ? `https://tarmeezacademy.com/api/v1/users/${user.id}/posts`
            : `https://tarmeezacademy.com/api/v1/posts?limit=10&page=${page.correntPage}`
        );

        if (!isprofile) {
          setPage({
            correntPage: page.correntPage + 1,
            lastPage: response.data.meta.last_page,
          });
        }
        setfetchMore(false);
        let allPosts = [...postsData].concat(response.data.data);
        setPostsData(allPosts);
      } catch (error) {
        setShowPopUp({
          display: true,
          erorr: true,
          message: "Check your network",
        });
      }
    };
    fetchFunc();
  }, [fetchMore]);
  function wheneScrolling() {
    const endOfPage =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
    if (endOfPage && page.correntPage < page.lastPage) setfetchMore(true);
    return;
  }
  useEffect(() => {
    if (!isprofile) {
      window.addEventListener("scroll", wheneScrolling);
      return () => {
        window.removeEventListener("click", wheneScrolling);
      };
    }
  });
  return <div className="flexC flex-col pt-20 w-full">{postsList}</div>;
}
