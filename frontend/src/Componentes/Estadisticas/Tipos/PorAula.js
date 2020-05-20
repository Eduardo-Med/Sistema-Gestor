import React, {useState, useEffect} from 'react';
import {getStadisticYear, getSalones, getOldestYear} from '../../../api/stadistic';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, RadialChart, VerticalBarSeries,
    VerticalBarSeriesCanvas, FlexibleWidthXYPlot} from 'react-vis';
  

const PorAula = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const [year, setYear] = useState(new Date().getFullYear());
  const [primerYear, setPrimerYear] = useState(new Date().getFullYear());
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
  const [semestreSelected, setSemestreSelected] = useState('I');
  const [salones, setSalones] = useState([]);
  const [aulaSelected, setAulaSelected] = useState();

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
  useEffect(() => {
      setAulaSelected('L51')
      estadisticaSalones();
      estadisticaPrimerYear();
    }, []);

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
            <option value="L51">L51</option>
            <option value="L52">L52</option>
            <option value="L53">L53</option>
            <option value="L54">L54</option>
            <option value="L55">L55</option>
            <option value="L56">L56</option>
            <option value="L57">L57</option>
            <option value="L58">L58</option>
            <option value="B21">B21</option>
            <option value="B214">B214</option>
          </select>
        </div>
        <div className='col-11 col-sm-12 col-md-12 col-lg-6 col-xl-2 mt-5'>
          <input type='button' className="form-control text-white bg-success " onClick={()=> estadisticaSalones()} value='Aceptar'/>
        </div>  
        <div className='col-11 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4'>
          <h2>Fallas en {`${yearSelected}-${semestreSelected} en ${aulaSelected} `}</h2>
          <FlexibleWidthXYPlot xType="ordinal" height={300} width={1000} xDistance={100}>
            
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
export default PorAula;