import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, storage, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './Register.scss';
import addAvatar from '../../images/addAvatar.png';

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const avatar = event.target[3].files[0];

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, displayName);
      uploadBytesResumable(storageRef, avatar).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateProfile(response.user, {
            displayName,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, 'users', response.user.uid), {
            uid: response.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, 'userChats', response.user.uid), {});
          navigate('/');
        });
      });
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat App</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="file" id="avatar" style={{ display: 'none' }} />
          <label htmlFor="avatar">
            <img src={addAvatar} alt="Add Avatar" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {error && (
            <span className="error-message">
              Sothing went wrong, please try agin later
            </span>
          )}
        </form>
        <p>Do you hava an account? Login</p>
      </div>
    </div>
  );
};

export default Register;

/*


// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);
*/
