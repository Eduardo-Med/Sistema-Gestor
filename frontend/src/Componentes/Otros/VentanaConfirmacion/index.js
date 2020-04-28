import React from "react";

function VentaConfirmacion({eliminar,usuarioId}) {
  return (
    <div className="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Eliminar</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Seguro que desea elminar este usuario
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={()=>eliminar(usuarioId)}>Si</button>
        <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
      </div>
        </div>
      </div>
    </div>
  );
}

export default VentaConfirmacion;
