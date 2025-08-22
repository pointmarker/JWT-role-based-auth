const jwt = require('jsonwebtoken')
const {ACCESS_TOKEN} = require('../environment/environment')

function authorizeRole(roles = []){
    return (req,res,next) => {
        const token = req.cookies.access_token;
        if(!token) return res.status(401).send({message: "unauth"});

        try {
            jwt.verify(token, ACCESS_TOKEN, (err,payload) => {
                if(err) return res.status(401).send({message: 'unauth'});
                if(roles.length && !roles.includes(payload.role)){
                    return res.status(403).send({ message: "forbidden" });
                }
                next();
            })
        } catch (error) {
            return res.status(401).send({message: "unauth"})
        }
    }
}


module.exports = {authorizeRole}