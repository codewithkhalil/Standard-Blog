import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SlNote } from "react-icons/sl";
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/user/userSlice'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [profileToggle, setProfileToggle] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.user)

  const handleLogout = () => {
      dispatch(logout());
      dispatch(reset())
      toast.success('Bye For Now, Cheers')
      navigate('/')
  }

  return (
    <div className="border-b border-black">
      <div className="w-[90%] lg:w-[80%] xl:w-[70%] mx-auto flex justify-between items-center h-20">
        <div>
          <p className="font-bold text-5xl">
            <NavLink to={"/"}>SB</NavLink>
          </p>
        </div>
        <div className="flex items-center gap-3 md:gap-8 font-semibold capitalize">
          <p>
            <NavLink to={"/write"} className="flex items-center gap-1">
              <SlNote size={22} /> <span>write</span>
            </NavLink>
          </p>
          {!user && <p className=" bg-black py-1 px-4 rounded-[16px] text-white">
            <NavLink to={"/login"}>Login</NavLink>
          </p>}
          {user && <div
            className="flex items-center relative cursor-pointer"
            onClick={() => setProfileToggle(!profileToggle)}
          >
            <p className="w-9 h-9 rounded-full bg-blue-300 flex items-center uppercase justify-center font-bold text-white text-lg">
              {user?.user?.name.charAt(0)}
            </p>
            <span>
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </span>
            {profileToggle && (
              <div className="z-10 bg-white shadow-md w-28 p-3 absolute top-12 right-2 ease-in-out duration-500">
                <p>
                  <NavLink to={"/profile"} className="">
                    Profile
                  </NavLink>
                </p>
                <p className="cursor-pointer pt-2" onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
