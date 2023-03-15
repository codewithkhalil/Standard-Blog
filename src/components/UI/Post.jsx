import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const { user } = useSelector(
    (state) => state.user
  );


  return (
    <>
      <div
        className=" md:items-start w-full border-b border-gray-200 md:border-none shadow-[0__2px__4px__#e5e7eb] p-8 cursor-pointer"
        key={post.id}
      >
        <Link to={`/posts/${post.id}`} className='flex justify-between gap-5 items-center'>
          <div className="w-8/12 flex flex-col justify-between gap-1 md:gap-3 2xl:gap-5">
            <div className="flex items-center gap-2">
              <p className="w-4 h-4 text-xs rounded-full bg-blue-300 flex items-center uppercase justify-center font-bold text-white">
                A
              </p>
              <p className="text-xs font-bold">
                {post.user_id !== user?.user?.id
                  ? "Anonymous"
                  : `${user?.user.name}`}
              </p>
            </div>
            <div>
              <h1 className="font-bold text-lg md:text-2xl xl:text-3xl 2xl:text-4xl pb-2">
                {post.title}
              </h1>
              <p className="hidden lg:block text-sm 2xl:text-lg">
                {post.desc.slice(0, 230) + "...."}
              </p>
              <p className="hidden md:block lg:hidden text-sm 2xl:text-lg">
                {post.desc.slice(0, 100) + "...."}
              </p>
            </div>
            <div className="">
              <p className="text-xs xl:text-sm font-semibold text-gray-500">
                {new Date(post.created_at).toDateString()}
              </p>
            </div>
          </div>
          <div className="w-3/12">
            <img
              src={`https://api.gippojltd.com/${post.image}`}
              alt="placeholder"
              className="w-full h-full object-cover rounded-md shadow-md"
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Post;
