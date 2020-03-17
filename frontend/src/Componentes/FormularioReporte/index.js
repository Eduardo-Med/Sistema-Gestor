import React, { Component } from "react";
import { Container, Row, Col, Form,Button } from "react-bootstrap";
import "./styles.css";
import { salonInfo } from "./../ReporteFallas/Salones/Salon-info";
import { computadoraInfo } from "./../ReporteFallas/Computadoras/Computadoras-info";
import CheckBox from "./../Otros/CheckBox";

export default class FormularioReporte extends Component {
  render() {
    return (
      <Container fluid className="FormularioReporte m-5 p-4">
        <h1 style={{ textAlign: "center", paddingBottom: 50 }}>
          Reporte De Falla
        </h1>
        <Form>
          <Row>
            <Col xs="12" md="6">
              <Container className="labelTexto">
                <Row className="justify-content-center">
                    <Form.Label xs="12" className="text-center">
                    Aula
                  </Form.Label>
                  <Col xs="12">
                    <Form.Control as="select" custom>
                      {salonInfo.map(salon => (
                        <option>{salon.SalonNumero}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>

                <Row className="justify-content-center">
                <Form.Label xs="12">
                    Equipo
                  </Form.Label>
                  <Col xs="12">
                    <Form.Control as="select" custom>
                      {computadoraInfo.map((computadora, index) => (
                        <option>{`${computadora.numeroComputador}${index +
                          1}`}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Form.Label xs="12">
                    Nombre
                  </Form.Label>
                  <Col xs="12" >
                    <Form.Control type="email" placeholder="¿Quien reporta?" />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Form.Label xs="12">
                    Descripción
                  </Form.Label>
                  <Col xs="12">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      placeholder="Descripcion De La Falla"
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Form.Label xs="12">
                    Acción
                  </Form.Label>
                  <Col xs="12">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      placeholder="Acción Tomada"
                    />
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col xs="12" md="6" className="mb">
              <h3>Problema con: </h3>
              <Container>
                <Row>
                  <Col>
                    <CheckBox name="CPU" id="1" />
                    <CheckBox name="MONITOR" id="2" />
                    <CheckBox name="TECLADO" id="3" />
                    <CheckBox name="MOUSE"  id="4"/>
                  </Col>
                  <Col xs="12" md="6" className="mb">
                    <CheckBox name="RED" id="6" />
                    <CheckBox name="CABLE ENERGIA" id="7" />
                    <CheckBox name="CABLE VGA/HDMI" id="8" />
                    <CheckBox name="CAÑON" id="8" />
                  </Col>
                </Row>
                <Row className="mt-5 align-items-end" >
              
                <Button variant="outline-primary" size="lg">Enviar</Button>

               
                </Row>
              </Container>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
