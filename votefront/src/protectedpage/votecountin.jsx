
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaVoteYea } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";

function Protectedvotecount() {
  const navigate = useNavigate();
  const [candidate, SetCandidate] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  let data = true;
motion;
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await fetch("http://localhost:3000/user/votecount", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401 || res.status === 403) return navigate("/login");
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        SetCandidate(data);
      } catch (error) {
        console.error({ error: error.message });
        return navigate("/login");
      }
    };
    fetchdata();
  }, [navigate]);

  return (
    <>
      <div>
        {/* Navbar */}
        <div className="h-14 w-full bg-white shadow-lg flex justify-between items-center px-3 relative">
          {/* Logo */}
          <div
            className="h-13 w-52 p-1 flex items-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("/")}
          >
            <div className="h-11 w-12 flex items-center px-2 py-1">
              <FaVoteYea className="h-8 w-8 text-blue-500" />
            </div>
            <div className="h-11 w-32 py-1 text-[22px] text-black font-light cursor-pointer hover:text-blue-600 transition-colors">
              VoteHub
            </div>
          </div>

          {/*  Desktop Buttons (Visible only on large screens) */}
          <div className="hidden md:flex h-12 w-auto items-center">
            <button
              className="h-9 w-40 rounded-2xl bg-blue-500 text-[17px] text-white cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all"
              onClick={() => navigate("/userprofile")}
            >
              Profile
            </button>

            <button
              className="h-9 w-40 rounded-2xl bg-blue-500 mx-4 text-[17px] text-white cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all"
              onClick={() => navigate("/profilepage")}
            >
              Candidate List
            </button>
          </div>

          {/* Mobile / Tablet Menu Icon */}
          <div
            className="md:hidden flex items-center cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <GiHamburgerMenu className="text-[28px] text-blue-600" />
          </div>
        </div>

        {/*  Mobile / Tablet Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="dropdown"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden flex flex-col items-center bg-white shadow-md py-3"
            >
              <div
                className="w-full text-center py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => {
                  navigate("/userprofile");
                  setMenuOpen(false);
                }}
              >
                Profile
              </div>
              <div
                className="w-full text-center py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => {
                  navigate("/profilepage");
                  setMenuOpen(false);
                }}
              >
                Candidate List
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/*  Quote */}
        <div className="h-15 w-full my-2 flex justify-center items-center text-[21px] text-green-700 text-center px-2">
          “Cast your vote wisely, choose the best leader for a better future.”
        </div>
      </div>

      {/*  Candidate List Section */}
      {data && (
        <div className="flex flex-col items-center justify-between m-3">
          {candidate.map((candidate, index) => (
            <div
              className="h-auto w-full md:w-245 bg-amber-300 rounded-[8px] flex flex-col md:flex-row items-center justify-center px-3 my-3"
              key={index}
            >
              <div className="h-10 w-full md:w-80 bg-blue-400 flex items-center justify-center text-[20px] md:text-[22px] text-center">
                Electorname: {candidate.electorname}
              </div>
              <div className="h-10 w-full md:w-175 bg-cyan-400 text-[18px] md:text-[20px] flex items-center justify-center text-center mt-2 md:mt-0">
                Total votes this candidate got is: {candidate.total}
              </div>
            </div>
          ))}
        </div>
      )}

      {!data && (
        <div className="text-[25px] flex justify-center items-center m-6 text-rose-500 text-center px-3">
          The Result will be announced soon
        </div>
      )}
    </>
  );
}

export { Protectedvotecount };
             







// import React, { useEffect, useState } from "react"
// import {  useNavigate } from "react-router-dom";
// import { FaVoteYea } from "react-icons/fa";
// function Protectedvotecount() {
//     const navigate = useNavigate();
//     const [candidate,SetCandidate]=useState([]);
//     let data = false;
//     useEffect(()=>{

//         const fetchdata=async()=>{
         
//            try {  
//            const token = localStorage.getItem('token'); 
//            if(!token) return navigate('/login')

//         const res = await fetch('http://localhost:3000/user/votecount',{
//            headers: { 
//               Authorization : `Bearer ${token}`},
//         })

//         if(res.status === 401){
//            return navigate('/login')
//         }
//         else if(res.status === 403){
//           return  navigate('/login')
//         }
//         if (!res.ok) throw new Error("Failed to fetch data");
//        const data = await res.json()
//        SetCandidate(data)
//         }catch(error){
//            console.error({error:error.message})
//            return  navigate('/login')
//         }
//         }
//         fetchdata()
//       } ,[navigate]);

//     return (
//    <>
//    <div>
//    <div className="h-14 w-full bg-white shadow-lg flex justify-between items-center px-2">
//    <div className='h-13 w-52  p-1 flex items-center cursor-pointer' onClick={() => navigate("/")}>
//     <div className='h-11 w-12    flex items-center px-2 py-1'>
//     <FaVoteYea className='h-8 w-8 text-blue-500'/>
//         </div>
//     <div className='h-11 w-32   py-1 text-[22px] text-black font-light cursor-pointer' onClick={() => navigate("/")}>VoteHub</div>
//    </div>
//    <div className="h-12 w-90 flex items-center">
//    <button  className='h-9 w-40 rounded-2xl bg-blue-500 text-[17px] text-white cursor-pointer' onClick={() => navigate("/userprofile")}>profile</button>



// <button className='h-9 w-40 rounded-2xl bg-blue-500   mx-5 text-[17px] text-white cursor-pointer text-center'onClick={() => navigate("/profilepage")} >Candidatelist</button>
//    </div>
//    </div>
   
//    <div className=" h-15 w-full my-2 flex justify-center items-center text-[21px] text-green-700">“Cast your vote wisely, choose the best leader for a better future.</div>
//    </div>
//    {data &&
//    <div className="flex flex-col items-center justify-between m-3">
//     {candidate.map((candidate,index)=> (
//     <div className="h-12 w-245 bg-amber-300 rounded-[8px] flex items-center px-3 my-3" key={index}>
//         <div className="h-10 w-80 bg-blue-400 mr-2 flex items-center text-[22px] px-2">Electorname: {candidate.electorname}</div> 
//         <div className="h-10 w-175 bg-cyan-400 text-[20px] flex items-center px-3">Total votes this candidate got is: {candidate.total}</div> 
//         </div> 

//            ))}
      
//    </div>
//            } {!data && <div className="text-[25px] flex justify-center items-center m-6 text-rose-500">The Result will be announced soon</div> }
//    </>
//     )
// }

// export { Protectedvotecount}