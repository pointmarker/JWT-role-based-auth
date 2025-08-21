const {getDb} = require('../config/db')

async function addUser(username, role,passwordHash){
    console.log('addUser çalıştı')
    const db = await getDb();
    const res = await db.collection('users').insertOne({
        username, 
        role,
        passwordHash, 
        createdAt: new Date()
    })

    return res;
}

module.exports = {addUser};