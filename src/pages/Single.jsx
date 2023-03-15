import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostById, deletePost } from "../features/post/postSlice";
// import { toast } from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { Spinner } from "../components/UI";
import { toast } from "react-toastify";

const Single = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { post, isLoading, isDeleteSuccess } = useSelector(
    (state) => state.posts
  );

  const handleDelete = (e) => {
    dispatch(deletePost(post.singlepost[0].id));
  };

  const handleEdit = (e) => {
    navigate(`/update/${post.singlepost[0].id}`);
  };

  useEffect(() => {
    dispatch(getPostById(params.id));
    if (isDeleteSuccess) {
      toast.success('Post successfully deleted')
      navigate("/");
    }
  }, [dispatch, isDeleteSuccess, navigate, params.id, post?.singlepost?.length]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      {post?.singlepost?.map((post) => (
        <div key={post.id}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <p className="w-11 h-11 text-xl rounded-full bg-blue-300 flex items-center uppercase justify-center font-bold text-white">
                {post.user.name.charAt(0)}
              </p>
              <div className="flex flex-col justify-between">
                <p className="text-sm font-semibold">{post.user.name}</p>
                <p className="text-sm text-gray-700">
                  {new Date(post.updated_at).toDateString()}·
                </p>
              </div>
            </div>
            {post?.user_id === user?.user?.id.toString() && <div className="flex gap-4">
              <span onClick={handleEdit}>
                <BiEdit size={28} className="text-green-700 cursor-pointer" />
              </span>

              <span onClick={handleDelete}>
                <RiDeleteBin4Line
                  size={28}
                  className="text-red-500 cursor-pointer"
                />
              </span>
            </div>}
          </div>
          <div className="pt-10">
            <h2 className="font-bold text-2xl xl:text-3xl 2xl:text-4xl">
              {post.title}
            </h2>
            <div className="py-5">
              <img
                src={`https://api.gippojltd.com/${post.image}`}
                alt="placeholder"
                className="w-full h-[200px] md:h-[400px] xl:h-[500px] object-cover rounded-md shadow-md"
              />
            </div>
            <div>
              {!user ? (
                <div className="pt-2 pb-8">
                  <p>{`${post.desc}`.slice(0, 400) + "...."}</p>
                  <p className="text-center text-xl font-semibold pt-2">
                    Login to read the full article...
                    <span className="cursor-pointer underline ml-3 text-sm">
                      <Link to={"/login"}>Login here</Link>
                    </span>
                  </p>
                </div>
              ) : (
                <div className="pt-2 pb-8">
                  <p>{post.desc}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Single;
