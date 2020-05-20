const { Router } = require("express");
const router = Router();

const {SalonControlador} = require("../controllers/index");

const {obtenerSalones,agregarSalon,borrarSalon} = new SalonControlador();

router
    .route("/")
    .get(obtenerSalones)
    .post(agregarSalon);

router
    .route("/:idSalon")
    .delete(borrarSalon)

module.exports = router;