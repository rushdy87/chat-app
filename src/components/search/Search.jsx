import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Search.scss';

const Search = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

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
        <div className="user-chat">
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
