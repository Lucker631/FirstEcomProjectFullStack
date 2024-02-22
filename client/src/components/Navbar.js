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
        {/* <li>
          <NavLink
            to="/trackOrder"
            style={({ isActive }) =>
              isActive ? linkStyles.activeLink : linkStyles.defaultLink
            }
          >
            Track your order
          </NavLink>
        </li> */}
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
  defaultLink: {
    display: "inline-block",
    padding: "10px 20px",
    textDecoration: "none",
    backgroundColor: "#daa520", // You can change this color to your preference
    color: "#000000", // Text color
    border: "1px solid transparent", // Optional: Add border for better distinction
    borderRadius: "5px", // Optional: Rounded corners
    transition: "background-color 0.3s ease", // Smooth transition on hover
  },
  activeLink: {
    backgroundColor: "#926f17", // Change button color for active link
    border: "1px solid transparent",
    borderRadius: "5px",
  },
};
