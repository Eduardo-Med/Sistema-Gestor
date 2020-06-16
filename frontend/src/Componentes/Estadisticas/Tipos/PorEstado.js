import React, {useState} from 'react';
import {getStadisticEstado} from '../../../api/stadistic';
import {VerticalGridLines, HorizontalGridLines, XAxis, YAxis,
    VerticalBarSeriesCanvas, XYPlot} from 'react-vis';
  

const PorEstado = () => {
  const [desde, setDesde] = useState("Default");
  const [hasta, setHasta] = useState("Default");
  const [data, setData] = useState();

  const [tituloEstadistica, setTituloEstadistica] = useState("");

  const handleInputChangeDesde = (event) => {
    event.persist();
    if(event.target.value <= hasta || hasta === "Default")
      setDesde(event.target.value);
    else
    {
      alert(`La fecha "Desde:" debe ser menor o igual a la fecha "Hasta:"`);
      setDesde(hasta);
    } 
  }

  const handleInputChangeHasta = (event) => {
    event.persist();
    if(event.target.value >= desde || desde === "Default")
      setHasta(event.target.value);
    else
    {
      alert(`La fecha "Hasta:" debe ser mayor o igual a la fecha "Desde:"`);
      setHasta(desde);
    } 
  }
  
  async function estadisticaPorEstado() {
    if(
      hasta === "Default" || desde === "Default")
    {
      alert('Debe elegir un fecha Desde y Hasta, antes de obtener la estadística.')
    }
    else
    {
      setTituloEstadistica(`Estados de Reportes`);
      const response = await getStadisticEstado(desde, hasta)
      if (response.status === 200) {
          setData ([
              {x: 'Pendiente', y: response.data.estadistica[0].Pendiente},
              {x: 'Revisado/Pendiente', y: response.data.estadistica[0]["Revisado/Pendiente"]},
              {x: 'Resuelto', y: response.data.estadistica[0].Resuelto},
              {x: 'Resuelto/Respondido', y: response.data.estadistica[0]["Resuelto/Respondido"]}
          ]);
      }
      else
        console.log(response)
    }
  }

  return (
    <div className="m-3">
      <content className=' row'>
        <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-2'>
          <label>Desde: </label>
          <input type="date" className="form-control" onChange={handleInputChangeDesde} value={desde}></input>
        </div>
        <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-2'>
          <label>Hasta: </label>
          <input type="date" className="form-control" onChange={handleInputChangeHasta} value={hasta}></input>
        </div>
        
        <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-5'>
          <input type='button' className="form-control text-white bg-success " onClick={()=> {estadisticaPorEstado()}} value='Aceptar'/>
        </div>  
        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4 scrolling'>
        <h2>{tituloEstadistica}</h2>
          <XYPlot xType="ordinal" height={300} width={1000} xDistance={100}>
            
            <VerticalGridLines />
            <HorizontalGridLines />
            
            <VerticalBarSeriesCanvas
              cluster='2020'
              barWidth={0.5}
              data = {data}
              color = "#a84032"
            />
            <XAxis />
            <YAxis />
          </XYPlot>
        </div>
      </content>
      </div>
  );
}
export default PorEstado;