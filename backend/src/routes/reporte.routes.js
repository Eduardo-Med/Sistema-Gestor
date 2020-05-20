const { Router } = require("express");
const router = Router();

const {ReporteControlador} = require("../controllers/index");

const {actualizarReporte,borrarReporte,crearReporte,obtenerReportes,obtenerReportesPorSalon} = new ReporteControlador();

router
    .route("/")
    .get(obtenerReportes)
    .post(crearReporte);

router
    .route("/:idReporte")
    .put(actualizarReporte)
    .delete(borrarReporte);

router
    .route("/salon/:Salon")
    .get(obtenerReportesPorSalon)

module.exports = router;