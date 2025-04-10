import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  LoginForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleUserNameChange: PropTypes.func,
    handlePassWordChange: PropTypes.func,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            data-testid='username'
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            data-testid='password'
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm