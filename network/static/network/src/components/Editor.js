import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Textarea from "./Textarea";
import SubmitButton from "./form/SubmitButton";

const Editor = React.forwardRef(
  ({ defaultValue = "", onSubmit, ...htmlAttributes }, ref) => {
    const [textValue, setTextValue] = useState(defaultValue);

    useEffect(() => {
      setTextValue(defaultValue);
    }, [defaultValue]);

    return (
      <Wrapper {...htmlAttributes}>
        <Textarea
          defaultRows="1"
          value={textValue}
          setValue={setTextValue}
          className="editor-textarea"
          placeholder="What's  Up?"
          ref={ref}
        />
        <div className="editor-action--group">
          <div className="left-group">
            {/* <button className="btn-icon">
            <span className="material-icons">insert_photo</span>
          </button>
          <button className="btn-icon">
            <span className="material-icons">insert_emoticon</span>
          </button> */}
          </div>
          <div className="right-group">
            <SubmitButton
              onSubmit={() => onSubmit(textValue)}
              className="btn btn-primary btn-sm btn-rounded"
              title={defaultValue ? "Update" : "Post"}
            />
          </div>
        </div>
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  textarea,
  .btn-icon {
    border: none;
    outline: none;
    resize: none;
    background: none;
  }
  .editor {
    &-textarea {
      width: 100%;
      border-bottom: 1px solid #dee2e6;
      padding: 15px 0;
    }
    &-action--group {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
    }
    &-action--group .left-group {
      display: flex;
      margin-top: -5px;
      .btn-icon {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 15px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          background-color: #e9ecef;
        }
      }
    }
    &-action--group .right-group {
      .btn-rounded {
        border-radius: 40px !important;
        padding-left: 25px;
        padding-right: 25px;
      }
    }
  }
`;

export default Editor;
