import { Alert, Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  signinStart,
  signinFail,
  signinSuccess,
  clearErrors,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

const SignIn = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, signInError, loading } = useSelector(
    (state) => state.user
  );
  const [formDatalogin, setFormDatalogin] = useState({
    email: "",
    password: "",
    roles: "User", // Default role
  });

  const handleSigninForm = (e) => {
    setFormDatalogin({ ...formDatalogin, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signinStart());
      const res = await fetch("/api/AuthRoute/SignIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDatalogin),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signinFail(data.message || "Sign in failed"));
        return;
      }

      dispatch(signinSuccess(data));
      if (data?.roles === "Faculty" && data._id) {
        localStorage.setItem("facultyId", data._id);
      }

      if (data?.roles === "Admin" && data._id) {
        localStorage.setItem("AdminId", data._id);
      }

      console.log("dataaaaaaaaaaaaaaaaa", data);
      Navigate("/");
    } catch (error) {
      dispatch(signinFail(error.message || "Something went wrong"));
    }
  };

  return (
    <div className="h-screen mt-24 mb-40 lg:mb-0 ">
      <div className="flex max-w-3xl mx-auto items-center p-3 gap-10 flex-col md:flex-row">
        {/* Left side */}
        <div className="flex-1">
          <Link to="/" className="text-3xl font-semibold font-serif">
            <span className="text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white px-3 py-0.5 self-center font-bold">
              @m
            </span>
            'erudite
          </Link>
          <h1 className="mt-2">
            In this page you can sign in with email and password or with Google
          </h1>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 w-full">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <label className="text-md font-medium">Email</label>
            <TextInput
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="font-bold py-0.5"
              onChange={handleSigninForm}
              value={formDatalogin.email}
            />

            <label className="text-md font-medium">Password</label>
            <TextInput
              type="password"
              id="password"
              placeholder="**********"
              className="font-bold py-0.5"
              onChange={handleSigninForm}
              value={formDatalogin.password}
            />

            <label className="text-md font-medium">Select Role</label>
            <select
              className="rounded-lg dark:text-white dark:bg-gray-900"
              value={formDatalogin.roles}
              onChange={(e) =>
                setFormDatalogin({ ...formDatalogin, roles: e.target.value })
              }
              required
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Faculty">Faculty</option>
              <option value="Adviser">Adviser</option>
            </select>

            <Button
              type="submit"
              className="my-5 px-4 py-0.5"
              gradientDuoTone="purpleToPink"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="ml-2">Loading...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </Button>

            {signInError && (
              <Alert color="red" className="-mt-5">
                {signInError}
              </Alert>
            )}

            <OAuth />
          </form>

          <h1 className="mt-5">
            <Link to="/SignUp" onClick={() => dispatch(clearErrors())}>
              Don't have an account?{" "}
              <span className="font-bold font-serif text-blue-600">
                Sign Up
              </span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
