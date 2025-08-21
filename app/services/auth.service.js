const {getDb} = require('../config/db')
const bcrypt = require('bcrypt')

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

module.exports = {createHashword, getUserByUsernameAndPassword,roleRandomizer}