import React from "react";
import { Form } from "react-bootstrap";

const Checkbox = ({name,id,check,disable}) => (
  <div>
        <Form.Check
    checked={check}
    custom
    inline
    disabled={disable}
    label={name}
    type="checkbox"
    id={`custom-inline-checkbox-${id}`}
  />
  </div>
);

export default Checkbox;
