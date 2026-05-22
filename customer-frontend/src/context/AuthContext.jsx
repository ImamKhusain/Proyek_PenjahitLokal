import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const id = localStorage.getItem("id");
    const email = localStorage.getItem("email"); // 💡 TAMBAHAN: Ambil email dari localStorage saat memuat aplikasi

    if (token && role) {
      setUser({
        token,
        role,
        name,
        id,
        email, // 💡 TAMBAHAN: Masukkan email ke dalam state global user
      });
    }

    setLoading(false);
  }, []);

  // LOGIN (💡 TAMBAHAN: Tambah parameter 'email' di fungsi login)
  const login = (token, role, id, name, email) => {

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("id", id);
    localStorage.setItem("name", name || "");
    localStorage.setItem("email", email || ""); // 💡 TAMBAHAN: Simpan email ke localStorage saat login berhasil

    setUser({
      token,
      role,
      id,
      name,
      email, // 💡 TAMBAHAN: Masukkan email ke dalam state global user setelah berhasil login
    });
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("email"); // 💡 TAMBAHAN: Hapus email dari localStorage saat logout

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;