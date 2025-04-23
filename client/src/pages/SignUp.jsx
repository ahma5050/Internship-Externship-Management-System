import { Alert, Button, Label, TextInput, Select, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from 'react-redux';
import { signupStart, signupSuccess, signupFail, clearErrors } from "../redux/user/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signUpError, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    roles: " ", // Default role
  });
  console.log("formData", formData)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id || e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signupStart());

      const res = await fetch("/api/AuthRoute/SignUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(signupFail(data.message));
      } else {
        dispatch(signupSuccess(data));
        navigate("/SignIn");
      }
    } catch (error) {
      dispatch(signupFail(error.message));
    }
  };

  return (
    <div className="h-screen mt-20 mb-40 lg:mb-0">
      <div className="flex md:flex-row flex-col mx-auto p-3 max-w-3xl items-center gap-10">
        <div className="flex-1">
          <Link to="/" className="text-3xl font-semibold font-serif">
            <span className="text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white px-3 py-0.5 font-bold">
              @m
            </span>
            'erudite
          </Link>
          <h1 className="mt-2">
            In this page you can sign up with email, password, and Google accounts.
          </h1>
        </div>

        <div className="flex-1 w-full">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Label className="text-md font-serif text-zinc-700">User Name</Label>
            <TextInput
              type="text"
              id="userName"
              placeholder="@hmisha..."
              className="font-bold font-serif py-0.5 rounded-lg"
              onChange={handleInputChange}
            />

            <Label className="text-md font-serif text-zinc-700">Email</Label>
            <TextInput
              type="email"
              id="email"
              placeholder="tekisha5050@gmail.com"
              className="font-bold font-serif py-0.5"
              onChange={handleInputChange}
            />

            <Label className="text-md font-serif text-zinc-700">Password</Label>
            <TextInput
              type="password"
              id="password"
              placeholder="**********"
              className="font-bold font-serif py-0.5"
              onChange={handleInputChange}
            />

            <Label className="text-md font-serif text-zinc-700">Role</Label>
            <Select
              name="roles"
              value={formData.roles}
              onChange={handleInputChange}
              className="font-bold font-serif"
            >
              <option value="User">User</option>
              <option value="Faculty">Faculty</option>
              <option value="Advisor">Advisor</option>
              <option value="Admin">Admin</option>
            </Select>

            <Button
              type="submit"
              className="px-4 py-0.5 my-5 font-serif text-zinc-100 font-bold"
              gradientDuoTone="purpleToPink"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="ml-1">loading...</span>
                </>
              ) : (
                <span>Sign Up</span>
              )}
            </Button>

            {signUpError && <Alert color="red" className="-mt-5">{signUpError}</Alert>}

            <OAuth />
          </form>

          <h1 className="mt-5">
            <Link to="/SignIn" onClick={() => dispatch(clearErrors())}>
              <span className="text-zinc-700 dark:text-slate-200">Already have an account? </span>
              <span className="font-bold font-serif text-blue-600">Sign In</span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
