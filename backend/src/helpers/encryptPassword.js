const bcrypt = require("bcrypt");

encryptPassword  = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
}


module.exports = encryptPassword
