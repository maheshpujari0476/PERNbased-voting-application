import dotenv from 'dotenv';
dotenv.config()
import  jwt  from 'jsonwebtoken';
import {jwtDecode} from 'jwt-decode'


export const verifyprofile = async(req,res,next)=>{
    try{
      const authtoken= req.headers.authorization;
      //  console.log(authtoken)
      if(!authtoken || !authtoken.startsWith('Bearer ')){
        return res.status(401).json({message:'Access Denied token not provided'});
      }
      const token = authtoken.split(' ')[1];
    
      const decode = jwtDecode(token);
      const currenttime = Date.now();
      if(decode < currenttime){
        localStorage.removeItem('token')
        return res.status(403).json({message:'Token expired'})
      }

      const decoded =  jwt.verify(token,process.env.secretkey,
         (err,user) => {
        if(err) return res.status(403).json({message:"Token expired or invailid token"});
      //  res.status(201).json({message:"Access Granted"})
      })
      req.user = decoded
      next();
     
    }catch(error){
        console.error({error:error.message,},"hello")
    }
}

