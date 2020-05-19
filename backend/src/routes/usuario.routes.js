const { Router } = require("express");
const router = Router();
const {getUsuarios, createUsuario,deleteUsuario, updateUsuario, getUsuariosPorTipo} = require('../controllers/usuario.controlador');

router
  .route("/")
  .get(getUsuarios)
  .post(createUsuario)


router
  .route("/:idUsuario")
  .put(updateUsuario)
  .delete(deleteUsuario);

router
  .route("/tipo/:tipo")
  .get(getUsuariosPorTipo)

module.exports = router;
