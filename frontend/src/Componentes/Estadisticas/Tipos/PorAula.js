import React, {useState, useEffect} from 'react';
import {getSalones, getOldestYear} from '../../../api/stadistic';
import {obtenerSalones} from "../../../api/salon"
import {VerticalGridLines, HorizontalGridLines, XAxis, YAxis,
    VerticalBarSeriesCanvas, XYPlot} from 'react-vis';
  

const PorAula = () => {
  const year = new Date().getFullYear();
  const [primerYear, setPrimerYear] = useState(new Date().getFullYear());
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
  const [semestreSelected, setSemestreSelected] = useState('I');
  const [salones, setSalones] = useState([])
  const [aulaSelected, setAulaSelected] = useState('B21');

  const [data, setData] = useState([
    {x: 'CPU', y: 0},
    {x: 'Monitor', y: 0},
    {x: 'Teclado', y: 0},
    {x: 'Mouse', y: 0},
    {x: 'Red', y: 0},
    {x: 'Cable Energia', y: 0},
    {x: 'Cable VGA/HDMI', y: 0},
    {x: 'Cañón', y: 0}
  ]);
  
  useEffect(() => {
    const cargarSalones =async()=>{
      const response = await obtenerSalones()
      if(response.status === 200){
        setSalones(response.data.salones)
      }
    }
    cargarSalones()
    estadisticaSalones();
    estadisticaPrimerYear();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChangeYear = (event) => {
    event.persist();
    setYearSelected(event.target.value);
  }

  const handleInputChange = (event) => {
    event.persist();
    setAulaSelected(event.target.value);
  }
  const semestreSelect = sem => {
    setSemestreSelected(sem);
  }
  
  async function estadisticaPrimerYear() {
    const response = await getOldestYear()
    if (response.status === 200) {
      setPrimerYear(response.data.estadistica[0].Year);
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
    const element = [];
    for (let i= primerYear; i <= year; i++) {
      element.push(<option value={i}>{i}</option>)
    }
    return(
      element    
    );  
  }
  async function estadisticaSalones() {
    const response = await getSalones(aulaSelected, semestreSelected, yearSelected)
    if (response.status === 200) {
      setData ([
          {x: 'CPU', y: response.data.estadistica[0].CPU},
          {x: 'Monitor', y: response.data.estadistica[0].Monitor},
          {x: 'Teclado', y: response.data.estadistica[0].Teclado},
          {x: 'Mouse', y: response.data.estadistica[0].Mouse},
          {x: 'Red', y: response.data.estadistica[0].Red},
          {x: 'Cable Energia', y: response.data.estadistica[0]["Cable Energia"]},
          {x: 'Cable VGA/HDMI', y: response.data.estadistica[0]["Cable VGA/HDMI"]},
          {x: 'Cañón', y: response.data.estadistica[0].Cañón}
        ]);
    }
    else
      console.log(response)
  };

  return (
    <div className="m-3">
      <content className=' row'>
      <div className='col-11 col-sm-12 col-md-12 col-lg-6 col-xl-5 mt-2'>
          <label>Año </label>
          <select className="form-control" onChange={handleInputChangeYear}>
            {opcionesYear()}
          </select>
        </div>
        <div className='col-11 col-sm-6 col-md-6 col-lg-2 col-xl-2 mt-5'>
          <label>Semestre I 
            <input type='radio' className="form-control" name="semestre"onClick={()=> {semestreSelect('I')} } value='I'/>
          </label>
        </div>
        <div className='col-11 col-sm-6 col-md-6 col-lg-2 col-xl-2 mt-5'>
          <label>Semestre II 
            <input type='radio' className="form-control" name="semestre" onClick={()=> {semestreSelect('II')}} value='II'/>
          </label>
          
        </div>
        <div className='col-11 col-sm-12 col-md-12 col-lg-6 col-xl-5 mt-2'>
          <label>Salón </label>
          <select className="form-control" onChange={handleInputChange}>
            {renderSalones()}
          </select>
        </div>
        <div className='col-11 col-sm-12 col-md-12 col-lg-6 col-xl-2 mt-5'>
          <input type='button' className="form-control text-white bg-success " onClick={()=> estadisticaSalones()} value='Aceptar'/>
        </div>  
        <div className='col-11 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4'>
          <h2>Fallas en {`${yearSelected}-${semestreSelected} en ${aulaSelected} `}</h2>
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
export default PorAula;