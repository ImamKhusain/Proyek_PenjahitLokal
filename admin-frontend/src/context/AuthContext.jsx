import {
  createContext,
  useState,
} from "react";

export const AuthContext =
  createContext();

const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(() => {

      const token =
        localStorage.getItem(
          "token"
        );

      const role =
        localStorage.getItem(
          "role"
        );

      const id =
        localStorage.getItem(
          "id"
        );

      // =====================================
      // CHECK LOGIN
      // =====================================

      if (
        token &&
        role &&
        id
      ) {

        return {

          token,

          role,

          id:
            Number(id),

        };

      }

      return null;

    });


  // =====================================
  // LOGIN
  // =====================================

  const login = (

    token,

    role,

    id

  ) => {

    localStorage.setItem(

      "token",

      token

    );

    localStorage.setItem(

      "role",

      role

    );

    localStorage.setItem(

      "id",

      id

    );

    setUser({

      token,

      role,

      id:
        Number(id),

    });

  };


  // =====================================
  // LOGOUT
  // =====================================

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "id"
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