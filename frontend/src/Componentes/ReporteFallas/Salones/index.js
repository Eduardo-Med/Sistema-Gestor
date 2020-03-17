import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Salon from "./Salon";
import "./styles.css";
import { salonInfo } from "./Salon-info";


export default class Salones extends Component {
  render() {
    var indents = [];
    for (let index = 0; index < 10; index++) {
      indents.push(<Salon num={"+"} />);
    }

    return (
      <Container fluid >
        <Row>
          <Col className="" xs={12}>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>
              Seleccione Un Salon  
            </h1> 
          </Col>
        </Row>
        <Row className="ContenedorSalones">
          {salonInfo.map(salon => (
            <Salon num={salon.SalonNumero} />
          ))}
          <Salon num={"+"} />
        </Row>
      </Container>
    );
  }
}
