const jwt=require('jsonwebtoken')

exports.jwtMiddleware=(req,res,next)=>{

    //access token from header 
    const token=req.headers['user_token'].split(" ")[1]

    //token verification
    try{
        const JWTresponse=jwt.verify(token,'m17') 
        //console.log(JWTresponse);
        req.payload=JWTresponse._id
        next()
    }
    catch{
 res.status(401).json("Authorization failed! Please login to continue!")
    }
}