import React, { Component } from 'react'
import './main.css'

export default class index extends Component {
    render() {
        return (
        <div className="container1">
            <div className="form__top">
                <h2>Formulario <span style={{color: "#F39B53"}}>Registro</span></h2>
            </div>
            <form className="form__reg" action="">
                <input className="input1" type="text" placeholder="&#128100; Nombre" required autofocus/>
                <input className="input1" type="email" placeholder="&#9993; Email" required/>
                <input className="input1" type="tel" placeholder="# No. Control" required/>
                <input className="input1" type="sem" placeholder="&#8962; Semestre" required/>
                <div className="btn__form">
                    <input className="btn_submit" type="submit" value="REGISTRAR"/>
                    <input className="btn_reset" type="reset" value="LIMPIAR"/>
                </div>
            </form>
        </div>
        )
    }
}
