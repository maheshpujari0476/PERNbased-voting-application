import express from 'express'
import pkg from 'pg'
import dotenv from 'dotenv';
dotenv.config()

const {Pool} = pkg;

const pool = new Pool({
    user:process.env.PG_USER,
    password:process.env.PG_PASSWORD,
    host:process.env.PG_HOST,
    port:process.env.PG_PORT,
    database:process.env.PG_DATABASE
})

pool.connect((error)=> {
    if(error)  console.log({error:error.message})
    else console.log('postgres sql connected successfully')
})

export{
    pool,
}