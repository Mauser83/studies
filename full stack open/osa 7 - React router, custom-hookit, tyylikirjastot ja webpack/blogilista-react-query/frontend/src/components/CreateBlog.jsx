import { useState } from "react";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../reducers/NotificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateBlog = ({ addBlogFormRef }) => {
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: {
          message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          color: "green",
        },
      });
      addBlogFormRef.current.toggleVisibility();
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
    },
  });

  const addBlog = (event) => {
    event.preventDefault();
    newBlogMutation.mutate(newBlog);
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title{" "}
          <input
            type="text"
            data-testid="title"
            value={newBlog.title}
            name="title"
            onChange={handleChange}
            placeholder="write title here"
          />
        </div>
        <div>
          Author{" "}
          <input
            type="text"
            data-testid="author"
            value={newBlog.author}
            name="author"
            onChange={handleChange}
            placeholder="write author here"
          />
        </div>
        <div>
          URL{" "}
          <input
            type="text"
            data-testid="url"
            value={newBlog.url}
            name="url"
            onChange={handleChange}
            placeholder="write url here"
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default CreateBlog;
