import { logIn } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"

const LoginForm = () => {

  const dispatch = useDispatch();
  const navigate= useNavigate()

    const handleLogin = async (event) => {
      event.preventDefault();
      dispatch(logIn(event.target.username.value, event.target.password.value))
      event.target.username.value = ""
      event.target.password.value = ""
      navigate('/')
    };

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
      <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control type="text" name="username" />
          </Form.Group>
          <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control type="password" name="password" />
          </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </>
  );
};

export default LoginForm;
