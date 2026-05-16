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

    // AMBIL NAMA JUGA SAAT REFRESH
    const name =
      localStorage.getItem("name");

    if (token && role) {

      setUser({
        token,
        role,
        name, // Masukkan nama ke dalam state global
      });

    }

  }, []);

  // LOGIN (Tambahkan parameter name di sini)
  const login = (
    token,
    role,
    name
  ) => {

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "role",
      role
    );

    // SIMPAN NAMA KE STORAGE
    localStorage.setItem(
      "name",
      name || ""
    );

    setUser({
      token,
      role,
      name, // Masukkan nama ke dalam state global user
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

    // HAPUS NAMA SAAT LOGOUT
    localStorage.removeItem(
      "name"
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