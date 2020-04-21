import React, { Component } from 'react';
import { Table, Button, Container } from "react-bootstrap";
import { computadoraInfo } from "./Computadoras-info";
import Detalles from "./../Detalles/"



class Computadora extends Component {
  constructor (props){
    super(props);

    this.state={
      ModalShow: false,
      numComputadora: "",
    }
  }

  setModalShow =({computadora})=>{
    this.setState({ModalShow: !this.state.ModalShow})
  }


  render() {
    return (
      <Container>
      <h1>Lista de reportes</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Aula</th>
            <th>Quien reporta</th>
            <th>Estado</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {computadoraInfo.map((computadora, index) => (
            <tr>
              <td>{computadora.numeroComputador + (index + 1)}</td>
              <td>L55</td>
              <td>{computadora.quienReporta}</td>
              <td>{computadora.estado}</td>
              <td>
                <Button onClick={this.setModalShow} size="sm"  block variant="info">Información</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Detalles show={this.state.ModalShow} onHide={this.setModalShow}/>
    </Container>
    );
  }
}


export default Computadora;
