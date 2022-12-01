var jwt = require('jsonwebtoken');
const Jwt_SECRET = 'IAMAGREATPERSON$OK';
const fetchuser =(req,res,next) =>{
    //Get the user from JWT token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please Authenticate Using Valid Token"})
    }
    try {
    const data = jwt.verify(token, Jwt_SECRET);
    req.user = data.user
    next();
    }
    catch (error) {
        res.status(401).send({error:"Please Authenticate Using Valid Token"})
    }
}


module.exports = fetchuser;