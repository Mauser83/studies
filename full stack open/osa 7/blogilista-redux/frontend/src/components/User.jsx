import { Link } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const User = ({ userId }) => {
  if (!userId) {
    return null
  }

  return (
    <>
      <h1>{userId.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {userId.blogs.map((blog) => (
            <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> <Badge bg="primary"><ThumbUpIcon fontSize="sm" /> {blog.likes}</Badge></li>
        ))}
      </ul>
    </>
  );
};

export default User;
