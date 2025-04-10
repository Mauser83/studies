import PropTypes from "prop-types";
import { useState } from "react";

const Blog = ({ blog, like, user, delet }) => {
  const [expanded, setExpanded] = useState(false);
  const hideWhenVisible = { display: expanded ? "none" : "" };
  const showWhenVisible = { display: expanded ? "" : "none" };

  Blog.propTypes = {
    blog: PropTypes.object,
    user: PropTypes.object,
    like: PropTypes.func,
    delet: PropTypes.func,
  };
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

  const addLike = () => {
    like(blog);
  };

  const handleDelete = () => {
    delet(blog);
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
        <button onClick={addLike}>like</button>
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
