import { Sidebar, Chat } from '../../components';
import './Home.scss';
const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <Sidebar classNam="sidebar" />
        <Chat classNam="chat" />
      </div>
    </div>
  );
};

export default Home;
