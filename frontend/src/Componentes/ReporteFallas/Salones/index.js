import React, { useState,useEffect } from "react";
import { Container, Row, Col,Table,Button } from "react-bootstrap";
import "./styles.css";
import {obtenerSalones,agregarSalon,eliminarSalon} from '../../../api/salon'
import swal from 'sweetalert';

function Salones(){
  const [isLoading, setIsLoading] = useState(true)
  const [salones, setSalones] = useState([])



  useEffect(() => {
    const cargarSalones= async()=>{
      const response = await obtenerSalones()
      if(response.status === 200){
          setSalones(response.data.salones)
          setIsLoading(false)
      }
    }

    cargarSalones()
  }, [])


  const nuevoSalon = ()=>{
    var special = new RegExp("^(?=.*[!@#$&*.<>%/()¿?¡])");

    swal({
      text: 'Poner el nombre del salon.',
      content: "input",
      button: {
        text: "Agregar",
        closeModal: false,
      },

    }).then(async (value)=>{
      if( value !== null && value !== ""){
        if(!special.test(value)){
          if(value.length > 4){
            swal("Campo Demasiado Grande", "Intentelo de nuevo", "error");
          }else{
            const result = await agregarSalon(value)
            if(result.status === 200 ){
              swal("Salon Agregado Correctamente!", "Espere un momento porfavor", "success");
              window.location.reload(false)
            }else{
              swal("A ocurrido un error!", "Intentelo de nuevo mas tarde", "error");
            }
          }
        }else{
          swal("No Se Permiten Caracteres Especiales!", "Intentelo de nuevo mas tarde", "error");
        }
      }else{
        swal("Campo vacio", "Intentelo de nuevo", "error");
      }
    }
    )
  }


  const eliminacionSalon = (id) =>{
    swal({
      title: "¿Estas Seguro?",
      text: `Se va a eliminar el salon: ${id}`,
      icon: "warning",
      buttons: {cancelar: {text: "Cancelar", value:"Cancelar"}, aceptar: {text: "Eliminar", value: "Eliminar",className: "btn-danger"} },
      dangerMode: true,
    })
    .then(async(value) => {
      if (value === "Eliminar") {
        const result = await eliminarSalon(id)
        if(result.status === 200){
          swal("Salon Eliminado Correctamente!", "Espere un momento porfavor", "success");
          window.location.reload(false)
        }else{
          swal("A ocurrido un error!", "Intentelo de nuevo mas tarde", "error");
        }
      } 
    });
  }

  const renderSalones=()=>{
    if(!isLoading){
      return(
        <div className="tamanoTabla">
        <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Salon</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {
            salones.map((salon,index) =>(
              <tr key={index}>
                <td style={{width:"20px"}}>{index + 1}</td>
                <td>{salon.Nombre}</td>
                <td style={{width:"20px"}}><Button type="button" variant="danger" size="sm" onClick={()=>eliminacionSalon(salon.Nombre)}>Borrar</Button></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      </div>
      )
    }

    return <div>...Cargando</div>
 
  }
    return (
      <Container fluid >
          <Row>
            <Col className="text-center mt-5" xs={12}>
                <h1  >Lista De Salones<i class="iconoColor fas fa-plus-circle ml-3" onClick={()=>nuevoSalon()}></i></h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
                {renderSalones()}
            </Col>
          </Row>
      </Container>
    );
}


export default Salones