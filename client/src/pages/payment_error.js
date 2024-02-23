import React from "react";

const PaymentError = (props) => {
  debugger;
  return (
    <div className="message_container">
      <div style={{ border: "2px solid  #daa520" }} className="message_box">
        <div className="message_box_left">
          <img
            alt="sad_icon"
            className="payment-image"
            src={"http://cdn.onlinewebfonts.com/svg/img_56533.png"}
          />
        </div>
        <div style={{ color: "#daa520" }} className="message_box_right">
          Payment Error
        </div>
      </div>
    </div>
  );
};

export default PaymentError;
