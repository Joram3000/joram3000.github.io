import { FC } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <nav className="navbar">
      <Link className="navbar-title" to="/">
        Joram Kroon Zandbak
      </Link>

      <div className="navbar-links">
        <ul>
          <li>
            <Link to="/" className="navbar-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/patternmaker" className="navbar-item">
              Patternmaker
            </Link>
          </li>
          <li>
            <Link to="/videoplayer" className="navbar-item">
              VideoPlayer
            </Link>
          </li>
          <li>
            <Link to="/about" className="navbar-item">
              About
            </Link>
          </li>

          <li>
            <Link to="/contact" className="navbar-item">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
