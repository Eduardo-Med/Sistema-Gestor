import React from "react";
import "./styles.css";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import CheckBox from "./../../Otros/CheckBox";

const Detalles = ({ show, onHide }) => (
  <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter">
    <Modal.Header closeButton onClick={onHide}>
      <Modal.Title id="contained-modal-title-vcenter">
        Reporte del equipo
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Container>
        <Row>
          <Col>
            <Container>
              <Row>
                <Col>
                  <h5>Fecha: 10/04/20</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>Equipo: Eq0008</h5>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col>
            <h5>Hora: 08:14</h5>
          </Col>
          <Col>
            <h5>Aula: L55</h5>
          </Col>
        </Row>
        <Row xs={4} className="mt-5 justify-content-md-center">
          <Col>
            <h5>Reportador: David Rondan Velazquez</h5>
          </Col>
          <Col>
            <h5 className="float-left">Estado del reporte: </h5>
            <Form.Control className="w-50" as="select" custom>
              <option>Pendiente</option>
              <option>Solucionado</option>
            </Form.Control>
          </Col>
        </Row>
        <Row className="mt-5 ml-5">
          <h6>Problema con: </h6>
          <Col>
            <CheckBox name="CPU" id="1" check={true}/>
            <CheckBox name="MONITOR" id="2" />
            <CheckBox name="TECLADO" id="3" />
            <CheckBox name="MOUSE" id="4"  check={true}/>
          </Col>
          <Col xs="12" md="6" className="mb">
            <CheckBox name="RED" id="6" check={true} />
            <CheckBox name="CABLE ENERGIA" id="7" />
            <CheckBox name="CABLE VGA/HDMI" id="8" />
            <CheckBox name="CAÑON" id="9" />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
          <h5>Descripcion de la falla: "...................."</h5>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col>
          <h5>Accion Tomada: "...................."</h5>
          </Col>
        </Row>
      </Container>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="success" onClick={onHide}>
        Confirmar Cambios
      </Button>
      <Button variant="danger" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default Detalles;
