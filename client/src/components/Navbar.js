import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleLogout, user }) => {
  return (
    <ul className="nav">
      <NavLink
        to={"/"}
        style={({ isActive }) =>
          isActive ? linkStyles.activeLink : linkStyles.defaultLink
        }
      >
        Home
      </NavLink>
      <li>
        <NavLink to="/catalog">Catalog</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li>
        <NavLink to="/trackOrder">Track your order</NavLink>
      </li>
      {isLoggedIn === false && (
        <>
          <NavLink
            to="/register"
            style={({ isActive }) =>
              isActive ? linkStyles.activeLink : linkStyles.defaultLink
            }
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            style={({ isActive }) =>
              isActive ? linkStyles.activeLink : linkStyles.defaultLink
            }
          >
            Login
          </NavLink>
        </>
      )}
      {isLoggedIn && (
        <>
          {user.role === "admin" && (
            <NavLink
              to="/secret-page"
              style={({ isActive }) =>
                isActive ? linkStyles.activeLink : linkStyles.defaultLink
              }
            >
              Secret
            </NavLink>
          )}
          <li>
            <NavLink
              to="/logout"
              onClick={handleLogout}
              style={linkStyles.defaultLink}
            >
              Logout
            </NavLink>
          </li>
          <p>{user.email}</p>
        </>
      )}
    </ul>
  );
};
export default Navbar;
const linkStyles = {
  activeLink: {
    color: "gray",
  },
  defaultLink: {
    textDecoration: "none",
    color: "white",
  },
};
