const authCtrl = {};
const {poolPromise} = require("../models/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


authCtrl.loginUser = async (req, res) => {
  try {
    const pool = await poolPromise
    const { noControl, password } = req.body;

    const user = await pool.request().query(`SELECT * FROM usuario WHERE noControl = '${noControl}'`)
    if (!user.recordset[0]) {
      return res.status(404).json({auth:false, message:"El numero de control no exitse"});
    }

    const validPassword = await bcrypt.compare(password, user.recordset[0].contra);
    if (!validPassword) {
      return res.status(401).json({ auth: false, message:"Contraseña incorrecta", token: null });
    }

    const token = jwt.sign({ id: user.recordset[0].idUsuario, noControl}, process.env.SECRETTOKEN, {
      expiresIn: "60min"
    });

    res.status(200).json({ auth: true, message:"Autentificacion correcta", token, userId: user.recordset[0].idUsuario, tipoUsuario: user.recordset[0].idTipo });
  } catch (error) {
    console.log(error)
    res.json({message: "A ocurrido un error", error})
  }
 
};
module.exports = authCtrl;