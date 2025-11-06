import express from "express"
const router = express.Router()
// import {db} from '../models/maindb.js'
// import {User} from "../models/user.js"
import jwt from "jsonwebtoken"
 import argon2 from "argon2"
import dotenv from 'dotenv';
import multer from "multer";
import { pool } from "../models/post.js";
dotenv.config()
import { register,voterlogin,updateuserpass,uservoteing,electionlist ,uservoter,votecount} from "../controllers/usercontrolers.js"
import { verifyprofile } from "../utils/verify.js";




const storage = multer.diskStorage({
    destination:(req,file,cb)=>{ cb(null,'./uploads') },
    filename:(req,file,cb)=>{
        const {name} = req.body;
        cb(null,`${name}-${file.originalname}`)
    }
})

const upload = multer ({ storage })

router.get('/',(req,res)=>{
    return res.json({message:'wlecome to first post request'});
})

router.get('/hello',(req,res)=>{
    return res.json('hello this is first request from server')
})

 router.post('/register',register)

 

router.post('/login',voterlogin)

 router.get('/all',async(req,res)=>{
    try{
  const data=await pool.query('SELECT * FROM voters')
  return res.json(data.rows);
    }catch(error){
        console.error({error:error.message})
    }
 })



router.get('/profile',verifyprofile,async(req,res)=>{
    const data = req.user;
    // console.log(data.id.aadharCardNo)
const user =   await pool.query('SELECT * FROM voters WHERE aadharCardNo=$1',[data.id.aadharCardNo])

    // console.log('login successfull',user.rows[0])
    return res.status(201).json({message:'login successfull',data:user.rows[0]})
})


router.get('/userprofile',verifyprofile,async(req,res)=>{
    
    const authtoken= req.headers.authorization;
    //  console.log(authtoken)
    if(!authtoken || !authtoken.startsWith('Bearer ')){
      return res.status(401).json({message:'Access Denied token not provided'});
    }

    const token = authtoken.split(' ')[1]
    const user = await pool.query('SELECT * FROM voters WHERE token=$1',[token])
    console.log(user.rows[0])

    return res.status(201).json(user.rows)
})

// router.post('/refresh',refreshtoken)

router.put('/password',verifyprofile,updateuserpass)

router.post('/voting',upload.any(),verifyprofile,uservoteing)

router.get('/electionlist',verifyprofile,electionlist)

router.post('/uservoter',verifyprofile,uservoter)

router.get('/votecount',votecount)

router.get('/datas',(req,res)=>{
    const user= { id: 1, name: "hello", email: "hello@example.com" }
    console.log(user);
    res.json({user});
})


router.get("/votecountin", verifyprofile, (req, res) => {
    res.json({ message: "Protected data" });
  });
 
  router.get('/profilepage',verifyprofile,(req,res)=>{
    console.log('hello from profile page')
    return res.status(403).json({message:'protected route'})
    
  })
// router.put('/put',async(req,res)=>{
//     const data = pool.query('ALTER SEQUENCE voters_id_seq RESTART WITH 1;')
//     return res.json(data)
// })


// router.delete('/delete',async(req,res)=>{
//     const data=pool.query('DELETE  FROM voters WHERE aadharCardNo=$1',[12345678])
//     return res.json(data)
// })

router.post('/userdata',(req,res)=>{
  const data = req.body;
  console.log(data)
})

export{
    router,
}
