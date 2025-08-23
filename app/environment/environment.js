const {access,refresh} = require('../middleware/generateToken')

const PORT=3000

const MONGO_URI="mongodb+srv://pointmarker:RhgtmpW5znZl7SLM@free-cluster.gwioscu.mongodb.net/?retryWrites=true&w=majority&appName=free-cluster"
const MONGO_COLLECTION = "users"
const MONGO_CLUSTER = "free-cluster"

const ACCESS_TOKEN = access
const REFRESH_TOKEN = refresh

module.exports = {MONGO_URI, MONGO_CLUSTER, MONGO_COLLECTION, PORT, ACCESS_TOKEN, REFRESH_TOKEN}