import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, reset } from "../features/post/postSlice";
import { Post, Spinner } from "../components/UI";

const Home = () => {
  const dispatch = useDispatch();
  const {
    posts,
    isLoading: postLoading,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());

    if (!postLoading) {
      dispatch(reset());
    }
  }, [dispatch,postLoading]);

  if (postLoading) {
    return <Spinner />
  }

  // console.log(posts);

  const sortedPosts = posts?.posts?.slice().sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  return (
    <div className="flex flex-col gap-16">
      {sortedPosts?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Home;
