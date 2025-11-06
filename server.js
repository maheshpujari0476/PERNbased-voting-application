import express from "express"
const app = express();
import {router} from "./routes/user.js"
import { adminrouter } from "./routes/admin.js";
import bodyParser  from "body-parser"
import cors from "cors"
import colors from "colors"
import dotenv from 'dotenv';
// import http from "http";
dotenv.config();
const port = process.env.port || 5000;
import { pool } from "./models/post.js";
// import {db} from "./models/maindb.js"
// import {User} from './models/user.js'
// import {Candidate} from './models/candidate.js'
// import {router} from "./routes/user.js"
// import path from "path"
import MongoStore from "connect-mongo";
import { Cookie } from "express-session";
import { Session } from "inspector/promises";
import session from "express-session"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";

const logger =(req,res,next)=>{
    const colormethod={
        GET:'green',
        POST:'blue',
        PUT:'yellow',
        DELETE:'red'
    }
    const color = colormethod[req.method] || 'white';
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[color]);
    next();
}


app.use("/uploads", express.static("uploads"));

// const io = new Server(server, {
//   cors: { origin: "http://localhost:5173" }, // frontend port (Vite usually 5173)
// });

app.use(session({
    secret:'session',
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
    }
}))



app.use(express.urlencoded({ extended : true}))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",  // your React app
  credentials: true
}))
app.use(logger)
app.use(bodyParser.json())
app.use('/user',router)
app.use('/admin',adminrouter)
app.use(cookieParser())




// Gouri@2004 ,Anish@2004,Malla@2004

app.listen(port,()=> console.log(`server started on port No ${port}`));