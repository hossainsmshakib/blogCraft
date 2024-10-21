import React from 'react';
import { BlogPost } from '../types';
import { FaTag, FaClock } from 'react-icons/fa';

interface BlogPreviewProps {
  post: BlogPost;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ post }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h2>
      <p className="text-gray-500 text-sm mb-4 flex items-center">
        <FaClock className="mr-1" />
        {new Date(post.date).toLocaleDateString()}
      </p>
      <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: post.description }} />
      <div className="flex flex-wrap">
        {post.tags.map(tag => (
          <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
            <FaTag className="mr-1" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogPreview;
