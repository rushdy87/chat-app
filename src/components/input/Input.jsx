import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { storage, db } from '../../firebase';
import { authContext } from '../../context/authContext';
import { chatContext } from '../../context/chatContext';
import './Input.scss';
import { img, attach } from '../../images';

const Input = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(authContext);
  const { data } = useContext(chatContext);

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuidv4());
      uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, 'chats', data.chatId), {
            messages: arrayUnion({
              id: uuidv4(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              image: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: { text },
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: { text },
      [data.chatId + '.date']: serverTimestamp(),
    });

    setText('');
    setImage(null);
  };

  const handleEnterPress = (event) => {
    if (event.code === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type Something..."
        value={text}
        onChange={handleChangeText}
        onKeyDown={handleEnterPress}
      />
      <div className="send">
        <img src={attach} alt="" />
        <input
          type="file"
          style={{ display: 'none' }}
          id="images"
          value={image?.filename}
          onChange={handleFileChange}
        />
        <label htmlFor="images">
          <img src={img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
