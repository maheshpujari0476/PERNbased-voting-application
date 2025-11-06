import dotenv from 'dotenv';
dotenv.config();
import {pool} from '../models/post.js'


export const candidateelectors=async(req,res)=>{
    try{
   const {name,age,party,district,taluk,post}=req.body;     
   const filepath = req.files.map((file)=> file.path);
   if(!filepath) return res.status(304).json({message:'Image is required'})

   if(!name   || !age || !party || !district || !taluk || !post) return res.status(502).json({message:'All feilds are required'});


   const existuser = await pool.query('SELECT * FROM candidate WHERE name=$1',[name])
   if(existuser.rows.length > 0) return res.status(306).json({message:'Elector  already exist'})
    const imagePath = `${filepath}`;
   const user = await pool.query('INSERT INTO candidate(name,age,party,image,district,taluk,post) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',[name,age,party,imagePath,district,taluk,post,])

   return res.status(201).json({message:'data uploaded successfully',data:user.rows})

    }catch(error){
        console.error({error:error.message})
        return res.status(404).json({message:error.message})
    }
}


export const candidateupdate =async(req,res)=>{
    try{
    const {name,age,party}= req.body;

    if(!name  || !age || !party) return res.status(502).json({message:'All feilds are required'});

    // update based on candidate preference this below code is just sample
    const candidate = await pool.query('UPDATE candidate SET name=$1 WHERE name=$2 RETURNING *',[name])
    if(!candidate) return res.status(305).json({message:'update failed'})

    return res.status(201).json({message:'update successfully',data:candidate.rows})
}catch(error){
    console.error({error:error.message})
    return res.status(404).json({message:error.message});
}
}


export const candidatedelete=async(req,res)=>{
  try{
  const {name,age,party}= req.body;
  if(!name  || !age || !party) return res.status(502).json({message:'All feilds are required'});

  const candidate = await pool.query('DELETE FROM candidate WHERE name=$1 RETURNING *',[name])

  if(!candidate) return res.status(303).json({message:'data not deleted something went wrong'})

    return res.status(201).json({message:'Data deleted successfully',data:candidate.rows})

  }catch(error){
    console.error({error:error.message})
    return res.status(404).json({message:error.message})
  }

}

export const electionlist=async(req,res)=>{
  try{

 const data = await pool.query('SELECT name,age,party from candidate')
 if(!data) return res.status(504).json({message:'Something went wrong'})

  return res.status(201).json({message:'list of electors',data:data.rows});

  }catch(error){
    console.error({error:error.message})
    return res.status(404).json({message:error.messsage})
  }

}

