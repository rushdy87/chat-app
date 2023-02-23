import { useState, useEffect, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrenUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrenUser(user);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <authContext.Provider value={{ currentUser }}>
      {children}
    </authContext.Provider>
  );
};
