import React, {useState, useEffect} from 'react';
import {getStadisticEstado} from '../../../api/stadistic';
import {VerticalGridLines, HorizontalGridLines, XAxis, YAxis,
    VerticalBarSeriesCanvas, XYPlot} from 'react-vis';
  

const PorEstado = () => {
  const [desde, setDesde] = useState();
  const [hasta, setHasta] = useState();
  const [data, setData] = useState();
  
  const handleInputChangeDesde = (event) => {
    event.persist();
    setDesde(event.target.value);
  }

  const handleInputChangeHasta = (event) => {
    event.persist();
    setHasta(event.target.value);
  }

  
  useEffect(() => {

    }, []);
  
  async function estadisticaPorEstado() {
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
};

  return (
    <div className="m-3">
      <content className=' row'>
        <div className='col-11 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-2'>
          <label>Desde: </label>
          <input type="date" className="form-control" onChange={handleInputChangeDesde}></input>
        </div>
        <div className='col-11 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-2'>
          <label>Hasta: </label>
          <input type="date" className="form-control" onChange={handleInputChangeHasta}></input>
        </div>
        
        <div className='col-11 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-5'>
          <input type='button' className="form-control text-white bg-success " onClick={()=> {estadisticaPorEstado()}} value='Aceptar'/>
        </div>  
        <div className='col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 mt-4'>
          <h2>Reportes </h2>
          <XYPlot xType="ordinal" height={300} width={1000} xDistance={100}>
            
            <VerticalGridLines />
            <HorizontalGridLines />
            
            <VerticalBarSeriesCanvas
              cluster='2020'
              barWidth={0.5}
              data = {data}
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