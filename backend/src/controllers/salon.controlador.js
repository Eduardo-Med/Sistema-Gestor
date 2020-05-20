const {poolPromise} = require("../models/database");

class SalonControlador{

    async obtenerSalones(req, res) {
        try {
          const pool = await poolPromise
          const result = await pool.request().query('exec Buscar_Todo_Salones ')
          res.status("200").send({salones: result.recordset});
        } catch (e) {
          res.status("204").send(e);
        }
      };
      
      async agregarSalon(req, res){
          try {
            const pool = await poolPromise
            const {salon} = req.body
            await pool.request().query(` INSERT INTO SALON VALUES ('${salon}')`);      
            res.status(200).json({Info: "Salon Agregado Correctamente"});
            console.log("Salon Agregado Correctamente")
          } catch (e) {
            console.log(e)
            res.status(400).json({code: e.code,message: e.sqlMessage});
          }
        };
      

      
        
      async borrarSalon (req, res) {
          try {
              const pool = await poolPromise
              await pool.request().query(`DELETE FROM Salon WHERE idSalon = '${req.params.idSalon}'`);
              res.status(200).json("Salon Eliminado")
          } catch (e) {
              console.log(e)
              res.status(400).json(e)
          }
      
       }
      
}


module.exports = SalonControlador;