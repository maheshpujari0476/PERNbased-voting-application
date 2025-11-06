import React, { useEffect, useState } from "react"
import {  useNavigate } from "react-router-dom";
import { FaVoteYea } from "react-icons/fa";
function Votecountlist() {
    const navigate = useNavigate();
    const [candidate,SetCandidate]=useState([]);
    let data = false;
   
    useEffect(()=>{
    fetch('http://localhost:3000/user/votecount')
        .then((res)=> res.json())
        .then((data)=> SetCandidate(data)).catch((error)=>{
            console.error({error:error.message})
        })
    },[])
    return (
   <>
   <div>
   <div className="h-14 w-full bg-white shadow-lg flex justify-between items-center px-2">
   <div className='h-13 w-52  p-1 flex items-center cursor-pointer' onClick={() => navigate("/")}>
    <div className='h-11 w-12    flex items-center px-2 py-1'>
    <FaVoteYea className='h-8 w-8 text-blue-500'/>
        </div>
    <div className='h-11 w-32   py-1 text-[22px] text-black font-light cursor-pointer' onClick={() => navigate("/")}>VoteHub</div>
   </div>
   <div className="h-12 w-40 flex items-center">
   {/* <button  className='h-9 w-40 rounded-2xl bg-blue-500 text-[17px] text-white cursor-pointer' onClick={() => navigate("/userprofile")}>profile</button> */}
<button className='h-9 w-40 rounded-2xl bg-blue-500   mx-5 text-[17px] text-white cursor-pointer text-center'onClick={() => navigate("/login")} >Login</button>
   </div>
   </div>
 
   </div>

   {data &&

   <div className="flex flex-col items-center justify-between">
      <div className=" h-15 w-full my-2 flex justify-center items-center text-[21px] text-green-700">'If you want to vote  than please Register and Login'</div>

    {candidate.map((candidate,index)=> (
    <div className="h-12 w-245 bg-amber-300 rounded-[8px] flex items-center px-3 my-3" key={index}>
        <div className="h-10 w-80 bg-blue-400 mr-2 flex items-center text-[22px] px-2">Electorname: {candidate.electorname}</div> 
        <div className="h-10 w-175 bg-cyan-400 text-[20px] flex items-center px-3">Total votes this candidate got is: {candidate.total}</div> 
        </div> 
           ))}
   </div>
} {!data && <div className="text-[25px] flex justify-center items-center m-6 text-rose-500">The Result will be announced soon</div> }
   </>
    )
}
export { Votecountlist }


