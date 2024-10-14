const jwt = require("jsonwebtoken");


const protectedRoute = (req, res, next) => {
    const cookie = req.cookies['jwt'];
    if (!cookie) res.status(401).json({message:"JWT Not Found,You are not authorized to access this route"})
    const claims = jwt.verify(cookie,process.env.JWT_SECRET_KEY)
    if (!claims){
        return res.status(401).json({message:"You are not authorized to access this route"})
    }
    next()
}
module.exports = protectedRoute