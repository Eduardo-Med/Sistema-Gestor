
const sql = require('mssql')
const {database} = require('./keys');

const poolPromise = new sql.ConnectionPool(database)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}