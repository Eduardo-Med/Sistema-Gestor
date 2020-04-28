const { Router } = require("express");
const router = Router();
const {getUsuarios, createUsuario,deleteUsuario, updateUsuario} = require('../controllers/usuario.controlador');

router
  .route("/")
  .get(getUsuarios)
  .post(createUsuario)


router
  .route("/:idUsuario")
  .put(updateUsuario)
  .delete(deleteUsuario);
module.exports = router;