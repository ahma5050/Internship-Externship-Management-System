import React, { useEffect, useState, useRef } from "react";
import { MdAddCircle, MdBuildCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TbPhotoCirclePlus } from "react-icons/tb";
import { updateFail, updateStart, updateSuccess } from "../redux/user/userSlice";

const DashProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [profile, setProfile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({});
  const defaultProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({ ...prev, profile }));
    }
  }, [profile]);

  const picRef = useRef();

  const handleFiles = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(file);
      setImagePreview(URL.createObjectURL(file));

      let progress = 0;
      setUploadProgress(progress);
      const interval = setInterval(() => {
        if (progress < 100) {
          progress += 2;
          setUploadProgress(progress);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(0);
          }, 500);
        }
      }, 100);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());

      const formDataToSend = new FormData();
      formDataToSend.append("userName", formData.userName || currentUser.userName);
      formDataToSend.append("email", formData.email || currentUser.email);
      formDataToSend.append("password", formData.password || "");
      if (profile) {
        formDataToSend.append("profile", profile);
      }

      const res = await fetch(`/api/AuthRoute/UpdetUser/${currentUser._id}`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      console.log("updeting of it ", data)

      if (res.ok) {
        dispatch(updateSuccess(data));
      } else {
        dispatch(updateFail(data.message || "Update failed"));
      }
    } catch (error) {
      dispatch(updateFail(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 w-full">
      <form className="w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-8" onSubmit={handleSubmit}>
        <h1 className="text-center py-3 text-2xl font-semibold text-gray-800 dark:text-white">
          <span className="bg-black px-2 py-1 rounded-lg text-orange-400 mx-1 border">My</span>Profile
        </h1>

        <input type="file" accept="image/*" onChange={handleFiles} ref={picRef} hidden />

        <div className="flex justify-center py-6">
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border relative cursor-pointer"
            onClick={() => picRef.current.click()}
          >
            {!uploadProgress > 0 && (
              <TbPhotoCirclePlus className="absolute top-[68px] left-14 md:top-[100px] md:left-20 text-pink-600 bg-gray-900 rounded-full p-1 border" size={30} />
            )}
            {currentUser?.profile === defaultProfileImage ? (
              <div className="flex items-center justify-center w-full h-full bg-gray-300 text-2xl font-bold text-white rounded-full">
                {profile ? (
                  <img src={imagePreview} className="h-full w-full object-cover rounded-full border" />
                ) : (
                  <span className="text-4xl mb-4 text-cyan-400 font-serif">
                    {currentUser?.userName?.[0]}
                  </span>
                )}
              </div>
            ) : (
              <img
                src={imagePreview || `http://localhost:3000${currentUser?.profile}`}
                alt="Profile"
                className="h-full w-full object-cover rounded-full border"
              />
            )}

            {uploadProgress > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
                  <CircularProgressbar
                    value={uploadProgress}
                    text={`${Math.round(uploadProgress)}%`}
                    styles={{
                      root: { height: "100%", width: "100%" },
                      path: { stroke: "#4caf50" },
                      text: { fill: "#fff", fontSize: "14px" },
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 py-10">
          <TextInput
            type="text"
            placeholder="UserName"
            id="userName"
            className="rounded-lg"
            defaultValue={currentUser.userName}
            onChange={handleForm}
          />
          <TextInput
            type="email"
            placeholder="Email"
            id="email"
            className="rounded-lg"
            defaultValue={currentUser.email}
            onChange={handleForm}
          />
          <TextInput
            type="password"
            placeholder="Password"
            id="password"
            className="rounded-lg"
            onChange={handleForm}
          />
          <Button type="submit" className="" gradientDuoTone="purpleToPink">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DashProfile;
