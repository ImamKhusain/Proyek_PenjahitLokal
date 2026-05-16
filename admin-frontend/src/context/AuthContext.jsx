import {
  createContext,
  useState,
  useEffect,
} from "react";

export const AuthContext =
  createContext();

const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  // CHECK LOGIN SAAT REFRESH
  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const role =
      localStorage.getItem("role");

    if (token && role) {

      setUser({
        token,
        role,
      });

    }

  }, []);

  // LOGIN
  const login = (
    token,
    role
  ) => {

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "role",
      role
    );

    setUser({
      token,
      role,
    });

  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export default AuthProvider;