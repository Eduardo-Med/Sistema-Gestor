import React, {useState, useEffect} from 'react';
import {getStadisticPersona, getOldestYear} from '../../../api/stadistic';
import {getUsersType} from '../../../api/user';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, RadialChart, VerticalBarSeries,
    VerticalBarSeriesCanvas, FlexibleWidthXYPlot} from 'react-vis';
  

const PorPersona = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [primerYear, setPrimerYear] = useState(new Date().getFullYear());
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
  const [semestreSelected, setSemestreSelected] = useState('I');
  const [usuarios, setUsuarios] = useState([]);
  const [personaSelected, setPersonaSelected] = useState('' );
  const [data, setData] = useState();
  
  const handleInputChange = (event) => {
    event.persist();
    setYearSelected(event.target.value);
}
const handleInputChangePersona = (event) => {
    event.persist();
    setPersonaSelected(event.target.value);

}

  const semestreSelect = sem => {
    setSemestreSelected(sem);
  }
  
  useEffect(() => {
      estadisticaPorPersona();
      estadisticaPrimerYear();
      async function loadUsuarios() {
        const response = await getUsersType('Soporte Técnico');
        if (response.status === 200) {
          setUsuarios(response.data.usuario);
          setIsLoading(false);
        }
      }
      loadUsuarios();
    }, []);
  
    async function estadisticaPrimerYear() {
      const response = await getOldestYear()
      if (response.status === 200) {
        setPrimerYear(response.data.estadistica[0].Year);
      }
      else
        console.log(response)
  };
  async function estadisticaPorPersona() {
    const response = await getStadisticPersona(yearSelected, personaSelected)
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
      
      setIsLoading(false);
    }
    else
      console.log(response)
};

const opcionesYear = () => {
    const element = [];
    for (let i= primerYear; i <= year; i++) {
      element.push(<option value={i}>{i}</option>)
    }
    return(
      element    
    );  
}
const opcionesPersona = () => {
    console.log(usuarios)
    const element = usuarios.map((usuario,index) =>(
        <option value={usuario.idUsuario}>{usuario.nombre}</option>
     ))
    return element;
}


  return (
    <div className="m-3">
      <content className=' row'>
        <div className='col-11 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-2'>
          <label>Año </label>
          <select className="form-control" onChange={handleInputChange}>
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
        <div className='col-11 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-2'>
          <label>Persona </label>
          <select className="form-control" onChange={handleInputChangePersona}>
            {opcionesPersona()}
          </select>
        </div>
        <div className='col-11 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-5'>
          <input type='button' className="form-control text-white bg-success " onClick={()=> {estadisticaPorPersona()}} value='Aceptar'/>
        </div>  
        <div className='col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 mt-4'>
          <h2>Fallas en {yearSelected}</h2>
          <FlexibleWidthXYPlot xType="ordinal" height={300} xDistance={100}>
            
            <VerticalGridLines />
            <HorizontalGridLines />
            
            <VerticalBarSeriesCanvas
              cluster='2020'
              barWidth={0.5}
              data = {data}
            />
            <XAxis />
            <YAxis />
          </FlexibleWidthXYPlot>
        </div>
      </content>
      </div>
  );
}
export default PorPersona;