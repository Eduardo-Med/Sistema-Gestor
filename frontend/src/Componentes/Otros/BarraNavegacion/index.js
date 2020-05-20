import React from "react";
import { Navbar, Nav, Image, Button } from "react-bootstrap";
import {Link} from 'react-router-dom'
import {adminInfo} from './BNAdmin/Admin-Info'
import {tecnico, reportador} from './BNTecnico/Tecnico-Info'
import { useCookies } from 'react-cookie';
import logoIth from './../../../Imagenes/logoith.png'
import './styles.css'

function BarraNavegacion ({usuario}) {
  const [cookies, , removeCookie] = useCookies(['cookie-name']);
  
  function salir(){
    removeCookie('token', {path: '/'});
    removeCookie('userId', {path: '/'});
    removeCookie('tipoUsuario', {path: '/'});
    window.location.href = "http://localhost:3000/Login"
  }

  const renderOpciones= (tipo)=>{
    if(tipo === "1"){
      return adminInfo.map((list) => (<Link to={list.url} className="textMenu mr-4 barrita"> {list.name}</Link>))
    }else if(tipo === "2"){
      return tecnico.map(list =>  (<Link to={list.url} className="textMenu mr-4 barrita"> {list.name}</Link>))
    }else if(tipo === "3"){
      return
    }else{ reportador.map(list =>  (<Link to={list.url} className="textMenu mr-4 barrita"> {list.name}</Link>))
      return null
    }
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
            {renderOpciones(cookies.tipoUsuario)}
          </Nav>
          
          <Button variant="outline-danger" size="lg" onClick={()=>salir()} >Salir</Button>
        </Navbar.Collapse>
      </Navbar>
    );
}

export default BarraNavegacion;