import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog, likeBlog, commentBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom"
import { Form, Button } from 'react-bootstrap'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Blog = ({ blogId, user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  if (!blogId) {
    return null
  }

  const handleLike = () => {
    dispatch(likeBlog(blogId));
    dispatch(
      setNotification(
        `liked blog '${blogId.title}' by ${blogId.author}`,
        "success",
        5
      )
    );
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blogId.title} by ${blogId.author}`)) {
      dispatch(deleteBlog(blogId));
      dispatch(
        setNotification(
          `deleted blog '${blogId.title}' by ${blogId.author}`,
          "success",
          5
        )
      );
      navigate('/')
    }
  };

  const addComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blogId, event.target.comment.value))
    event.target.comment.value = ""
  }

  return (
      <>
      <>
        <h1>{blogId.title} {blogId.author}</h1>
      </>
        <a href={blogId.url}>{blogId.url}</a>
        <br />
        <>likes {blogId.likes} </>
        <Button size="sm" variant="primary"><ThumbUpIcon fontSize="small" onClick={handleLike}/> like</Button>
        <br />
        added by {blogId.user && blogId.user.name ? <Link to={`/users/${blogId.user.id}`}>{blogId.user.name}</Link> : null}
        {blogId.user && user && blogId.user.username === user.username ? (
          <>
            <br />
            <Button size="sm" variant="danger" onClick={handleDelete}>
              <DeleteIcon fontSize="sm" /> delete
            </Button>
          </>
        ) : null}
        <h2>comments</h2>
        <Form onSubmit={addComment}>
        <Form.Group>
        <Form.Control type="text" name="comment" />
        <Button variant="primary" type="submit">Add comment</Button>
        </Form.Group>
        </Form>
        <ListGroup variant="flush">
        {blogId.comments.map((comment, index) => 
        <ListGroup.Item variant="info" key={blogId.id+"_comment"+index}>{comment}</ListGroup.Item>)}
        </ListGroup>
        </>
  );
};

export default Blog;
