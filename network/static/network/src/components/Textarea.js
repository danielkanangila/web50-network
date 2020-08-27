import React, { useState, useRef } from "react";

const Textarea = React.forwardRef(
  ({ value, setValue, defaultRows = 1, ...otherProps }, ref) => {
    const [rows, setRows] = useState(defaultRows);
    const textareaRef = ref;

    const handleChange = (e) => {
      // External handle change function
      setValue(e.target.value);
      // Textarea content width computation for updating textarea rows dynamically.
      const textareaWidth = textareaRef.current.clientWidth;
      const r = Math.ceil((getTextWidth(e.target.value) + 42) / textareaWidth);
      setRows(r);
    };

    const getTextWidth = (text) => {
      const span = document.createElement("span");
      span.style =
        "display:block; padding:0; position:absolute; visibility:hidden; font-size:100%";
      span.innerText = text;
      document.body.appendChild(span);
      const width = span.clientWidth;
      document.body.removeChild(span);

      return width;
    };

    return (
      <textarea
        ref={ref}
        rows={rows}
        value={value}
        {...otherProps}
        onChange={handleChange}
      ></textarea>
    );
  }
);

export default Textarea;
