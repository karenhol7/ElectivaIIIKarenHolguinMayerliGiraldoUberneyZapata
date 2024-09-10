class ExcepcionWrongCredentials extends Error{
    constructor(){
        super(`WRONG CREDENTIALS`)
    }
}

module.exports = {ExcepcionWrongCredentials};