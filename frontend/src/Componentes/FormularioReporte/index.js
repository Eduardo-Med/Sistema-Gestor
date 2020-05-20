import React, {useEffect,useState} from "react";
import { Container, Row, Col, Form,Button } from "react-bootstrap";
import swal from 'sweetalert';
import { useCookies } from "react-cookie";
import {useForm} from "react-hook-form";

import "./styles.css";
import { computadoraInfo } from "./../ReporteFallas/Computadoras/Computadoras-info";
import {agregarReporte} from "../../api/reporte"
import {obtenerSalones} from "../../api/salon"
import {accessControlCualquiera} from '../../helpers/accessControlCualquiera'


function FormularioReporte(){
  const [cookies] = useCookies(["cookie-name"]);
  const {register, handleSubmit,errors} = useForm({mode: "onChange"})
  const [salones, setSalones] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [datosForm, setDatosForm] = useState({Salon: "B21"});

  useEffect(() => {
    const cargarSalones =async()=>{
      const response = await obtenerSalones()

      if(response.status === 200){
        setSalones(response.data.salones)
        setIsLoading(false)
      }
    }

    cargarSalones()

  }, [])


  const onSubmit = async (data)=>{
    data={...data,idUsuario:cookies.userId}
    const respuesta = await agregarReporte(data);
    if(respuesta.status === 200 ){
      swal("Reporte Enviado Correctamente","Presiona el boton para salir", "success");
      window.location.reload(false)
      data={}
    }else{
      swal("A ocurrido un error intentelo de nuevo mas tarde","error")
    }
  }

  const handleInputChange = (event) => {
    event.persist();
    setDatosForm({...datosForm, [event.target.name]: event.target.value});
}


  const renderSalones =()=>{
    if(!isLoading){
      return (<Form.Control as="select" name="Salon" ref={register({value:false})} custom onChange={handleInputChange}>
      {salones.map(salon => (
        <option>{salon.Nombre}</option>
      ))}
      </Form.Control>
      )
    }else{
      return (<Form.Control as="select" name="Salon" custom >
        <option>....Cargando</option>

      </Form.Control>
      )
    }
  
  }



    return (
      <Container fluid className="FormularioReporte m-5 p-4">
        <h1 onClick={()=>console.log(datosForm)} style={{ textAlign: "center", paddingBottom: 50 }}>
          Reporte De Falla
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xs="12" md="6">
              <Container className="labelTexto">
                <Row className="justify-content-center">
                  <Form.Label xs="12" className="text-center">
                    Aula
                  </Form.Label>
                  <Col xs="12">
                      {renderSalones()}
                  </Col>
                </Row>
                <Row className="justify-content-center">
                <Form.Label xs="12">
                    Equipo
                  </Form.Label>
                  <Col xs="12">
                    <Form.Control as="select" name="Equipo" ref={register({value:false})} custom>
                      {computadoraInfo.map((computadora, index) => (
                        <option>{`${datosForm.Salon}${computadora.numeroComputador}${index +
                          1}`}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Form.Label xs="12">
                    Nombre
                  </Form.Label>
                  <Col xs="12" >
                    <Form.Control type="text" name="nombre" ref={register({value:false})} placeholder="¿Quien reporta?" />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  {!errors.descripcion ? 
                  <Form.Label xs="12">
                    Descripción
                  </Form.Label>
                  :
                  <Form.Label className="text-danger" xs="12">
                    {errors.descripcion.message}
                  </Form.Label>
                  }
                  <Col xs="12">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      name="descripcion" 
                      ref={register({required: {value:true,message:'Este campo es obligatorio'}})}
                      placeholder="Descripcion De La Falla"
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                {!errors.accion ? 
                  <Form.Label xs="12">
                    Accion
                  </Form.Label>
                  :
                  <Form.Label className="text-danger" xs="12">
                    {errors.accion.message}
                  </Form.Label>
                  }
                  <Col xs="12">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      ref={register({required: {value:true,message:'Este campo es obligatorio'}})}
                      name="accion" 
                      placeholder="Acción Tomada"
                    />
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col xs="12" md="6" className="mb">
              <h3>Problema con: </h3>
              <Container>
                <Row>
                  <Col>
                  <div>
                    <Form.Check
                      ref={register({value:false})}
                      name="cpu"
                      custom
                      inline
                      label="CPU"
                      type="checkbox"
                      id="1"
                    />
                  </div>
                  <div>
                    <Form.Check
                      ref={register({value:false})}
                      name="monitor"
                      custom
                      inline
                      label="MONITOR"
                      type="checkbox"
                      id="2"
                    />
                  </div>
                  <div>
                    <Form.Check
                      ref={register({value:false})}
                      name="teclado"
                      custom
                      inline
                      label="TECLADO"
                      type="checkbox"
                      id="3"
                    />
                  </div>
                  <div>
                    <Form.Check
                      ref={register({value:false})}
                      name="mouse"
                      custom
                      inline
                      label="MOUSE"
                      type="checkbox"
                      id="4"
                    />
                  </div>
                  </Col>
                  <Col xs="12" md="6" className="mb">
                    <div>
                      <Form.Check
                        ref={register({value:false})}
                        name="red"
                        custom
                        inline
                        label="RED"
                        type="checkbox"
                        id="6"
                      />
                    </div>
                    <div>
                      <Form.Check
                        ref={register({value:false})}
                        name="cableEnergia"
                        custom
                        inline
                        label="CABLE ENERGIA"
                        type="checkbox"
                        id="7"
                      />
                    </div>
                    <div>
                      <Form.Check
                        ref={register({value:false})}
                        name="cableVgaHdmi"
                        custom
                        inline
                        label="CABLE VGA/HDMI"
                        type="checkbox"
                        id="8"
                      />
                    </div>
                    <div>
                      <Form.Check
                        ref={register({value:false})}
                        name="canon"
                        custom
                        inline
                        label="CAÑON"
                        type="checkbox"
                        id="9"
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-5 align-items-end" >
                  <Button type="submit" variant="outline-primary" size="lg">Enviar</Button>               
                </Row>
              </Container>
            </Col>
          </Row>
        </Form>
      </Container>
    );
}


export default accessControlCualquiera(FormularioReporte)
