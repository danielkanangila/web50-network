import React from "react";
import styled from "styled-components";

const Avatar = ({ image_url, alt, className }) => {
  return (
    <Wrapper className={className}>
      <img
        src={image_url ? image_url : require("../media/profile_pic.png")}
        alt={alt}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 64px;
  height: 64px;
  overflow: hidden;
  border-radius: 50%;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Avatar;
