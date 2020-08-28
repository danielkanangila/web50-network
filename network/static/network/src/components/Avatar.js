import React from "react";
import styled from "styled-components";

const Avatar = ({ image_url, alt, width = 64, height = 64, className }) => {
  return (
    <Wrapper width={width} height={height} className={className}>
      <img
        src={image_url ? image_url : require("../media/profile_pic.png")}
        alt={alt}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ width, height }) => `width: ${width}px;
  height: ${height}px;`}
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
