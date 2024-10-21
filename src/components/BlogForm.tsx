import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { addNewPost } from "../redux/slices/blogSlice";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { FaPen, FaTag, FaPaperPlane } from "react-icons/fa";

const BlogForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [tagError, setTagError] = useState("");

  const validateTags = (inputTags: string): boolean => {
    const tagArray = inputTags.split(",").map((tag) => tag.trim());

    if (tagArray.some((tag) => tag === "")) {
      setTagError("Tags cannot be empty");
      return false;
    }

    const uniqueTags = new Set(tagArray);
    if (uniqueTags.size !== tagArray.length) {
      setTagError("Duplicate tags are not allowed");
      return false;
    }
    const tagRegex = /^[a-zA-Z0-9-_]+$/;
    if (tagArray.some((tag) => !tagRegex.test(tag))) {
      setTagError(
        "Tags can only contain letters, numbers, hyphens, and underscores"
      );
      return false;
    }

    setTagError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTags(tags)) {
      return;
    }
    dispatch(
      addNewPost({
        title,
        description,
        date: new Date().toISOString(),
        tags: tags.split(",").map((tag) => tag.trim()),
      })
    );
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        <FaPen className="mr-2 text-black" />
        Create New Post
      </h2>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          placeholder="Enter the title of your post"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Content
        </label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          theme="snow"
          className="bg-white text-gray-700 rounded-md"
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image"],
              ["clean"],
            ],
          }}
          placeholder="Write your post content here..."
          style={{ height: "180px" }}
        />
      </div>
      <div className="mb-4 mt-12">
        <label
          htmlFor="tags"
          className="block text-sm font-semibold text-gray-700 mb-1 flex items-center"
        >
          <FaTag className="mr-1 text-black" />
          Tags
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
            validateTags(e.target.value);
          }}
          className={`w-full px-3 py-2 text-gray-700 bg-white border ${
            tagError ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          placeholder="Enter tags separated by commas"
        />
        {tagError && <p className="mt-1 text-sm text-red-500">{tagError}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-base font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out flex items-center justify-center"
      >
        <FaPaperPlane className="mr-2" />
        Publish Post
      </button>
    </form>
  );
};

export default BlogForm;
