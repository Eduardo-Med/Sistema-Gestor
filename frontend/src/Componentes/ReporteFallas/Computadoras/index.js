import React, { useState,useEffect} from 'react';
import { Table, Button, Container,Form,Row,Col } from "react-bootstrap";
import { useTable, useSortBy  } from 'react-table'
import swal from 'sweetalert';

import { obtenerReportes,obtenerReportesPorSalon, eliminarReporte } from '../../../api/reporte'
import { obtenerSalones } from '../../../api/salon'
import VentaConfirmacionReporte from '../../Otros/VentanaConfirmacionReporte'
import {accessControlAdminAndTecnico} from '../../../helpers/accessControlAdmin'
import Detalles from "./../Detalles/"



function Computadora (){
  var [modalShow, setModalShow] = useState(false)
  var [isLoading, setIsLoading] = useState(true)
  var [reportes, setReportes] = useState([])
  var [salones, setSalones] = useState();
  var [reportesAuxiliares, setReportesAuxiliares] = useState()
  var [indexReporte, setIndexReporte] = useState(0)

  const columns = React.useMemo(
    () => [
      {
        Header: "Equipo",
        accessor: 'Equipo',
      },
      { 
        Header: "Aula",
        accessor: 'Salon',
      },
      {
        Header: "Quien Reporta",
        accessor: 'nombre',
      },
      {
        Header: "Estado",
        accessor: 'estado',
      },
      {
        // Make an expander cell
        Header: "Detalles", // No header
        id: 'expander', // It needs an ID
        Cell:({row}) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <div>
          <Button onClick={()=>mostrarModal(row.index)} size="sm"  block variant="info">Información</Button>
          <Button onClick={()=>setIndexReporte(row.index)}data-toggle="modal" data-target=".bd-example-modal-sm" size="sm"  block variant="danger">Eliminar</Button> 
          </div>
        ) 

      },
    ],
    []
  )
  const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow,} = useTable({  columns,  data: reportes,},useSortBy)
  const firstPageRows = rows.slice(0, 2000)

  useEffect(() => {
    async function cargarReportesySalones(){
      const responseReportes = await obtenerReportes();
      const responseSalones = await obtenerSalones();
      if(responseReportes.status === 200){
        setReportes(responseReportes.data.reportes)
        setReportesAuxiliares(responseReportes.data.reportes)
        setIsLoading(false)
      }
      if(responseSalones.status === 200){
        setSalones(responseSalones.data.salones)
        setIsLoading(false)
      }
    }
    cargarReportesySalones();
  }, [])


  const handleInputChange = async (event) => {
    setIsLoading(true)
    if(event.target.value === "Ver Todos"){
      setReportes(reportesAuxiliares)
    }else{
      const response = await obtenerReportesPorSalon(event.target.value);
      setReportes(response.data.reportes)
    }
      setIsLoading(false)
  }


  const elminacionDeReporte=async(id)=>{
    swal("Eliminando reporte","Porfavor espere un momento","info")
    await eliminarReporte(id)
    window.location.reload(false)
  }
  

  const mostrarModal = (index) =>{
    setIndexReporte(index)
    setModalShow(!modalShow)
  }



  function renderReportes(){
    if(!isLoading && reportes){
      return (
      <Table {...getTableProps()} striped bordered hover className="mb-5">
        <thead>
          {headerGroups.map(headerGroup =>(
            <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              // Add the sorting props to control sorting. For this example
              // we can add them into the header props
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                {/* Add a sort direction indicator */}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
          ))}  
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </Table>
      )
    }else{
      return <div>Cargando....</div>
    }
  }


  function renderSalones(){
    if(salones){
      return(
        <Form.Control as="select" name="Salon" onChange={handleInputChange} custom >
        <option>Ver Todos</option>
        {salones.map((salon,index) =>(
          <option key={index}>{salon.Nombre}</option>
        ))}
      </Form.Control>
      )
    }else{
      return <div></div>
    }
  }


    return (
      <Container>
      <h1>Lista de reportes</h1>
      <Row className="justify-content-left pt-3">
        <h4>
          <Form.Label xs="12" className="text-center ml-3">
            Seleccione Salon
          </Form.Label>
        </h4>
        <Col xs="12">
          {renderSalones()}
        </Col>
      </Row>
      {renderReportes()}
      {
        !reportes ? <Detalles show={modalShow} onHide={mostrarModal} /> : <Detalles show={modalShow} onHide={mostrarModal} reporte={reportes[indexReporte]}/>
      }
      {!reportes ? <VentaConfirmacionReporte />:<VentaConfirmacionReporte eliminar={elminacionDeReporte} reporteId={reportes[indexReporte]}/>}
    </Container>
    );
}


export default accessControlAdminAndTecnico(Computadora);