import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserValue } from '../reducers/UserContext.jsx'


const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);
  const hideWhenVisible = { display: expanded ? "none" : "" };
  const showWhenVisible = { display: expanded ? "" : "none" };
  const queryClient = useQueryClient();
  const user = useUserValue()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const buttonStyle = {
    backgroundColor: "blue",
    color: "white",
    borderRadius: "10px",
  };

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog);
      queryClient.setQueriesData(['blogs'], updatedBlogs)
    },
  });

  const handleLike = () => {
    updateBlogMutation.mutate({...blog, likes: blog.likes + 1})
  };

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const blogsLeft = blogs.filter((b) => b.id !== deletedBlog.id);
      queryClient.setQueriesData(['blogs'], blogsLeft)
    }
  })

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog)
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      <>
        {blog.title} {blog.author}
      </>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? "hide" : "show"}
      </button>
      <div style={showWhenVisible} className="expandedContent">
        {blog.url}
        <br />
        <>likes {blog.likes}</>
        <button onClick={handleLike}>like</button>
        <br />
        {blog.user && blog.user.name ? blog.user.name : null}
        {blog.user && user && blog.user.username === user.username ? (
          <>
            <br />
            <button style={buttonStyle} onClick={handleDelete}>
              delete
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
