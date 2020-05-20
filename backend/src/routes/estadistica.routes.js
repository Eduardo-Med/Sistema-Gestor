const { Router } = require("express");
const router = Router();
const {getPorPersona, getEquipo, getEstadisticaYear, getEstadisticaFrecuente, getPrimerYear, getEstadisticaAtenPorMes, getSalones} = require('../controllers/estadistica.controlador');

router
  .route("/fallaYear/:year")
  .get(getEstadisticaYear)

router
.route("/fallasAtendidas/:year")
.get(getEstadisticaAtenPorMes)

  router
  .route("/fallaFrecuente/:year/:semestre")
  .get(getEstadisticaFrecuente)

  router
  .route("/PrimerYear/")
  .get(getPrimerYear)
  
  router
  .route("/salones/:aula/:semestre/:year")
  .get(getSalones)

  router
  .route("/equipo/:equipo/:semestre/:year")
  .get(getEquipo)

  router
  .route("/persona/:year/:idUsuario/")
  .get(getPorPersona)

  

module.exports = router;