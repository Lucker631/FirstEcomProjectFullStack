import React from "react";
import { Link, NavLink } from "react-router-dom";
import Image from "../media/logo.JPG";

const Navbar = ({ isLoggedIn, handleLogout, user }) => {
  return (
    <div>
      <ul className="nav">
        <img className="logo-navbar" src={Image} />
        <NavLink
          to={"/"}
          style={({ isActive }) =>
            isActive ? linkStyles.activeLink : linkStyles.defaultLink
          }
        >
          Home
        </NavLink>
        <li>
          <NavLink
            to="/catalog"
            style={({ isActive }) =>
              isActive ? linkStyles.activeLink : linkStyles.defaultLink
            }
          >
            Catalog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            style={({ isActive }) =>
              isActive ? linkStyles.activeLink : linkStyles.defaultLink
            }
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/trackOrder"
            style={({ isActive }) =>
              isActive ? linkStyles.activeLink : linkStyles.defaultLink
            }
          >
            Track your order
          </NavLink>
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
        <div></div>
      </ul>
    </div>
  );
};
export default Navbar;
const linkStyles = {
  activeLink: {
    color: "lightgray",
  },
  defaultLink: {
    textDecoration: "none",
    color: "white",
  },
};
