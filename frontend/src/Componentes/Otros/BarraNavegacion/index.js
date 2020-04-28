import React, { Component } from "react";
import { Navbar, Nav, Image, Button } from "react-bootstrap";
import {Link} from 'react-router-dom'
import {adminInfo, todainfo} from './BNAdmin/Admin-Info'
import {tecnicoInfo} from './BNTecnico/Tecnico-Info'
import { useCookies } from 'react-cookie';
import logoIth from './../../../Imagenes/logoith.png'
import './styles.css'

function BarraNavegacion ({usuario}) {
  const [, , removeCookie] = useCookies(['cookie-name']);
  
  function salir(){
    removeCookie('token', {path: '/'});
    removeCookie('userId', {path: '/'});
    removeCookie('tipoUsuario', {path: '/'});
    window.location.href = "http://localhost:3000/Login"
  }


    return (
      <Navbar bg="light" expand="md" style={{width:'100%'}}>
        <Navbar.Brand href="" >
        <Image className="imgSmall"  src={logoIth} roundedCircle />
        </Navbar.Brand>
        <span className="textMenuTitulo">Sistema Gestor ITH</span>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {usuario === 'Admin' ? 
              adminInfo.map((list) => (<Link to={list.url} className="textMenu mr-4 barrita"> {list.name}</Link>))
              :
              usuario === 'Tecnico' 
              ? 
              tecnicoInfo.map(list =>  (<Link to={list.url} className="textMenu mr-4 barrita"> {list.name}</Link>))
              :
              todainfo.map(list =>  (<Link to={list.url} className="textMenu mr-4 barrita"> {list.name}</Link>))
            }
          </Nav>
          
          <Button variant="outline-danger" size="lg" onClick={()=>salir()} >Salir</Button>
        </Navbar.Collapse>
      </Navbar>
    );
}

export default BarraNavegacion;