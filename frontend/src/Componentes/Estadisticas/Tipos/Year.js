import React, {useState, useEffect} from 'react';
import {getStadisticYear, getOldestYear} from '../../../api/stadistic';
import {VerticalGridLines, HorizontalGridLines, XAxis, YAxis,
    VerticalBarSeriesCanvas, XYPlot} from 'react-vis';
  

const Year = () => {
  const [primerYear, setPrimerYear] = useState([]);
  const [yearSelected, setYearSelected] = useState("Default");
  const [semestreSelected, setSemestreSelected] = useState("Default");
  const [data, setData] = useState();
  
  const [tituloEstadistica, setTituloEstadistica] = useState("");
  
  const handleInputChange = (event) => {
    event.persist();
    setYearSelected(event.target.value);
  }

  const semestreSelect = sem => {
    setSemestreSelected(sem);
  }
  
  useEffect(() => {
      estadisticaPrimerYear();
  }, []);
  
  async function estadisticaPrimerYear() {
    const response = await getOldestYear()
    if (response.status === 200) {
      setPrimerYear(response.data.estadistica);
    }
    else
      console.log(response)
  }

  async function estadisticaPorYear() {
    if(yearSelected === "Default" || semestreSelected === "Default")
    {
      alert('Debe elegir un Año y un Semestre, antes de obtener la estadística.')
    }
    else
    {
      setTituloEstadistica('Fallas en '+yearSelected+'-'+semestreSelected);
      const response = await getStadisticYear(yearSelected)
      if (response.status === 200) {
        if(semestreSelected === 'I'){
          setData ([
            {x: 'Enero', y: response.data.estadistica[0].Enero},
            {x: 'Febrero', y: response.data.estadistica[0].Febrero},
            {x: 'Marzo', y: response.data.estadistica[0].Marzo},
            {x: 'Abril', y: response.data.estadistica[0].Abril},
            {x: 'Mayo', y: response.data.estadistica[0].Mayo},
            {x: 'Junio', y: response.data.estadistica[0].Junio},
          ]);
        }
        else{
          setData ([
            {x: 'Julio', y: response.data.estadistica[0].Julio},
            {x: 'Agosto', y: response.data.estadistica[0].Agosto},
            {x: 'Septiembre', y: response.data.estadistica[0].Septiembre},
            {x: 'Octubre', y: response.data.estadistica[0].Octubre},
            {x: 'Noviembre', y: response.data.estadistica[0].Noviembre},
            {x: 'Diciembre', y: response.data.estadistica[0].Diciembre},
          ]);
          
        }
      }
      else
        console.log(response)
    }    
  };

const opcionesYear = () => {
    const element = primerYear.map((years,index) =>(
      <option value={years.Year}>{years.Year}</option>
    ))
    return element;
}

  return (
    <div className="m-3">
      <content className=' row'>
        <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-2'>
          <label>Año </label>
          <select className="form-control" onChange={handleInputChange}>
            <option value="Default">Opciones</option>
            {opcionesYear()}
          </select>
        </div>
        <div className='col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2 mt-5'>
          <label>Semestre I 
            <input type='radio' className="form-control" name="semestre"onClick={()=> {semestreSelect('I')} } value='I'/>
          </label>
        </div>
        <div className='col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2 mt-5'>
          <label>Semestre II 
            <input type='radio' className="form-control" name="semestre" onClick={()=> {semestreSelect('II')}} value='II'/>
          </label>
          
        </div>
        <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-5'>
          <input type='button' className="form-control text-white bg-success " onClick={()=> {estadisticaPorYear()}} value='Aceptar'/>
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
            />
            <XAxis />
            <YAxis />
          </XYPlot>
        </div>
      </content>
      </div>
  );
}
export default Year;