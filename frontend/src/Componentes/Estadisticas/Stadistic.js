import React, {useState, useEffect} from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import Year from './Tipos/Year';
import Frecuente from './Tipos/Frecuente';
import AtenPorMes from './Tipos/AtenPorMes';
import PorAula from './Tipos/PorAula';
import PorEquipo from './Tipos/PorEquipo';
import PorPersona from './Tipos/PorPersona';
import {accessControlAdmin} from '../../helpers/accessControlAdmin'
import './style.css';

const Stadistic = () => {
  return (
    <div className="m-3">
      <header>
        <h1>Estadísticas</h1>
      </header>
      <content className=' row'>
        <div className='col-11 col-sm-11   col-md-11 col-lg-11 col-xl-11 mt-4'>
          <Tabs defaultActiveKey="year" id="uncontrolled-tab-example">
            <Tab eventKey="year" title="Fallas Por Año">
              <Year/>
            </Tab>
            <Tab eventKey="fPersona" title="Fallas Por Persona">
              <PorPersona/>
            </Tab>
            <Tab eventKey="frecuente" title="Fallas Frecuentes">
              <Frecuente/>
            </Tab>
            <Tab eventKey="fAtend" title="Fallas Atendidas">
              <AtenPorMes/>
            </Tab>
            <Tab eventKey="fPorAula" title="Fallas Por Aula">
              <PorAula/>
            </Tab>
            <Tab eventKey="fPorEquipo" title="Fallas Por Equipo">
              <PorEquipo/>
            </Tab>
          </Tabs>
        </div>
        
      </content>
      </div>
  );
}

export default accessControlAdmin(Stadistic);
