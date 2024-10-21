import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../redux/slices/blogSlice";
import { RootState, AppDispatch } from "../redux/store";
import { BlogPost } from "../types";
import {
  FaSearch,
  FaTag,
  FaBookOpen,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";

const BlogList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status, error } = useSelector(
    (state: RootState) => state.blog
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === "" || post.tags.includes(selectedTag))
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <FaTag className="text-gray-600 hidden sm:inline" />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
        >
          {sortOrder === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
          <span className="hidden sm:inline">
            {sortOrder === "desc" ? "Newest" : "Oldest"}
          </span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedPosts.map((post: BlogPost) => (
          <div
            key={post.id}
            className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full relative"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-full -mt-8 -mr-8"></div>
            <div className="p-6 flex-grow">
              <div className="text-sm text-gray-600 mb-2">
                {new Date(post.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <h2 className="text-xl font-semibold mb-2 flex items-start">
                <FaBookOpen className="mr-2 mt-1 flex-shrink-0 text-gray-600" />
                <span>{post.title}</span>
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-1">
                {stripHtmlTags(post.description)}
              </p>
              <div className="mb-4 flex flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="px-6 pb-4">
              <Link
                to={`/post/${post.id}`}
                className="inline-block w-full text-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
