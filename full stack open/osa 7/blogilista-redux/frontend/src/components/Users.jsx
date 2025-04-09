import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeUsers } from "../reducers/usersReducer";
import { Table } from "react-bootstrap";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  return (
    <>
      <h1>Users</h1>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
            <th>Total blog likes</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
              <td>{user.blogs.reduce(function(prev, current) {
              return prev + current.likes}, 0)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Users;
