import { useState, useContext } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { authContext } from '../../context/authContext';
import './Search.scss';

const Search = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(authContext);

  const hadleSearch = async () => {
    // Create a reference to the users collection
    const usersRef = collection(db, 'users');

    // Create a query against the collection.
    const q = query(usersRef, where('displayName', '==', userName));

    const querySnapshot = await getDocs(q);
    try {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data());
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.code === 'Enter') {
      hadleSearch();
      setUserName('');
    }
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      // check whether the group(chats in firestor) exists, if NOT
      // create a new one
      const response = await getDoc(doc(db, 'chats', combinedId));

      if (!response.exists()) {
        // create chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        // Create a user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    setUser(null);
  };

  return (
    <div className="search">
      <div className="search-form">
        <input
          type="text"
          placeholder="Find a user"
          value={userName}
          onChange={handleChange}
          onKeyDown={handleEnterPress}
        />
      </div>
      {error && (
        <span className="error-message">
          Sothing went wrong, please try agin later
        </span>
      )}
      {user && (
        <div className="user-chat" onClick={handleSelect}>
          <img src={user.photoURL} alt={user.displayName} />
          <div className="user-chat_info">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
