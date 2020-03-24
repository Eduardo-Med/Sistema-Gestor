import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import ReporteFallas from "./Componentes/ReporteFallas/";
import Menu from "./Componentes/Otros/BarraNavegacion";
import FormularioReporte from './Componentes/FormularioReporte'
import Login from './Componentes/Login/Login.js'
import Stadistic from './Componentes/Estadisticas/Stadistic.js'
import RegistroUsuario from './Componentes/RegistroUsuarios'
import Usuarios from './Componentes/Usuarios'

import "./App.css";
import Footer from "./Componentes/Otros/Footer";
import { Container, Row } from "react-bootstrap";

/*comentario de prueba*/

function App() {
  return (
    <Router>

    
      {/*Menu de prueba con todos*/}
      <Route
        path="/"
        exact
        render={() => {
          return (
            <Container>
              <Row>
                <Menu usuario="" />
              </Row>
            </Container>
          );
        }}
      />



      {/*RUTA PARA LA PARTE DE INCIAR SESION*/}
      <Route
        path="/Login"
        exact
        render={() => {
          return (
            <Container fluid>
              <Login />
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
                <Stadistic />
              <Row>
                <Footer />
              </Row>
            </Container>
          );
        }}
      />

      {/*RUTA PARA LA PARTE DE VER LOS USUARIOS Y AGREGARLOS*/}
      <Route
        path="/Registrousuario"
        exact
        render={() => {
          return (
            <Container fluid>
              <Row>
                <Menu usuario="Admin" />
              </Row>
                <RegistroUsuario/>
              <Row>
                <Footer />
              </Row>
            </Container>
          );
        }}
      />

      <Route
        path="/Usuario"
        exact
        render={() => {
          return (
            <Container fluid>
              <Row>
                <Menu usuario="Admin" />
              </Row>
                <Usuarios/>
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
