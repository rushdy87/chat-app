import { useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { authContext } from '../../context/authContext';
import './Chats.scss';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(authContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(Object.entries(doc.data()));
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const renderChats = chats.map((chat) => {
    return (
      <div className="user-chat" key={chat[0]}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="user-chat_info">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].userInfo.lastMessage?.text}</p>
        </div>
      </div>
    );
  });

  return <div className="chats">{renderChats}</div>;
};

export default Chats;
