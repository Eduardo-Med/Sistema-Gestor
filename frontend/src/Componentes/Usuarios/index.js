import React, { Component } from "react";
import { Container,Table, Button } from "react-bootstrap";

export default class index extends Component {
  render() {
    return (
      <Container fluid>
        <Table striped bordered hover variant="dark" style={{marginBottom:"25vh", marginTop:"30px"}}>
          <thead>
            <tr>
              <th>No. Control</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Semestre</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>16330523</td>
              <td>Francisco Flores</td>
              <td>franky@hotmail.com</td>
              <td>8</td>
              <Button className="ml-5" variant="info">Editar</Button>
              <Button className="ml-5" variant="danger">Eliminar</Button>

            </tr>
            <tr>
              <td>16330594</td>
              <td>Fernando Sanchez</td>
              <td>FernandoSa@gmail.com</td>
              <td>8</td>
              <Button className="ml-5" variant="info">Editar</Button>
              <Button className="ml-5" variant="danger">Eliminar</Button>
            </tr>
            <tr>
              <td>16330545</td>
              <td>Luis Angel Izaguirre</td>
              <td>luisangel@gmail.com</td>
              <td>8</td>
              <Button className="ml-5" variant="info">Editar</Button>
              <Button className="ml-5" variant="danger">Eliminar</Button>
            </tr>
            <tr>
              <td>15330516</td>
              <td>Carlos Cons</td>
              <td>Cons@gmail.com</td>
              <td>10</td>
              <Button className="ml-5" variant="info">Editar</Button>
              <Button className="ml-5" variant="danger">Eliminar</Button>
            </tr>
          </tbody>
        </Table>
      </Container>
    );
  }
}
