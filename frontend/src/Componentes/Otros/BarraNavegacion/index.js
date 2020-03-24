import React, { Component } from "react";
import { Navbar, Nav, Image, Button } from "react-bootstrap";
import {Link} from 'react-router-dom'
import {adminInfo} from './BNAdmin/Admin-Info'
import {tecnicoInfo} from './BNTecnico/Tecnico-Info'
import logoIth from './../../../Imagenes/logoith.png'
import './styles.css'

export default class BarraNavegacion extends Component {
  
  constructor(props){
    super(props);
    this.state ={
      Usuario: this.props.usuario
    }
  }
  
  render() {
    const {Usuario} = this.state;
    return (
      <Navbar bg="light" expand="md" style={{width:'100%'}}>
        <Navbar.Brand href="" >
        <Image className="imgSmall"  src={logoIth} roundedCircle />
        </Navbar.Brand>
        <span className="textMenuTitulo">Sistema Gestor ITH</span>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {Usuario === 'Admin' ? 
              adminInfo.map((list) => (<Link to={list.url} className="textMenu mr-4 barrita"> {list.name}</Link>))
              :
              Usuario === 'Tecnico' 
              ? 
              tecnicoInfo.map(list =>  (<Link to={list.url} className="textMenu mr-4 barrita"> {list.name}</Link>))
              :
              null
            }
          </Nav>
          
          <Button variant="outline-danger" size="lg" >Salir</Button>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
