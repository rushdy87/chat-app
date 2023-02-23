import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './Login.scss';

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat App</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
          {error && (
            <span className="error-message">
              Sothing went wrong, please try agin later
            </span>
          )}
        </form>
        <p>
          Don't hava an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
