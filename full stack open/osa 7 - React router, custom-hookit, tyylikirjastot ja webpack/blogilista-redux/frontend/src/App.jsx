import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import User from "./components/User";
import Users from "./components/Users";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { logOut, initializeUser } from "./reducers/userReducer";
import { Routes, Route, Link, useMatch, Navigate } from "react-router-dom";
import { Alert, Nav, Navbar } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const notification = useSelector((state) => state.notification);
  const padding = { padding: 5 };

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const blogMatch = useMatch("/blogs/:id");
  const blogId = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  const userMatch = useMatch("/users/:id");
  const userId = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  return (
    <div className="container">
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="lg"
        bg="light"
        data-bs-theme="dark"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav variant="tabs" className="mr-auto" >
            <Nav.Link eventkey="blogs" as="span">
              <Link style={padding} to="/">
                Blogs
              </Link>
            </Nav.Link>
            <Nav.Link eventkey="users" as="span">
              <Link style={padding} to="/users">
                Users
              </Link>
            </Nav.Link>
            <Nav.Link eventkey="login" as="span">
              {user ? (
                <>
                    <Link style={padding} onClick={handleLogout}>Logout</Link>
                </>
              ) : (
                <>
                  <Link style={padding} to="/login">
                    Login
                  </Link>
                </>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {user && <Navbar.Text>{user.name} logged in</Navbar.Text>}
      </Navbar>

      <div>
        {notification && (
          <Alert variant={notification.variant}>{notification.message}</Alert>
        )}

        <Routes>
          <Route path="/" element={<Blogs blogs={blogs} user={user} />} />
          <Route
            path="/blogs/:id"
            element={<Blog user={user} blogId={blogId} />}
          />
          <Route path="/users/:id" element={<User userId={userId} />} />
          <Route
            path="/users"
            element={
              user ? <Users users={users} /> : <Navigate replace to="/login" />
            }
          />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
