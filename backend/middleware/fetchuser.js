var jwt = require('jsonwebtoken');
const JWT_SECRET = "iNotebook";

const fetchuser=(req,res,next)=>{
    //Get user from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
    } catch (error) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });

    }
    next();
}
module.exports =  fetchuser;
