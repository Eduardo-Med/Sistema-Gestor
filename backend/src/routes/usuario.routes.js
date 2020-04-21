const { Router } = require("express");
const router = Router();
const {getUsuarios, createUsuario,deleteUsuario} = require('../controllers/usuario.controlador');

router
  .route("/")
  .get(getUsuarios)
  .post(createUsuario)


router
  .route("/:idUsuario")
  .put()
  .delete(deleteUsuario);
module.exports = router;