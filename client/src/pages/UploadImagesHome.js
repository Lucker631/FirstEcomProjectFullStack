import React from "react";
import axios from "axios";
import { URL } from "../config.js";

const UploadImages = (fetch_pictures) => {
  const uploadWidget = () => {
    // remember to add your credentials to the .env file
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_UPLOAD_PRESET, // settings --> upload --> Upload presets
        tags: ["user"], // add the given tags to the uploaded files
        // cropping: true,
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: ["local", "url"], // restrict the upload sources to URL and local files
        // multiple: false,  //restrict upload to a single file
        // folder: "assets", //upload files to the specified folder in your media library
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
      },
      (error, result) => {
        // console.log(result);
        if (error) {
          console.log(error);
        } else {
          result.event === "queues-end" && upload_picture(result);
        }
      }
    );
  };

  const upload_picture = async (result) => {
    try {
      const response = await axios.post(`${URL}/pictures/upload`, {
        files: result.info.files,
      });
      // response.data.ok
      //   ? await props.fetch_pictures()
      //   : alert("Something went wrong");
    } catch (error) {
      console.log(error);
    }
  };
  // function to send data to server to create a new post
  return (
    <div className="flex-home-upload">
      {/* form to add title, description, author, date -- onchange goes to state */}
      <div className="upload">
        <button className="form-button" onClick={uploadWidget}>
          Add pictures to home gallery
        </button>
      </div>
      {/* button PUBLISH POST on click take data from state and send to server on the body -- function*/}
    </div>
  );
};

export default UploadImages;
