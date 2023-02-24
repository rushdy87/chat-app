import { useContext } from 'react';

import { authContext } from '../../context/authContext';
import { chatContext } from '../../context/chatContext';
import './Message.scss';

const Message = ({ message }) => {
  const { currentUser } = useContext(authContext);
  const { data } = useContext(chatContext);

  return (
    <div
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className="message-info">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{message.data}</span>
      </div>
      <div className="message-content">
        <p>{message.text}</p>
        {message.image && <img src={message.image} alt="" />}
      </div>
    </div>
  );
};

export default Message;
