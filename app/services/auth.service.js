const {getDb} = require('../config/db')
const bcrypt = require('bcrypt')
const {ACCESS_TOKEN} = require('../environment/environment')

function roleRandomizer(){
    const roles = ['admin', 'coworker', 'member'];
    const random = Math.floor(Math.random() * roles.length)
    return roles[random]
}

async function createHashword (password){
    return await bcrypt.hash(password,10);
} 

async function getUserByUsernameAndPassword(username,password){
    const db = await getDb()
    const user = await db.collection('users').findOne({username})
    if(!user) return null;
    const isMatch = await bcrypt.compare(password,user.passwordHash)
    if(isMatch) return user
    else return null
}

function haveUserByRequest(req,res,jwt){
    const token = req.cookies.access_token
    if(!token) return res.status(404).send({message: 'not found'})
    const user = jwt.verify(token, ACCESS_TOKEN)
    if(!user) return res.status(401).send({message: 'unauth'});

    return user
}

module.exports = {createHashword, getUserByUsernameAndPassword,roleRandomizer,haveUserByRequest}