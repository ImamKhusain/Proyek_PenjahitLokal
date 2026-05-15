import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");

  };

  return (
    <div className="navbar">

      <h2>Penjahit Lokal</h2>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
};

export default Navbar;