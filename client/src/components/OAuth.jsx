import { Button } from "flowbite-react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/AuthRoute/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        dispatch(signinSuccess(data));
        navigate("/");
      } else {
        throw new Error(data.message || 'Google authentication failed');
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      // Add toast notification here
      alert(error.message || 'Failed to sign in with Google');
    }
  };

  return (
    <Button 
      onClick={handleGoogleClick} 
      className="px-4 py-0.5 flex items-center" 
      gradientDuoTone="purpleToPink" 
      outline
    >
      <FcGoogle  size={25} className="mr-3" /> 
      <span className="mt-1 font-serif text-zinc-700 font-bold dark:text-slate-200">
        Continue with Google
      </span>
    </Button>
  );
};

export default OAuth;