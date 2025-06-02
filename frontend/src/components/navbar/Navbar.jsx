import { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">
          <Link to="/">
            <h1>BookingApp</h1>
          </Link>
        </span>
        <div className="navItems">
          {user ? (
            <h1 className="bg-white/5 backdrop:blur-md px-2 rounded-sm py-0 text-white ">
              {user.username}
            </h1>
          ) : (
            <>
              <button className="navButton">Register</button>
              <Link to="/login">
                <button className="navButton">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
