import React from 'react';
import './style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, RadialChart, VerticalBarSeries,
  VerticalBarSeriesCanvas, FlexibleWidthXYPlot} from 'react-vis';

const Stadistic = () => {
  const state = {
    useCanvas: false
  };

  const data = [
      {x: 'Enero', y: 8},
      {x: 'Febrero', y: 5},
      {x: 'Marzo', y: 4},
      {x: 'Abril', y: 9},
      {x: 'Mayo', y: 1},
      {x: 'Junio', y: 7},
      {x: 'Julio', y: 6},
      {x: 'Agosto', y: 3},
      {x: 'Septiembre', y: 2},
      {x: 'Octubre', y: 0},
      {x: 'Noviembre', y: 2},
      {x: 'Diciembre', y: 0},
    ];
  const dataRadial = [
    {
      angle: 1,
      label: 'CPU'
    },
    {
      angle: 1,
      label: 'MONITOR'
    },
    {
      angle: 1,
      label: 'TECLADO'
    },
    {
      angle: 1,
      label: 'MOUSE'
    },
    {
      angle: 1,
      label: 'RED'
    },
    {
      angle: 1,
      label: 'CABLE ENERGIA'
    },
    {
      angle: 1,
      label: 'CABLE VGA/HDMI'
    },
    {
      angle: 1,
      label: 'CAÑON'
    }
  ];
  return (
    <div className="m-3">
      <header>
        <h1>Estadísticas</h1>
      </header>
      <content className=' row'>
        <div className='col-11 col-sm-12 col-md-12 col-lg-6 col-xl-5 mt-2'>
          <label>Desde: </label>
          <input type='date' className="form-control"/>
        </div>
        <div className='col-11 col-sm-12 col-md-12 col-lg-6 col-xl-5 mt-2'>
          <label>Hasta:  </label>
          <input type='date' className="form-control  "/>
        </div>
        <div className='col-11 col-sm-12 col-md-12 col-lg-6 col-xl-2 mt-5'>
          <button className="form-control text-white bg-success ">Aceptar</button>
        </div>  
        <div className='col-11 col-sm-12 col-md-12 col-lg-10 col-xl-9 mt-4'>
          <h2>Fallas en 2020</h2>
          <FlexibleWidthXYPlot xType="ordinal" height={300} xDistance={100}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeriesCanvas
              cluster='2020'
              data = {data}
            />
          </FlexibleWidthXYPlot>
        </div>
        <div className='col-11 col-sm-12 col-md-12 col-lg-2 col-xl-3 mt-4'>
          <h2>Fallas Frecuentes</h2>
          <RadialChart
            data={dataRadial}
            width={300}
            height={300} 
            showLabels
          />
        </div>
      </content>
      </div>
  );
}

export default Stadistic;
