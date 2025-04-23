import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePosts = () => {
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    type: "Full-time",
    duration: "",
    category: "Uncategorized",
    image: "",
    content: "",
  });

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publishError, setPublishError] = useState(false);

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write your post content here...</p>",
  });

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/postRoute/getPost?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }

        setFormData(data.posts[0]);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPost();
  }, [postId]);

  // Sync editor content after post is fetched
  useEffect(() => {
    if (editor && formData?.content) {
      editor.commands.setContent(formData.content);
    }
  }, [editor, formData?.content]);

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
      (!file && !formData.image)
    ) {
      setError("Please fill all required fields and upload an image");
      return;
    }
    console.log("Form data IDllllllllllllllllll:", formData._id);


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
      formDataToSend.append("content", editor?.getHTML());
      if (file) {
        formDataToSend.append("profile", file);
      }

      const res = await fetch(
        `/api/postRoute/updatepost/${formData?._id}/${currentUser?._id}`,
        {
          method: "PUT",
          body: formDataToSend,
          
        }
      );

    
     

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update post");
      }

      navigate(`/post/${data.slug}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!editor) return null;

  return (
    <div className="p-3 mx-auto max-w-3xl min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} encType="multipart/form-data">
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

        <Select id="type" value={formData.type} onChange={handleChange} required>
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

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {(imagePreview || formData?.image) && (
          <div className="flex justify-center">
            <img
              src={imagePreview ? imagePreview : `http://localhost:3000${formData?.image}`}
              alt="Upload Preview"
              className="w-full h-72 object-cover rounded-lg border border-gray-500"
            />
          </div>
        )}

        <div className="rich-text-editor w-full max-w-4xl border border-gray-500 rounded-lg p-3">
          <EditorContent editor={editor} className="outline-none" />
        </div>

        <Button type="submit" gradientDuoTone="purpleToBlue" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Post"}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePosts;
