import React, { useState } from "react";
import axios from "axios";
import { URL } from "../config.js";

const FORM_ENDPOINT = "https://herotofu.com/start";
function Contact() {
  const defaultSubject = "Here is the message: ";
  // function to submit the form
  const handleSubmit = async (event) => {
    // preventing page from reloading on submitting the form
    event.preventDefault();
    // destructuring form elements - remember that you give properties name with "name" attribute to every each input
    const { name, email, message, subject } = event.target.elements;
    // composing data object to end in the body of a request. As destructured elements are HTMLElements, we need to extract their values to get strings
    var data = {
      name: name.value,
      email: email.value,
      message: message.value,
      subject: subject.value || defaultSubject,
    };
    // sending request to the server
    try {
      // debugger;
      const res = await axios.post(`${URL}/emails/send_email`, data);
      // printing positive response from the server
      console.log("res: ", res);
      // clearing the form inputs
      name.value = "";
      email.value = "";
      message.value = "";
      subject.value = "";
      // alert to the user
      alert("Your message has been sent, thanks!");
    } catch (error) {
      // logging error to the console
      console.log(error.message || error);
    }
  };

  return (
    <div>
      <h1 className="header-text-contact">How can we help you?</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="contact-form"
          required={true}
          type="text"
          placeholder="Email title"
          name="subject"
        />

        <textarea
          className="contact-text-area"
          required={true}
          placeholder="Please write your message"
          name="message"
        />

        <input
          className="contact-form"
          required={true}
          type="text"
          placeholder="What is your name?"
          name="name"
        />
        <input
          className="contact-form"
          required={true}
          type="email"
          placeholder="Your contact email?"
          name="email"
        />
        <button className="form-button" type="submit" label="Send">
          Send!
        </button>
      </form>
      <div className="map-div">
        <iframe
          className="map"
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d748.2910074947412!2d2.151011269658643!3d41.39224400430387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDIzJzMyLjEiTiAywrAwOScwNi4wIkU!5e0!3m2!1sru!2ses!4v1708602131434!5m2!1sru!2ses"
          width="50%"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
