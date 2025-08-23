const env = require('../environment/environment')
const {MongoClient, ServerApiVersion} = require('mongodb')
let client;

async function mongoStart(){
    //clientı oluştur
    client = new MongoClient(env.MONGO_URI, {
        serverApi:{
            version: ServerApiVersion.v1,
            strict:true,
            deprecationErrors: true
        }
    })

    try {
        console.log('mongo try to connect')
        //clientı servera bağla
        await client.connect()
        //başarılı bağlantı tescili için ping gönder
        await client.db('admin').command({ping: 1})
        console.log('mongo connected')
        return client
    } catch (error) {
        console.error("mongo not initialized",error)
    }
}

async function mongoClose(){
    if(client){
        await client.close()
        console.log('mongo db is closed')
    }
}

let db; 
async function connectDb(client){
    db = client.db('free-cluster')
}

function getDb(){
    if(!db) throw new Error('db not initialized');
    return db
}


mongoRun = async() => {
    const client = await database.mongoStart()
    database.connectDb(client)
}


module.exports = {mongoRun, getDb}