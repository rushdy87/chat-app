import './Login.scss';

const Login = () => {
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat App</span>
        <span className="title">Register</span>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
        <p>Don't hava an account? Register</p>
      </div>
    </div>
  );
};

export default Login;
