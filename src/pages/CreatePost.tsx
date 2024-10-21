import React from "react";
import BlogForm from "../components/BlogForm";

const CreatePost: React.FC = () => {
  return (
    <div className="bg-white h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="w-full max-w-3xl px-4">
        <BlogForm />
      </div>
    </div>
  );
};

export default CreatePost;
