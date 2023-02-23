import { useContext } from 'react';
import { Home, Login, Register } from './pages';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { authContext } from './context/authContext';

function App() {
  const { currentUser } = useContext(authContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
