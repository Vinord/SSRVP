import React from 'react';
import { useGetPostsQuery, useAddPostMutation } from './service';

export default function Posts() {
const { data: posts, isLoading, isError,isFetching, error } = useGetPostsQuery();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [addPost, { isError: addError }] = useAddPostMutation();

    const handleAddPost = async () => {
    await addPost({ title, body });
    setTitle('');
    setBody('');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || addError) {
    return <div>Error: {error?.data || addError?.data}</div>;
  }
  if (isFetching){
    return <div>Успешно</div>;  }

    return (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {post.title} - {post.date.toLocaleString()}
            </li>
          ))}
        </ul>
      );
}
export default function Blog() {
  const { data: blogData, isLoading, isError, error } = useGetBlogDataQuery();

  return (
    <ul>
      {blogData.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>
            Written by {post.author.name} ({post.author.email})
          </p>
        </li>
      ))}
    </ul>
  );
}