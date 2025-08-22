const path = require('path')
function serveStatic(page){
    return (req,res,next) => {
        res.status(200).sendFile(path.join("C:", "Users", "90533", "Desktop", "node", "role-based-auth", "app",'public','pages',`${page}.html`))
    }
}

module.exports = {serveStatic};