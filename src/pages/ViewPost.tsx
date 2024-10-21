import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BlogPreview from '../components/BlogPreview';

const ViewPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = useSelector((state: RootState) => 
    state.blog.posts.find(post => post.id === id)
  );

  if (!post) {
    return <div className="text-center">Post not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <BlogPreview post={post} />
    </div>
  );
};

export default ViewPost;
