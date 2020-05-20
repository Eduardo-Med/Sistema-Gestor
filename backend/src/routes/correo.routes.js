const { Router } = require("express");
const router = Router();
const {CorreoControlador} = require('../controllers/index');
const {enviarCorreo} = new CorreoControlador();

router
  .route("/")
  .post(enviarCorreo);

module.exports = router;