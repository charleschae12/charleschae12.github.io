import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Define a component to provide authentication data to other components
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    isLoggedIn: false, 
    data: null, 
  });

  // Provide the authData and setAuthData to children via AuthContext.Provider
  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define a hook to use the authentication context and retrieve authData and setAuthData
export const useAuth = () => {
  return useContext(AuthContext);
};

// Export the AuthContext as a default export for external usage
export default AuthContext;
