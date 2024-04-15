const bcrypt = require('bcrypt')
const saltRounds = 10

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hasedPassword = bcrypt.hashSync(password,salt)
    return hasedPassword
}

const comparePassword = (password, hash) =>{
    const flag = bcrypt.compareSync(password,hash)
    return flag
}

module.exports = {
    encryptPassword,
    comparePassword
}