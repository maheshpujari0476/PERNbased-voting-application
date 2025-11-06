import { kMaxLength } from "buffer";
import mongoose  from "mongoose";
import { boolean } from "webidl-conversions";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    mobile:{
     type:String,
    },
    adress:{
        type:String,
        required:true,
    },
    aadharCardNo:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter',
    },
    isVoted:{
        type:Boolean,
        default:false,
    }
})

const User = new mongoose.model('User',userSchema)

// export{
//     User,
// }