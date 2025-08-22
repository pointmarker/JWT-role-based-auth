const jwt = require('jsonwebtoken');
const {haveUserByRequest} = require('../services/auth.service')

async function currentUserController(req,res,next){
    const user = haveUserByRequest(req,res,jwt)
    console.log("currentUSerController ip adresi",req.ip)
    console.log('currentUserController user: ', user)
    res.send({message: 'success'})
}

module.exports = { currentUserController}