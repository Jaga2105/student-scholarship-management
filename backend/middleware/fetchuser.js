var jwt = require('jsonwebtoken');
const JWT_SECRET="Jagaisagoodboy"

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token')
    console.log(token)
    if(!token){
        res.status(401).send({error:"Please authenticate using a vlid token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET)
        console.log(data)
        req.user=data.user
    next()
    } catch (error) {
        res.send(401)
    }
    
}


module.exports=fetchuser;