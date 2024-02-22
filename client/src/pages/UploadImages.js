import React from "react";
import axios from "axios";

const UploadImages = ({ productSetter }) => {
  // debugger;
  const uploadWidget = (e) => {
    e.preventDefault();
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
    let newPhotos = result.info.files.map((pic) => {
      return {
        public_id: pic.uploadInfo.public_id,
        photo_url: pic.uploadInfo.secure_url,
      };
    });
    // newPhotos = newPhotos.concat(photos.photos);
    productSetter((prevState) => ({ ...prevState, image: [...newPhotos] }));
  };
  // function to send data to server to create a new post
  return (
    <div className="flex_upload">
      {/* form to add title, description, author, date -- onchange goes to state */}
      <div className="upload">
        <button className="form-button" onClick={uploadWidget}>
          Open widget
        </button>
      </div>
      {/* button PUBLISH POST on click take data from state and send to server on the body -- function*/}
    </div>
  );
};

export default UploadImages;
