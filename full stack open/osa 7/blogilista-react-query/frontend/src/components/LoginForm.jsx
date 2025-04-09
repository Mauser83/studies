import PropTypes from "prop-types";
import { useState } from "react";
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useUserDispatch } from '../reducers/UserContext.jsx'
import { useNotificationDispatch } from "../reducers/NotificationContext";

const LoginForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  LoginForm.propTypes = {
    handleSubmit: PropTypes.func,
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({type: "LOGIN", payload: user})
      setUsername("");
      setPassword("");
    } catch (exception) {
      notificationDispatch({type: "SET_NOTIFICATION", payload: {message: `wrong username or password`, color: "red"}});
      setTimeout(() => {
        notificationDispatch({type: "CLEAR_NOTIFICATION"})
      }, 5000)

    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            data-testid="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            data-testid="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
