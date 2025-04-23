import { Alert, Button, FileInput, Select, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    type: "Full-time",
    duration: "",
    category: "Uncategorized",
    description: ""
  });

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        setError("File size must be less than 2MB");
        return;
      }
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.companyName ||
      !formData.location ||
      !formData.type ||
      !formData.duration ||
      !formData.description ||
      !file
    ) {
      setError("Please fill all required fields, upload an image, and add a description");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("companyName", formData.companyName);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("profile", file);
      formDataToSend.append("facultyId", localStorage.getItem("facultyId")); // ✅ Add userId to the request

      const res = await fetch("/api/postRoute/creatPost", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
console.log("postres...........", res)

      const data = await res.json();
      console.log("postdata...........", data)

      if (!res.ok) {
        throw new Error(data.message || "Failed to create post");
      }

      navigate(`/post/${data.slug}`);
    } catch (error) {
      setError(error.message);
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-3 mx-auto max-w-3xl min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {error && <Alert color="failure">{error}</Alert>}

        <TextInput
          type="text"
          placeholder="Title"
          required
          id="title"
          value={formData.title}
          onChange={handleChange}
        />

        <TextInput
          type="text"
          placeholder="Company Name"
          required
          id="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />

        <TextInput
          type="text"
          placeholder="Location"
          required
          id="location"
          value={formData.location}
          onChange={handleChange}
        />

        <Select
          id="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="On-site">On-site</option>
        </Select>

        <TextInput
          type="text"
          placeholder="Duration (e.g., 6 months)"
          required
          id="duration"
          value={formData.duration}
          onChange={handleChange}
        />

        <Select id="category" value={formData.category} onChange={handleChange}>
          <option value="Uncategorized">Uncategorized</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
        </Select>

        <Textarea
          id="description"
          placeholder="Enter post description..."
          required
          rows={6}
          value={formData.description}
          onChange={handleChange}
          className="w-full"
        />

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {imagePreview && (
          <div className="flex justify-center">
            <img
              src={imagePreview}
              alt="Upload Preview"
              className="w-full h-72 object-cover rounded-lg border border-gray-500"
            />
          </div>
        )}

        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Post"}
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
