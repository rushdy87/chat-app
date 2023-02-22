import './Navbar.scss';

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img
          src="https://www.updatedcelebrities.com/wp-content/uploads/2022/11/IMG_20221101_210132.jpg"
          alt=""
        />
        <span>Miranda</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
