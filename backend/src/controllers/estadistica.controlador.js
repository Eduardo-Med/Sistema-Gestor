const estadisticaCtrl = {};
const {poolPromise} = require("../models/database");


//obtener
estadisticaCtrl.getEstadisticaYear = async (req, res) => {
  try {
    const pool = await poolPromise
    const year = req.params.year
    const result = await pool.request().query(`exec estadisticaReporteYear @Year = '${year}'`)
    res.status("200").send({estadistica: result.recordset});
  } catch (e) {
    res.status("204").send(e);
  }
};

estadisticaCtrl.getEstadisticaAtenPorMes = async (req, res) => {
  try {
    const pool = await poolPromise
    const year = req.params.year
    const result = await pool.request().query(`exec estadisticaFallaAtendidaPorMes @Year = '${year}'`)
    res.status("200").send({estadistica: result.recordset});
  } catch (e) {
    res.status("204").send(e);
  }
};

estadisticaCtrl.getEstadisticaFrecuente = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`exec estadisticaFallaFrecuente @Year = '${req.params.year}', @Semestre = '${req.params.semestre}'`)
    res.status("200").send({estadistica: result.recordset});
  } catch (e) {
    res.status("204").send(e);
  }
};

estadisticaCtrl.getPrimerYear = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`EXEC estadisticaPrimerYear`)
    res.status("200").send({estadistica: result.recordset});
  } catch (e) {
    res.status("204").send(e);
  }
}

estadisticaCtrl.getSalones = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`EXEC estadisticaFallaPorAula @Aula = '${req.params.aula}', @Semestre = '${req.params.semestre}', @Year = ${req.params.year}`)
    res.status("200").send({estadistica: result.recordset});
  } catch (e) {
    res.status("204").send(e);
  }
}

estadisticaCtrl.getEquipo = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`EXEC estadisticaFallaPorEquipo @Equipo = '${req.params.equipo}', @Semestre = '${req.params.semestre}', @Year = '${req.params.year}'`)
    res.status("200").send({estadistica: result.recordset});
  } catch (e) {
    res.status("204").send(e);
  }
}

estadisticaCtrl.getPorPersona = async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`EXEC estadisticaPorPersona @Year = '${req.params.year}', @idUsuario = ${req.params.idUsuario}`)
    res.status("200").send({estadistica: result.recordset});
  } catch (e) {
    res.status("204").send(e);
  }
}

module.exports = estadisticaCtrl;

