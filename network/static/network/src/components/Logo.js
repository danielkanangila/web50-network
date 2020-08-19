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
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    content: " ";
    width: 45px;
    height: 8px;
    /* position: absolute; */
    &:nth-child(1) {
      background-color: #f44336;
      transform: rotate(90deg);
      transform-origin: 20% -20%;
      z-index: 900 !important;
    }
    &:nth-child(2) {
      background-color: #2196f3;
      transform: rotate(60deg);
      transform-origin: 45% -40%;
      /* left: 11px; */
      z-index: 700 !important;
    }
    &:nth-child(3) {
      background-color: #ffeb3b;
      transform: rotate(90deg);
      transform-origin: 63% 25%;
      z-index: 900 !important;
    }
  }
`;

export default Logo;
