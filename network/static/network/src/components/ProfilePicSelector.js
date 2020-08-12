import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Label } from "./styled-components";
import { theme } from "../config/theme";

const ProfilePicSelector = (props) => {
  const [image, setImage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const profilePictureRef = useRef();

  const handleUpload = (event) => {
    event.preventDefault();
    // const userData = {
    //   username: props.username,
    //   imageData: image,
    // };
    console.log(image);

    // const userImagesRef = firestore.collection('userImages')
    // userImagesRef.add(userData).then(ref => {
    //     setIsUploaded(true);
    // })
  };

  const openFileSelector = () => {
    profilePictureRef.current.click();
  };

  const handleChange = (e) => {
    handleFile(e.target.files);
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file[0]);
  };

  const handleDragAndDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files);
  };

  return (
    <Div>
      <Label>Add Profile Picture</Label>
      <div
        onDragEnter={handleDragAndDrop}
        onDragLeave={handleDragAndDrop}
        onDragOver={handleDragAndDrop}
        onDrop={handleDragAndDrop}
        onClick={openFileSelector}
        className={image ? "drop-region has-image" : "drop-region"}
      >
        <div className={isUploaded ? "success-upload" : "display-none"}>
          <i className="far fa-check-circle"></i>
          <span>Uploaded</span>
        </div>
        <div className={image ? "display-none" : "drop-message"}>
          Drag & Drop images or click to upload
          <input
            onChange={handleChange}
            ref={profilePictureRef}
            type="file"
            accept="image/*"
            multiple={false}
          />
        </div>
        <div className="drop-image-preview">
          <img
            className={image ? "show-image" : "display-none"}
            src={image}
            alt="profile"
          />
        </div>
      </div>
      <button
        disabled={isUploaded}
        className="btn-upload"
        onClick={handleUpload}
      >
        Upload
      </button>
    </Div>
  );
};

const Div = styled.div`
    display: block;
    margin-top: 20px;
    width: 165px;
    .btn-upload {
        border: 1px solid ${theme.color.lightGreen};
        padding: 5px 10px;
        color: ${theme.color.lightGreen};
        margin-top: 15px;
        width: 100%;
        border-radius: 25px;
        transition: all .3s;
        :hover {
            background-color: ${theme.color.lightGreen};
            color: #fff;
        }
        :disabled {
            color: #ccc;
            border-color: #ccc;
            cursor: not-allowed;
            background-color: #fff;
        }
    }
    .drop-region {
        position: relative;
        display: table-cell;
        width: 160px;
        height: 160px;
        border: 3px dashed ${theme.color.lightGreen};
        font-size: 0.8rem;
        vertical-align: middle;
        padding: 0 10px;
        text-align: center;
        overflow: hidden;
        cursor: move;
        input[type="file"] {
            display: none;
        }
        &.has-image {
            border: none;
            padding: 0;
        }
        .success-upload {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 160px;
            height: 160px;
            background-color: rgba(0,0,0,0.7);
            font-size: 1.6rem;
            color: ${theme.color.lightGreen};
            transition: all .3s
            display: block;
            span {
                display: block;
                color: #fff;
                font-size: 0.6rem;
                text-transform: uppercase;
                margin-top: 10px;
            }
        }
    }
    .display-none {
        display: none;
    }
    .show-image {
        display: block;
        max-width: 100%;
        max-height: 100%;
        width: 160px;
        height: 160px;
    }
`;

export default ProfilePicSelector;
