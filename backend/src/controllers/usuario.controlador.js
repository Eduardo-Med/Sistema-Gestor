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
      const {nombre, email, semestre, noControl, contra, idTipo} = req.body
      const contrasenaEncryptada =  await encryptPassword(contra)
      let tipoID
      
      if(idTipo === "Administrador"){
        tipoID = 1
      }else if(idTipo === "Soporte Técnico"){
        tipoID = 2
      }else{
        tipoID = 3
      }
      const newCliente = {
        nombre,
        email,
        semestre,
        noControl,
        contra,
        idTipo
      };
      await pool.request().query(`INSERT INTO usuario values ('${nombre}','${email}',${semestre},'${noControl}','${contrasenaEncryptada}',${tipoID}) `);
      res.status(201).json({Info: "Usuario agregado correctamente", Usuario: newCliente});
      console.log("Cliente Agregado Correctamente")
    } catch (e) {
      console.log(e)
      res.status("400").json({code: e.code,message: e.sqlMessage});
    }
  };




  usuarioCtrl.updateUsuario = async (req, res) => {
    try {
      const pool = await poolPromise
      const {idUsuario,nombre, email, semestre, noControl, contra, idTipo} = req.body
      const contrasenaEncryptada =  await encryptPassword(contra)
      let tipoID

      if(idTipo === "Administrador"){
        tipoID = 1
      }else if(idTipo === "Soporte Técnico"){
        tipoID = 2
      }else{
        tipoID = 3
      }

        await pool.request().query(`exec Modificar_Usuario ${idUsuario}, '${nombre}','${email}',${semestre},'${noControl}','${contrasenaEncryptada}',${tipoID} `);
        res.status(201).json({message: "Usuario Actualizado Correctamente"})
    } catch (error) {
        console.log(error)
        res.status("400").json({code: error.code,message: error.sqlMessage});
    }
    
}

  
usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        const pool = await poolPromise
        await pool.request().query(`DELETE FROM usuario WHERE idUsuario = ${req.params.idUsuario}`);
        res.status(200).json("Usuario Eliminado")
    } catch (e) {
        res.status(400).json(e)
    }

 }

 usuarioCtrl.getUsuariosPorTipo = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`exec buscarUsuariosPorTipo @Tipo = '${req.params.tipo}'`)
    res.status("200").send({usuario: result.recordset});
  } catch (e) {
    res.status("204").send(e);
  }
};
module.exports = usuarioCtrl;
