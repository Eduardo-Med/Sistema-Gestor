import React, { Component } from "react";

export default class index extends Component {
  render() {
    return (
      <div className="container2">
        <div className="form__top">
          <h2 className="h2">Usuarios registrados</h2>
        </div>
        <table className="table" border="1">
          <tr>
            <th>No. de Control</th>
            <th>Contraseña</th>
            <th>Correo electronico</th>
          </tr>
          <tr>
            <td>15330516</td>
            <td>9703</td>
            <td>cons@gmail.com</td>
          </tr>
          <tr>
            <td>17330216</td>
            <td>9910</td>
            <td>hola@gmail.com</td>
          </tr>
          <tr>
            <td>16330764</td>
            <td>9801</td>
            <td>1234@gmail.com</td>
          </tr>
        </table>
        <div className="btn__form">
          <input className="btn_submit" type="submit" value="REGISTRAR" />
          <input className="btn_reset" type="reset" value="LIMPIAR" />
        </div>
      </div>
    );
  }
}
