import './Chat.scss';
import { cam, add, more } from '../../images';
import { Messages, Input } from '..';

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-info">
        <span>Miranda Cohen</span>
        <div className="chat-icons">
          <img src={cam} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
