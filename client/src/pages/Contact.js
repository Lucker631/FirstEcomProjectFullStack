import React, { useState } from "react";
import axios from "axios";

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
      const res = await axios.post(
        "http://localhost:5010/emails/send_email",
        data
      );
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
    </div>
  );
}

export default Contact;
