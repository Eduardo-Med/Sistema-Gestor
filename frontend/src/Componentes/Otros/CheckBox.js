import React from "react";
import { Form } from "react-bootstrap";

const Checkbox = ({value,id,check,disable,name}) => (
  <div>
        <Form.Check
    checked={check}
    custom
    inline
    disabled={disable}
    label={value}
    type="checkbox"
    id={`custom-inline-checkbox-${id}`}
    name={name}
  />
  </div>
);

export default Checkbox;
