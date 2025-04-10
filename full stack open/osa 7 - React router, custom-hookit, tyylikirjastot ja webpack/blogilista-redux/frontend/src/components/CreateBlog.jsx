import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Form, Button } from "react-bootstrap";

const CreateBlog = ({ addBlogFormRef }) => {
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    dispatch(createBlog(newBlog));
    dispatch(
      setNotification(
        `you created blog '${newBlog.title}' by ${newBlog.author}`,
        "success",
        5
      )
    );
    addBlogFormRef.current.toggleVisibility();
    event.target.title.value = ""
    event.target.author.value = ""
    event.target.url.value = ""
  };

  const closeForm = (event) => {
    event.preventDefault();
    addBlogFormRef.current.toggleVisibility();
    event.target.title.value = ""
    event.target.author.value = ""
    event.target.url.value = ""
  }

  return (
    <>
      <h2>Create new</h2>
      <Form onSubmit={addBlog} onReset={closeForm}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" name="url" />
        </Form.Group>
        <Button variant="primary" type="submit">Save</Button>
        <Button variant="danger" type="reset">Cancel</Button>
      </Form>
    </>
  );
};

export default CreateBlog;
