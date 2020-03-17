import React from "react";
import {Col } from "react-bootstrap";
import "./styles.css";

const Salon = ({num}) => (
    <Col xs={4} className="SalonContenedor">
        <h1 style={{ paddingTop: 50}}>
        {num}
        </h1>
    </Col>
    
);

export default Salon;
