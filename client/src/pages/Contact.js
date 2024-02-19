import React, { useState } from "react";

const FORM_ENDPOINT = "https://herotofu.com/start";
function Contact() {
  return (
    <div>
      Contact
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
  );
}

export default Contact;
