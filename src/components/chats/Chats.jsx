import { useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { authContext } from '../../context/authContext';
import { chatContext } from '../../context/chatContext';
import './Chats.scss';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(authContext);
  const { dispatch } = useContext(chatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(
          Object.entries(doc.data()).sort((a, b) => b[1].date - a[1].date)
        );
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: 'CHANGE_USER', payload: user });
  };

  const renderChats = chats.map((chat) => {
    return (
      <div
        className="user-chat"
        key={chat[0]}
        onClick={() => handleSelect(chat[1].userInfo)}
      >
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="user-chat_info">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
    );
  });

  return <div className="chats">{renderChats}</div>;
};

export default Chats;
