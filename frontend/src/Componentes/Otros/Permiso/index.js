import React from 'react'
import Imagen from '../../../Imagenes/access-denied.png'
import './styles.css'

function Permiso() {
    return (
        <div className="row rowPermiso mt-5">
            <div class="error-container">
                <div>
                    <img src={Imagen} alt="access-denied"/>
                </div>

                <div class="message-error-container">
                    <h1>Uuups. . .</h1>
                    <p>Usted no cuenta con los permisos necesarios!</p>
                </div>
            </div>
        </div>
    )
}

export default Permiso
