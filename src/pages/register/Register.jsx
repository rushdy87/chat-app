import './Register.scss';
import addAvatar from '../../images/addAvatar.png';

const Register = () => {
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat App</span>
        <span className="title">Register</span>
        <form>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="file" id="avatar" style={{ display: 'none' }} />
          <label htmlFor="avatar">
            <img src={addAvatar} alt="Add Avatar" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        <p>Do you hava an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
