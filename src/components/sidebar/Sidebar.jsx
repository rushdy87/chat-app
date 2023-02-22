import './Sidebar.scss';
import { Navbar, Search, Chats } from '../';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
