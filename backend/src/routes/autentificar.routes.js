const { Router } = require("express");
const router = Router();

const {loginUser} = require("../controllers/autentficar.controlador");

router.route("/login").post(loginUser);

module.exports = router;