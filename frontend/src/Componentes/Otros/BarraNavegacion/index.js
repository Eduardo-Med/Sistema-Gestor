import React, { Component } from "react";
import { Navbar, Nav, Image, Button } from "react-bootstrap";
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
      <Navbar bg="light" expand="sm" style={{width:'100%'}}>
        <Navbar.Brand href="">
        <Image className="imgSmall"  src={logoIth} roundedCircle />
          Sistema Gestor ITH
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {Usuario === 'Admin' ? 
              adminInfo.map(list => (<Nav.Link href={list.url}>{list.name}</Nav.Link>))
              :
              Usuario === 'Tecnico' 
              ? 
              tecnicoInfo.map(list => (<Nav.Link href={list.url}>{list.name}</Nav.Link>))
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
