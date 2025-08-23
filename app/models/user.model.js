const {getDb} = require('../config/db');
const { MONGO_COLLECTION } = require('../environment/environment');

async function addUser(username, role,passwordHash){
    console.log('addUser çalıştı')
    const db = await getDb();
    const res = await db.collection(MONGO_COLLECTION).insertOne({
        username, 
        role,
        passwordHash, 
        createdAt: new Date()
    })

    return res;
}

module.exports = {addUser};