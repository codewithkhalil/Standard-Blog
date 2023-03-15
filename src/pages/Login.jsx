import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, register, reset } from "../features/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, isLoginSuccess, isError, message, isLoading } = useSelector(
    (state) => state.user
  );

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    isMember: true,
  });

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (isMember) {
      const userData = { email: email, password: password };
      dispatch(login(userData));
      return;
    }

    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill Out All Fields..");
      return;
    }

    const userData = { name: name, email: email, password: password };
    dispatch(register(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      return;
    }

    if (isSuccess) {
      toast.success(`Hiya ${user.user.name}`);
    }

    if (isLoginSuccess) {
      navigate('/')
      toast.success(`Hiya ${user.user.name}`);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [dispatch, isSuccess, isError, message, navigate, user, isLoginSuccess]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center  w-[50%] shadow-[0__2px__4px__#e5e7eb] py-8 px-8">
        <h1 className="text-xl font-semibold md:text-4xl pb-7">
          {!values.isMember ? "Register" : "Sign in with email"}
        </h1>
        <p className="text-sm mt-2">
          {values.isMember
            ? "Enter the email address associated with your account."
            : "Fill in the fields to create an account"}
        </p>

        <form
          action=""
          className="w-full flex flex-col items-center mt-12"
          onSubmit={onSubmit}
        >
          {!values.isMember && (
            <div className="w-full text-center">
              <label htmlFor="email" className="text-sm text-center">
                Your username
              </label>
              <input
                type="text"
                required
                name="name"
                className="w-full border-b border-[#cbcbcb] outline-none border-0 text-center py-2"
                onChange={handleChange}
              />
            </div>
          )}
          <label htmlFor="email" className="text-sm mt-12">
            Your email
          </label>
          <input
            type="email"
            required
            name="email"
            className="w-full border-b border-[#cbcbcb] outline-none border-0 text-center py-2"
            onChange={handleChange}
          />
          <label htmlFor="password" className="text-sm mt-12">
            Password
          </label>
          <input
            type="password"
            required
            name="password"
            className="w-full border-b border-[#cbcbcb] outline-none border-0 text-center py-2"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="mt-6 bg-[#000] text-white font-medium px-8 py-2 rounded-full"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
        <p className="text-sm text-center mt-3">
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="pl-2">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
