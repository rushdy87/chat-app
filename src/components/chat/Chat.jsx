import { useContext } from 'react';
import { chatContext } from '../../context/chatContext';
import './Chat.scss';
import { cam, add, more } from '../../images';
import { Messages, Input } from '..';

const Chat = () => {
  const { data } = useContext(chatContext);

  return (
    <div className="chat">
      <div className="chat-info">
        {data && <span>{data.user.displayName}</span>}
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
