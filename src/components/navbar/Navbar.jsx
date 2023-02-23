import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { authContext } from '../../context/authContext';
import './Navbar.scss';

const Navbar = () => {
  const { currentUser } = useContext(authContext);
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
