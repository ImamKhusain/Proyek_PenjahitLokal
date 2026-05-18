import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // 💡 1. TAMBAHKAN STATE LOADING (Default: true)
  const [loading, setLoading] = useState(true);

  // CHECK LOGIN SAAT REFRESH
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    if (token && role) {
      setUser({
        token,
        role,
        name,
      });
    }
    
    // 💡 2. SELESAI CEK STORAGE, SET LOADING JADI FALSE
    setLoading(false); 
  }, []);

  // LOGIN
  const login = (token, role, name) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name || "");

    setUser({
      token,
      role,
      name,
    });
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setUser(null);
  };

  return (
    // 💡 3. KIRIMKAN STATE LOADING KE DALAM VALUE PROVIDER
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;