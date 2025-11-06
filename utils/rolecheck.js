
import dotenv from 'dotenv';
dotenv.config()
export const rolecheck = (req,res,next)=>{
    try{
      const { password } =req.body;
      if(password != process.env.ADMINPASS) return res.json({message:'Only Authorized have Access to this route'})
      next();  
      }catch(error){
        console.error({error:error.message})
        return res.status(404).json({message:'Internal server error'})
      }

}