import { createContext, useContext, useReducer } from 'react';
import { authContext } from './authContext';

export const chatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { currentUser } = useContext(authContext);

  const INITIAL_STATE = {
    chatId: 'null',
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  const value = {
    data: state,
    dispatch,
  };

  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};
