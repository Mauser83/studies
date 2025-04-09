import CreateBlog from "../components/CreateBlog";
import Togglable from "../components/Togglable";
import { useRef } from "react";
import { Link } from 'react-router-dom'
import { Table, Badge } from 'react-bootstrap'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


const Blogs = ({ blogs, user }) => {

  const addBlogFormRef = useRef();
  return (
    <>
    <h1>Blogs</h1>
      {user && (
        <div>
          <Togglable buttonLabel="Create blog" ref={addBlogFormRef}>
            <CreateBlog addBlogFormRef={addBlogFormRef} />
          </Togglable>
        </div>
      )}
      <Table striped>
      <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            </tr>
            </thead>
      <tbody>
      {blogs.map((blog) => (
        <tr key={blog.id}>
        <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> <Badge bg="primary"><ThumbUpIcon fontSize="sm" /> {blog.likes}</Badge></td>
        <td>{blog.author}</td>
        </tr>
      ))}
      </tbody>
      </Table>
    </>
  );
};

export default Blogs;
