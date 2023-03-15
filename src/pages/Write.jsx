import React, { useEffect, useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPost, reset } from "../features/post/postSlice";

const Write = () => {
  const [fileName, setFileName] = useState("");
  const inputRef = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user
  } = useSelector((state) => state.user);
  const { isLoading, isCreateSuccess } = useSelector((state) => state.posts);

  const handleImageUpload = (e) => {
    setFileName(inputRef.current.files[0].name);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Kindly Login to publish a post')
      navigate('/login')
    }
    const formData = new FormData(e.currentTarget);
    formData.append("user_id", user?.user?.id);

    dispatch(createPost(formData));
  };
  useEffect(() => {
    if (isCreateSuccess) {
      navigate('/') 
    }

    return () => {
      dispatch(reset())
    }
  }, [isCreateSuccess,dispatch, navigate])
  

  return (
    <div>
      <form
        className="flex flex-col justify-center  mx-auto"
        onSubmit={onSubmit}
      >
        <h3 className="font-bold text-xl md:text-4xl pb-7">Create a Post</h3>
        <div className="w-full  h-[50px] border-2 border-dashed rounded-md border-black flex flex-col p-8 md:p-10 justify-center items-center">
          <label htmlFor="inputTag" className="cursor-pointer">
            <BiImageAdd size={30} />
            <input
              id="inputTag"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              name="image"
              onChange={handleImageUpload}
              ref={inputRef}
            />
          </label>
          <span className="text-green-600 font-bold">{fileName}</span>
        </div>
        <div className="mt-3 md:mt-7">
          <input
            type="text"
            placeholder="Title"
            className="w-full bg-gray-100 rounded-sm p-2 my-3 md:my-4 focus:outline-black"
            name="title"
            required
          />
          <textarea
            type="text"
            placeholder="Body"
            rows={10}
            className="w-full bg-gray-100 rounded-sm p-2 my-3 md:my-4 focus:outline-black"
            name="desc"
            required
          />
        </div>
        <div className="flex justify-center text-center">
          <button className="w-[60%] md:w-[30%] text-center text-white bg-black p-2 font-bold rounded-sm my-6">
            {isLoading ? "Publishing Post..." : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
