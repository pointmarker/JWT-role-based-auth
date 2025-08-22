const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN, REFRESH_TOKEN} = require('../environment/environment')
const {getDb} = require('../config/db')
const {createHashword, getUserByUsernameAndPassword,roleRandomizer,haveUserByRequest} = require('../services/auth.service');
const { addUser } = require('../models/user.model');

let refreshTokens = {}

async function registerController (req,res){
    const db = await getDb();
    let {username, password} = req.body
    username = username.trim()

    try {
        const userUsername = await db.collection('users').findOne({username: username})

        if(!userUsername){
            const passwordHash = await createHashword(password)
            const role = roleRandomizer();

            const user = await addUser(username, role, passwordHash)
            if(!user) return res.status(401).send({message: "user cant add to database"})
            res.status(201).send({status: 'success'})

        }else{
            res.status(409).send({message: "username on use"})
        }
    } catch (error) {
        res.status(401).send({status: 'register error'})
    }
}
async function loginController(req,res){
    const cookies = req.cookies
    console.log('loginController: cookies', cookies)
    const {username,password} = req.body
    const user = await getUserByUsernameAndPassword(username, password)

    if(!user) return res.status(404).send('no user found');

    const access_token = generateAccessToken(user)
    const refresh_token = generateRefreshToken(user)


    if(!refreshTokens[username]){
        refreshTokens[username] = []
    }

    refreshTokens[username].push(refresh_token)
    console.log('loginden sonra rame eklenen roken : ', "refreshtokens[username]: ",refreshTokens[username])
    res.cookie('access_token', access_token,{
        httpOnly: true,
        secure: false
    })

    res.cookie('refresh_token', refresh_token,{
        httpOnly: true,
        secure: false
    })

    res.status(200).send({message: "success"})
}

async function memberController(req,res,next){
    const user = haveUserByRequest(req,res,jwt)
    console.log('memberController user: ', user)

    next()
}
async function adminController(req,res,next){
    const user = haveUserByRequest(req,res,jwt)
    console.log('adminController user: ', user)

    next()
}
async function coworkerController(req,res,next) {
    const user = haveUserByRequest(req,res,jwt)
    console.log('coworkerController user: ', user)

    next()
}

async function sharedController(req,res,next) {
    const user = haveUserByRequest(req,res,jwt)
    console.log('shared controller user: ', user)

    next()
}

async function logoutController(req,res,next) {
    const token = req.cookies.refresh_token;
    try {
        jwt.verify(token, REFRESH_TOKEN, (err,payload) => {
            if(err) return res.status(401).send({message: 'unauth'});
            
            console.log('logout sırasındaki refreshtokens[payload.username] : ',refreshTokens[payload.username])
            if(!refreshTokens[payload.username] || !refreshTokens[payload.username].includes(token)) return res.status(403).send({message: 'forbidden'});

            refreshTokens[payload.username] = refreshTokens[payload.username].filter(t => t !== token)

            res.clearCookie('access_token')
            res.clearCookie('refresh_token')

            res.status(200).send({status: 'success', message: 'logged out'})
        })
        
    } catch (error) {
        console.error('logoout controller error: ', error)
    }
}


function generateAccessToken(user){
    return jwt.sign({username: user.username, role: user.role},ACCESS_TOKEN, {expiresIn: "1h"} )
}

function generateRefreshToken(user){
    return jwt.sign({username: user.username}, REFRESH_TOKEN,{expiresIn:'7d'})
}
module.exports = {registerController, loginController, adminController, memberController, coworkerController,logoutController,sharedController}