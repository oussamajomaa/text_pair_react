import React, { createContext, useState } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoginStatus = (loggedIn) => setIsLoggedIn(loggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn: updateLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;