import React, {useState, useEffect} from 'react';
import {getEquipo, getOldestYear} from '../../../api/stadistic';
import {obtenerSalones} from "../../../api/salon"
import { VerticalGridLines, HorizontalGridLines, XAxis, YAxis,
    VerticalBarSeriesCanvas, XYPlot} from 'react-vis';
  

const PorEquipo = () => {  
  const [primerYear, setPrimerYear] = useState([]);
  const [yearSelected, setYearSelected] = useState("Default");
  const [semestreSelected, setSemestreSelected] = useState("Default");
  const [salones, setSalones] = useState([])
  const [aulaSelected, setAulaSelected] = useState("Default");
  const [equipoSelected, setEquipoSelected] = useState("Default");
  const [data, setData] = useState();

  const [tituloEstadistica, setTituloEstadistica] = useState("");

  useEffect(() => {
    const cargarSalones =async()=>{
      const response = await obtenerSalones()
      if(response.status === 200){
        setSalones(response.data.salones)
      }
    }
    cargarSalones();
    estadisticaPrimerYear();
  }, []);
  
  const handleInputChangeYear = (event) => {
    event.persist();
    setYearSelected(event.target.value);
  }

  const handleInputChange = (event) => {
    event.persist();
    setAulaSelected(event.target.value);
  }

  const handleInputChangeEquipo = (event) => {
    event.persist();
    setEquipoSelected(event.target.value);
  }

  const semestreSelect = sem => {
    setSemestreSelected(sem);
  }
  
  async function estadisticaPrimerYear() {
    const response = await getOldestYear()
    if (response.status === 200) {
      setPrimerYear(response.data.estadistica);
    }
    else
      console.log(response)
  };
  
  const renderSalones =()=>{
    const element = salones.map(salon => (
      <option value={salon.Nombre}>{salon.Nombre}</option>
    ))
    return (element);
  }

  const opcionesYear = () => {
    const element = primerYear.map((years,index) =>(
      <option value={years.Year}>{years.Year}</option>
    ))
    return element;
}

  const opcionesEquipo = () => {
    const element = [];
    if(aulaSelected !== "Default")
    {
      for (let i= 1; i <= 50; i++) {
        if(i < 10)
          element.push(<option value={`${aulaSelected}E0${i}`}>{`${aulaSelected}E0${i}`}</option>)
        else
          element.push(<option value={`${aulaSelected}E${i}`}>{`${aulaSelected}E${i}`}</option>)
      }
    }
    return(
      element    
    );  
  } 

  async function estadisticaEquipo() {
    if(
      yearSelected === "Default" || semestreSelected === "Default" || 
      aulaSelected === "Default" || equipoSelected === "Default")
    {
      alert('Debe elegir un Año, un Semestre, un Salón y un Equipo, antes de obtener la estadística.')
    }
    else
    {
      setTituloEstadistica(`Fallas en ${yearSelected}-${semestreSelected} en ${equipoSelected}`);
      const response = await getEquipo(equipoSelected, semestreSelected, yearSelected)
      if (response.status === 200) {
        setData ([
            {x: 'CPU', y: response.data.estadistica[0].CPU},
            {x: 'Monitor', y: response.data.estadistica[0].Monitor},
            {x: 'Teclado', y: response.data.estadistica[0].Teclado},
            {x: 'Mouse', y: response.data.estadistica[0].Mouse},
            {x: 'Red', y: response.data.estadistica[0].Red},
            {x: 'Cable Energia', y: response.data.estadistica[0]["Cable Energia"]},
            {x: 'Cable VGA/HDMI', y: response.data.estadistica[0]["Cable VGA/HDMI"]},
            {x: 'Cañón', y: response.data.estadistica[0].Cañón},
            {x: 'Otro', y: response.data.estadistica[0].Otro}
          ]);
      }
      else
        console.log(response)
    }
  };

  return (
    <div className="m-3">
      <content className=' row'>
      <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 mt-2'>
          <label>Año </label>
          <select className="form-control" onChange={handleInputChangeYear}>
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
        <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 mt-2'>
          <label>Salón </label>
          <select className="form-control" onChange={handleInputChange}>
            <option value="Default">Opciones</option>
            {renderSalones()}
          </select>
        </div>
        <div className='col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 mt-2'>
          <label>Salón </label>
          <select className="form-control" onChange={handleInputChangeEquipo}>
            <option value="Default">Opciones</option>
            {opcionesEquipo()}
          </select>
        </div>
        
        <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 mt-5'>
          <input type='button' className="form-control text-white bg-success " onClick={()=> estadisticaEquipo()} value='Aceptar'/>
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
              color = "#fcf51e"
            />
            <XAxis />
            <YAxis />
          </XYPlot>
        </div>
      </content>
      </div>
  );
}
export default PorEquipo;