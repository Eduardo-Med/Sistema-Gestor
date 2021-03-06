import React, {useState, useEffect} from 'react';
import {getStadisticFrecuente, getOldestYear} from '../../../api/stadistic';
import {VerticalGridLines, HorizontalGridLines, XAxis, YAxis,
    VerticalBarSeriesCanvas, XYPlot} from 'react-vis';


const Frecuente = () => {
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
  };

    async function estadisticaFallaFrecuente() {
      if(yearSelected === "Default" || semestreSelected === "Default")
      {
        alert('Debe elegir un Año y un Semestre, antes de obtener la estadística.')
      }
      else
      {
        setTituloEstadistica('Fallas en '+yearSelected+'-'+semestreSelected);
        const response = await getStadisticFrecuente(yearSelected, semestreSelected)
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
    }
    
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
          <input type='button' className="form-control text-white bg-success " onClick={()=> {estadisticaFallaFrecuente()}} value='Aceptar'/>
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
              color="#7e1efc"
            />
            <XAxis />
            <YAxis />
          </XYPlot>
        </div>
      </content>
      </div>
    );
}
export default Frecuente;