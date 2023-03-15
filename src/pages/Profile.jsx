import React, { useState, useEffect } from "react";
import { Post } from "../components/UI";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser, reset } from "../features/user/userSlice";
import { getPosts } from "../features/post/postSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.user
  );

  const {
    posts,
    // isSuccess: postSuccess,
    // isError: postError,
    // isLoading: postLoading,
  } = useSelector((state) => state.posts);

  const [values, setValues] = useState({
    name: user?.user?.name,
    email: user?.user?.email,
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = values;

    if (!email || !name || !password) {
      toast.error("Please Fill Out All Fields");
      return;
    }

    const userData = { name: name, email: email, password: password };

    dispatch(updateUser(userData));
    setValues({ ...values, password: "" });
  };

  const handleDelete = () => {
    dispatch(deleteUser());
    toast.success('User Deleted')
  };

  useEffect(() => {
    dispatch(getPosts());

    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/");
    }

    if (isSuccess) {
      toast.success('User updated successfully')
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, dispatch, message, user, navigate]);

  const filteredPosts = posts?.posts?.filter((post) => {
    return post?.user_id === user?.user?.id.toString();
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-4xl font-bold">Profile Information</h1>
        <button
          className="text-red-600 font-bold text-xs md:text-lg bg-white"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>
      <form className="py-3 px-2" onSubmit={onSubmit}>
        <div className="w-[250px] md:w-[400px]">
          <div>
            <label htmlFor="name" className="text-sm">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              className="w-full bg-gray-100 rounded-sm p-2  focus:outline-black"
              onChange={handleChange}
            />
          </div>
          <div className="py-5">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              className="w-full bg-gray-100 rounded-sm p-2  focus:outline-black"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={values.password}
              name="password"
              className="w-full bg-gray-100 rounded-sm p-2  focus:outline-black"
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-4"
            type="submit"
          >
            {isLoading ? "Loading..." : "Update Profile"}
          </button>
        </div>
      </form>
      <div className="pt-7">
        <p className="text-2xl pb-1 border-b border-gray-200">Your Posts</p>
        {filteredPosts?.length > 0 ? (
          <div className="pt-8 flex flex-col gap-4 md:gap-8">
            {filteredPosts.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </div>
        ) : (
          <p className="pt-8 text-xl">You have no posts</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
