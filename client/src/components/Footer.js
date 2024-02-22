import React from "react";
import { Link, NavLink } from "react-router-dom";

const Footer = ({ isLoggedIn, handleLogout, user }) => {
  return (
    <div className="grid-footer-parent">
      <div className="grid-footer">
        <p>Contact Us:</p>
        <p>Email: info@pawfriend.com</p>
        <div>
          <a href="https://www.facebook.com">
            <img
              className="link-img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/256px-Facebook_icon.svg.png?20220812153731"
              alt="Facebook"
            />
          </a>
          <a href="https://www.instagram.com">
            <img
              className="link-img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
              alt="Instagram"
            />
          </a>
        </div>
        <p>Phone: 123-456-7890</p>
      </div>
    </div>
  );
};

export default Footer;
