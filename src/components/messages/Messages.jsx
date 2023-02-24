import { useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { chatContext } from '../../context/chatContext';
import './Messages.scss';
import { Message } from '..';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(chatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  const renderMessages = messages.map((message) => (
    <Message message={message} key={message.id} />
  ));

  return <div className="messages">{renderMessages}</div>;
};

export default Messages;
