import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import ReporteFallas from "./Componentes/ReporteFallas/";
import Menu from "./Componentes/Otros/BarraNavegacion";
import FormularioReporte from './Componentes/FormularioReporte'

import "./App.css";
import Footer from "./Componentes/Otros/Footer";
import { Container, Row } from "react-bootstrap";

/*comentario de prueba*/

function App() {
  return (
    <Router>

      {/*RUTA PARA LA PARTE DE INCIAR SESION*/}
      <Route
        path="/"
        exact
        render={() => {
          return (
            <Container fluid>
              {/*QUITAR TODA LA LINEA Y AGREGAR TODO LO DEL LOGIN */}
            </Container>
          );
        }}
      />

      {/*RUTA PARA EL REPORTE DE FALLAS*/}
      <Route
        path="/ReporteFallas"
        exact
        render={() => {
          return (
            <Container fluid>
              <Row>
                <Menu usuario="Admin" />
              </Row>
              <Row className="justify-content-center">
                <ReporteFallas />
              </Row>
              <Row>
                <Footer />
              </Row>
            </Container>
          );
        }}
      />


      {/*RUTA PARA EL FORMULARIO DE REPORTES*/}
      <Route
        path="/FormularioReporte"
        exact
        render={() => {
          return (
            <Container fluid>
              <Row>
                <Menu usuario="Servicio" />
              </Row>
              <Row className="justify-content-center">
                <FormularioReporte/>
              </Row>
              <Row>
                <Footer />
              </Row>
            </Container>
          );
        }}
      />


      {/*RUTA PARA VER LAS ESTADISTICAS DE LOS REPORTES*/}
      <Route
        path="/Estadisticas"
        exact
        render={() => {
          return (
            <Container fluid>
              <Row>
                <Menu usuario="Admin" />
              </Row>
              {/*QUITAR TODA LA LINEA Y AGREGAR LA PARTE DE ESTADISTICAS */}
              <Row>
                <Footer />
              </Row>
            </Container>
          );
        }}
      />

      {/*RUTA PARA LA PARTE DE VER LOS USUARIOS Y AGREGARLOS*/}
      <Route
        path="/Usuarios"
        exact
        render={() => {
          return (
            <Container fluid>
              <Row>
                <Menu usuario="Admin" />
              </Row>
              {/*QUITAR Y AGREGAR TODO LO DE USUARIOS*/}
              <Row>
                <Footer />
              </Row>
            </Container>
          );
        }}
      />
    </Router>
  );
}

export default App;
