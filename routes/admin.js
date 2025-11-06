import express from "express"
const adminrouter = express.Router()
// import {db} from '../models/maindb.js'
// import {User} from "../models/user.js"
import jwt from "jsonwebtoken"
 import argon2 from "argon2"
import dotenv from 'dotenv';
import { pool } from "../models/post.js";
dotenv.config()
 import { candidateelectors,candidateupdate,candidatedelete ,electionlist} from "../controllers/candidatecontrolers.js"
import { verifyprofile } from "../utils/verify.js";
import { rolecheck } from "../utils/rolecheck.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{ cb(null,'./uploads') },
    filename:(req,file,cb)=>{
        const {name} = req.body;
        cb(null,`${name}-${file.originalname}`)
    }
})

const upload = multer ({ storage })


adminrouter.get('/',(req,res)=>{
    console.log('hello from admin')
    return res.status(201).json({message:'Hello from Admin'})
})

adminrouter.post('/candidate',upload.any(),rolecheck,candidateelectors)

adminrouter.put('/update',rolecheck,candidateupdate)

adminrouter.delete('/delete',rolecheck,candidatedelete)

adminrouter.get('/electionlist',electionlist)

adminrouter.get('/candidatedata',verifyprofile,async(req,res)=>{
   const candidatedata = await pool.query('SELECT * FROM candidate');
   return res.status(201).json(candidatedata.rows)
})

adminrouter.get('/candidatedataout',async(req,res)=>{
    const candidatedata = await pool.query('SELECT * FROM candidate');
    return res.status(201).json(candidatedata.rows)
 })



export{
    adminrouter
}

