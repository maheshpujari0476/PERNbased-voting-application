import jwt from "jsonwebtoken"
import argon2 from "argon2"
import dotenv from 'dotenv';
dotenv.config();
import {pool} from '../models/post.js'
import cookieParser from "cookie-parser";

export const register=async(req,res)=>{
    try{
    const {name,aadharCardNo,age,mobile,address,password,email}= req.body;
   

    // checks every field which should not be empty
    if(!name  || !aadharCardNo || !age || !mobile || !address || !password) return res.status(303).json({message:'All feilds are required first'});

    // some people migth not have the eamail address
    if(email){
        if(!email.includes('@') || !email.endsWith('gmail.com'))return res.status(403).json({message:"Email format is wrong"})}

    // the entered password should have atleast eight characters
    if(password.length < 8) return res.status(400).json({message:'Password length must be atleast eight characters'});
   

    // checks the exixstence of the user based on aadharcardno if satisfied return already exist
    const user = await pool.query('SELECT * FROM voters WHERE aadharCardNo = $1',[aadharCardNo]);
   if(user.rows.length > 0) return res.status(401).json({message:'user already exist'});

  // checks wheather the password is strong or not  if true returns as below
  
  const passpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!passpattern.test(password)) {
  return res.status(405).json({
    message:
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
  });
}
//  localStorage 


    // password is hashed and the data is inserted into the database with the hash password and stored
   const hashpass = await argon2.hash(password)    
   const voter= await pool.query(
    `INSERT INTO voters(name,aadharCardNo,age,mobile,address,password,email) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,[name,aadharCardNo,age,mobile,address,hashpass,email]
    )
    
   console.log(voter.rows)
   return res.status(201).json(voter.rows)
}catch(error){
    console.error({error:error.message})
    return res.status(502).json({error:error.message})
}
}


export const voterlogin = async(req,res)=>{
    try{
   const {aadharCardNo,password} = req.body;
  
   //checks for every feilds which should not be empty    
   if(!password || !aadharCardNo) return res.json({message:'All feilds are required'})
 
   

    // hecks for the existence of the user if not return below
    const adno = await pool.query('SELECT * FROM voters WHERE aadharCardNo=$1',[aadharCardNo])
    if(!adno.rows[0]) return res.status(404).json({message:`User does not exits please register or check your credentials`})

    if(password.length < 8) return res.status(402).json({message:'Password length must be atleast eight characters'});    
   
 
     // verifies the entered password with the password present in the database using argon2 method  if not return below
    const passverify= await argon2.verify(adno.rows[0].password, password)
     if(!passverify) return res.status(401).json({message:'Password donest  match'});
     
    
    // generates the token based on user credentials
      const token = generatetoken(aadharCardNo,password)

    //  generated token is updated into the database
    const tokendata = await pool.query('UPDATE voters SET token=$1 WHERE aadharCardNo=$2 RETURNING *',[token,aadharCardNo])
     console.log(tokendata.rows[0])

     if(!tokendata.rows[0]) return res.status(403).json({message:'something went wrong while updating the data'})
    return res.status(201).json({message:'Login successfull',data:tokendata.rows[0]})    
    }
    
    catch(error){
        console.error({error:error.message})
        return res.status(302).json({message:'something went wrong',error:error.message})
    }
    }


     const generatetoken=(aadharCardNo,password,res)=>{
        try{
       const payload= {aadharCardNo,password}
       //token generation if not return below
       const token=jwt.sign({id:payload},process.env.secretkey,{expiresIn:'1d'});
    
        if(!token) return res.status(407).json({message:'something went wrong token not genrated'})
      return token
        }catch(error){
            console.error({error:error.message})
            return res.status(504).json({message:'something went wrong while token genration',error:error.message})
        }
    }



    export const updateuserpass =async(req,res)=>{
        try{
             const {aadharCardNo,oldpassword,newpassword}=req.body;
              
            //  checks the exixtence of the user from database
             const user= await pool.query('SELECT * FROM voters WHERE aadharCardNo=$1',[aadharCardNo])
             if(!user) return res.status(503).json({message:'User doesnt exist.'});

            // checks the length of the password
            if(newpassword.length < 8) return res.status(303).json({message:'Password must be atleast 8 charecters.'})
             
            // verifies wheather the entered oldpassword matches the password present in the database
            const oldverify= await argon2.verify(user.rows[0].password , oldpassword)
            if(!oldverify) return res.json({message:'Old password is not correct'})
 

             // checks wheather the newpassword is diffrent from the oldpassword 
            const passverify = await argon2.verify(user.rows[0].password,newpassword)
            if(passverify) return res.json({message:'Your new password must be diffrent from the oldpassword'});

            // checks wheather the passowrd is strong enough or not.   
            const passcheck =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
            if(!passcheck.test(newpassword)) return res.status(306).json({message:'Password must conatin one uppercase ,lowercase and special charecters.'})
            
           // entered new password is hashed 
            const newpasshash = await argon2.hash(newpassword) 

            // the hashed password is updates into the database
            const updatepass = await pool.query('UPDATE voters SET password = $1 WHERE aadharCardNo = $2 RETURNING *',[newpasshash,aadharCardNo])
            
            // if not hashed returns an error
            if(!updatepass) return res.status(305).json({message:'Something went wrong while updating the password'})
            
             // returns the updated password with user 
            return res.status(201).json({message:'Password updated successfully'});    
        }catch(error){
            console.error({error:error.message})
            return res.status(404).json({message:error.message})
        }
    }

   export const uservoteing =async(req,res)=>{
    try{
      const {aadharCardNo,mobile,age,password}=req.body;
      
      if(!aadharCardNo || !mobile || !age || !password)  return res.status(504).json({message:'All feilds are required'})

       
        const voter = await pool.query('SELECT * FROM VOTERS WHERE aadharCardNo=$1',[aadharCardNo])
        if(!voter) return res.status(407).json({message:'voter not found'})

         // verifing the password based on user data if match goes  
      const passverify = await argon2.verify(voter.rows[0].password,password)  
    if(!passverify) return res.json({message:'Pasword does not match'})

    return res.status(201).json({data:voter.rows})



    }catch(error){
        console.error({message:error.message})
        return res.status(404).json({message:error.message})
    }

    }


    export const electionlist = async(req,res)=>{
        try{
            // selecting all candidates from the database
            const data = await pool.query('SELECT name,age,party FROM candidate')
            if(!data) return res.status(309).json({message:'something went wrong'})

              return res.status(201).json({message:'list of all candidate',data:data.rows})  
        }catch(error){
            console.error({error:error.message})
            return res.status(404).json({message:error.message})
        }
    }

    export const uservoter= async(req,res)=>{
    try{
            // const {aadharCardNo}=req.body;
            const authtoken= req.headers.authorization;
            // console.log(authtoken)
            const {name,image,partyname,candidatepost} = req.body;
            // console.log(name,image,partyname,candidatepost)
            const tokenfrom = authtoken.split(' ')[1];
            // console.log(tokenfrom)
        
            const tokenuser = await pool.query('SELECT * FROM voters WHERE token=$1',[tokenfrom])
                 
            if(!tokenuser.rows[0]) return res.status(404).json({message:'Please login once again'});


            let tokenaddhar = Number(tokenuser.rows[0].aadharcardno);
            let tokenmobile = Number(tokenuser.rows[0].mobile)
            // checking the exixtence of the user from the database
            const existingvoter = await pool.query('SELECT * FROM votecount WHERE aadharCardNo=$1',[tokenaddhar])
            

            // if found then the entered user can not vote
            if(existingvoter.rows[0]) return res.status(403).json({message:'Sorry you have voted already can not vote once again'})
           
            // if all the consition are staisfied then the values are inserted into database
            const voted = await pool.query('INSERT INTO votecount(electorname,aadharCardNo,mobilenumber,partyname,candidatepost,candidateimage)VALUES($1,$2,$3,$4,$5,$6) RETURNING *',[name,tokenaddhar,tokenmobile,partyname,candidatepost,image])
            return res.status(201).json({message:'You have voted successfully'})

        }catch(error){
            console.error({error:error.message})
            return res.status(405).json({message:error.message})
        }
    

    }


    // count the vote based on the elector name and display it
    export const votecount=async(req,res)=>{
        try{
           const data = await pool.query(' SELECT electorname,COUNT(*) AS total  FROM votecount GROUP BY electorname')
           return res.status(201).json(data.rows)
        }catch(error){
            console.error({error:error.message})
            return res.status(404).json({message:error.message})
        }

    }




// use only if needed other wise use login istead off this
    export const refreshtoken=async(req,res)=>{
        const refreshtoken = req.cookies.refreshtoken;
        const {aadharCardNo,password}= req.body;
        const payload = {aadharCardNo,password}

        if(!refreshtoken) res.status(401).json({error:'No refresh Token'})

        try{
            const verify =  jwt.verify(refreshtoken,process.env.secretkey)
            const newtoken = jwt.sign({id:payload},process.env.secretkey,{expiresIn:'15m'})
            res.json({accessstoken:newtoken})
        }catch(error){
            console.error({error:error.message})
            return res.status(404).json({message:'something went wrong'})
        }    
    }