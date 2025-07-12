import { createContext, useContext, useState } from "react";

// Define the context
const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("token");

  const login = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

/** Steps to create Context API **/
// 1. Create a context variable using createContext() function
// 2. Create a provider component that will wrap the entire application
// 3. Set the value prop of the provider component
// 4. Export the context variable and the provider component
// 5. Wrap the application with the provider component
// 6. Use useContext() hook to access the context value in any component
