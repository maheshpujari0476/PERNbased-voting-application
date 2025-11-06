import mongoose from "mongoose"

const db = mongoose.connect('mongodb://127.0.0.1:27017/votingapplication')
.then(()=> console.log('momgodb connected successfully'))
.catch((error)=>console.error({error:error.message}))


export{
    db
}