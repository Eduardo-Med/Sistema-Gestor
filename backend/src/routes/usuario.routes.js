const { Router } = require("express");
const router = Router();
const {getUsuarios, createUsuario,deleteUsuario,activarUsuario, updateUsuario,obtenerUsuariosPorId,desactivarUsuario, getUsuariosPorTipo} = require('../controllers/usuario.controlador');

router
  .route("/")
  .get(getUsuarios)
  .post(createUsuario)


router
  .route("/:idUsuario")
  .get(obtenerUsuariosPorId)
  .put(updateUsuario)
  .delete(deleteUsuario);

router
  .route("/activar/:idUsuario")
  .delete(activarUsuario);

router
  .route("/desactivar/:idUsuario")
  .delete(desactivarUsuario);

router
  .route("/tipo/:tipo")
  .get(getUsuariosPorTipo)

module.exports = router;
