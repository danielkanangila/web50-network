import React from "react";
import styled from "styled-components";

const Logo = () => {
  return (
    <Wrapper className="logo">
      <span></span>
      <span></span>
      <span></span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 50px;
  height: fit-content;
  span {
    display: block;
    content: " ";
    width: 45px;
    height: 8px;
    position: absolute;
    &:nth-child(1) {
      background-color: #f44336;
      transform: rotate(90deg);
      z-index: 900 !important;
    }
    &:nth-child(2) {
      background-color: #2196f3;
      transform: rotate(60deg);
      left: 11px;
      z-index: 700 !important;
    }
    &:nth-child(3) {
      background-color: #ffeb3b;
      transform: rotate(90deg);
      left: 22px;
      z-index: 900 !important;
    }
  }
`;

export default Logo;
