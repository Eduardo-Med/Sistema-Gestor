import React, {useState,useEffect} from "react";
import "./styles.css";
import { Modal, Button, Container, Row, Col, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import { actualizarReporte } from "../../../api/reporte";
import { enviarCorreo } from "../../../api/correo";


function Detalles ({ show, onHide,reporte }){
  const {register, handleSubmit} = useForm({mode: "onChange"})
  const [valorProblemas, setValorProblemas] = useState({})
  const [isLoading, setIsLoadging] = useState(false)
  const [datosForm, setDatosForm] = useState({descripcion: "dasda", accion:""});
 

  useEffect(() => {
    if(reporte){
      setValorProblemas({
        cpu: reporte.cpu,
        monitor: reporte.monitor,
        teclado: reporte.teclado,
        mouse: reporte.mouse,
        red: reporte.red,
        cableEnergia: reporte.cableEnergia,
        cableVgaHdmi: reporte.cableVgaHdmi,
        canon: reporte.canon,
      })

      setDatosForm({
        descripcion: reporte.descripcion,
        accion: reporte.accion
      })
    }
  }, [reporte])


  async function onSubmit(data){
    setIsLoadging(true)
    data = {...data, idReporte: reporte.idReporte, Salon: reporte.Salon,Equipo: reporte.Equipo,idUsuario: reporte.idUsuario, email:reporte.email}
    console.log(data)
    await actualizarReporte(data)
    if(data.estado === "Resuelto Y Respondido"){
      if(reporte.email !== "admin"){
        enviarCorreo(data)
      }
    }
    window.location.reload(false)
  }

  const renderBoton=()=>{
      if(!isLoading){
          return(
          <Button type="submit" variant="success" >
            Confirmar Cambios
          </Button>
          )
      }else{
          return (
            <div class="alert alert-primary" role="alert">
                Enviando Informacion espere un momento
            </div>
          )
      }
  }

  const handleInputChange = (event) => {
    event.persist();
    setDatosForm({...datosForm, [event.target.name]: event.target.value});
  }

  const renderModal =()=>{
    return(
      !reporte ? <div></div> :
      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton onClick={onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            Reporte del equipo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col>
                      <h5>Fecha: {reporte.fecha.substring(0, 10)}</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h5>Equipo: {reporte.Equipo}</h5>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col>
                <h5>Hora: {reporte.hora.substring(11, 16)}</h5>
              </Col>
              <Col>
                <h5>Aula: {reporte.Salon}</h5>
              </Col>
            </Row>
            <Row xs={4} className="mt-5 justify-content-md-center">
              <Col>
                <h5>Reportador: {reporte.nombre}</h5>
              </Col>
              <Col>
                <h5 className="float-left">Estado del reporte: </h5>
                <Form.Control name="estado" ref={register({value:false})} className="w-50" as="select" custom>
                  <option>Pendiente</option>
                  <option>Revisado Pero Pendiente</option>
                  <option>Resuelto</option>
                  <option>Resuelto Y Respondido</option>
                </Form.Control>
              </Col>
            </Row>
            <Row className="mt-5 ml-5">
              <h6>Problema con: </h6>
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
                  onClick={()=>setValorProblemas({...valorProblemas, cpu: !valorProblemas.cpu})}
                  checked={valorProblemas.cpu}
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
                  onClick={()=>setValorProblemas({...valorProblemas, monitor: !valorProblemas.monitor})}
                  checked={valorProblemas.monitor}
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
                  onClick={()=>setValorProblemas({...valorProblemas, teclado: !valorProblemas.teclado})}
                  checked={valorProblemas.teclado}
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
                  onClick={()=>setValorProblemas({...valorProblemas, mouse: !valorProblemas.mouse})}
                  checked={valorProblemas.mouse}
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
                  onClick={()=>setValorProblemas({...valorProblemas, red: !valorProblemas.red})}
                  checked={valorProblemas.red}
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
                  onClick={()=>setValorProblemas({...valorProblemas, cableEnergia: !valorProblemas.cableEnergia})}
                  checked={valorProblemas.cableEnergia}
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
                  onClick={()=>setValorProblemas({...valorProblemas, cableVgaHdmi: !valorProblemas.cableVgaHdmi})}
                  checked={valorProblemas.cableVgaHdmi}
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
                  onClick={()=>setValorProblemas({...valorProblemas, canon: !valorProblemas.canon})}
                  checked={valorProblemas.canon}
                />
              </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                 <h5>Descripcion de la falla:</h5> 
                 <Col xs="12">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      name="descripcion" 
                      ref={register({value:false})}
                      placeholder="Descripcion De La Falla"
                      value={datosForm.descripcion}
                      onChange={handleInputChange}
                    />
                  </Col>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                  <h5>Accion Tomada:</h5> 
                  <Col xs="12">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      ref={register({value:false})}
                      name="accion" 
                      placeholder="Acción Tomada"
                      value={datosForm.accion}
                      onChange={handleInputChange}
                    />
                  </Col>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {renderBoton()}
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    )
  }
  return (
    <div>
       {renderModal()}
    </div> 
       
  )

}
 
export default Detalles;
