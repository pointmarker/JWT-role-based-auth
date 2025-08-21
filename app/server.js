const express = require('express')
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const database = require('./config/db')
const env = require('./environment/environment');

app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.use(('/'),router)


mongoRun = async() => {
    const client = await database.mongoStart()
    database.connectDb(client)
}

mongoRun();


app.get('/', [(req,res,next) =>{
    console.log('LOGGED');next();
} ,(req,res) => {
    res.status(200).sendFile(path.join(__dirname,'public','pages','index.html'))
}])

app.get('/login',(req,res) => {
    console.log(req.body);
    res.status(200).sendFile(path.join(__dirname, 'public','pages','login.html'))
})

app.get('/register',(req,res) => {
    console.log(req.body);
    res.status(200).sendFile(path.join(__dirname, 'public','pages','register.html'))
})


process.on('SIGINT',async() => {
    await database.mongoClose()
    console.log('server is closing')
    process.exit(0);
})

app.listen(env.PORT, () => {console.log('server running on ',env.PORT)})