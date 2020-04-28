const usuarioCtrl = {};
const {poolPromise} = require("../models/database");
const encryptPassword = require("../helpers/encryptPassword");


//obtener
usuarioCtrl.getUsuarios = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query('select * from usuario')
    res.status("200").send({usuario: result.recordset});
  } catch (e) {
    res.status("204").send(e);
  }
};

usuarioCtrl.createUsuario = async (req, res) => {
    try {
      const pool = await poolPromise
      const {nombre, email, semestre, noControl, contra} = req.body
      const contrasenaEncryptada =  await encryptPassword(contra)
      const newCliente = {
        nombre,
        email,
        semestre,
        noControl,
        contra,
        idTipo: 2
      };
      await pool.request().query(`INSERT INTO usuario values ('${nombre}','${email}',${semestre},'${noControl}','${contrasenaEncryptada}',${2}) `);
      res.status(201).json({Info: "Usuario agregado correctamente", Usuario: newCliente});
      console.log("Cliente Agregado Correctamente")
    } catch (e) {
      console.log(e)
      res.status("400").json({code: e.code,message: e.sqlMessage});
    }
  };

  
usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        const pool = await poolPromise
        await pool.request().query(`DELETE FROM usuario WHERE idUsuario = ${req.params.idUsuario}`);
        res.status(200).json("Usuario Eliminado")
    } catch (e) {
        res.status(400).json(e)
    }

 }


module.exports = usuarioCtrl;
