
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaVoteYea, FaBars } from "react-icons/fa";

function Electorslist() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/admin/candidatedataout")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error({ error: error.message }));
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div className="h-14 w-full bg-white shadow-lg flex justify-between items-center px-4 relative">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaVoteYea className="h-8 w-8 text-blue-500" />
          <span className="text-[22px] text-black font-light ml-2">
            VoteHub
          </span>
        </div>

        {/* Buttons for large screens */}
        <div className="hidden md:flex items-center">
          <button
            className="h-9 w-40 rounded-2xl bg-blue-500 text-[17px] text-white cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="h-9 w-40 rounded-2xl bg-blue-500 mx-5 text-[17px] text-white cursor-pointer text-center"
            onClick={() => navigate("/votecount")}
          >
            Vote Count
          </button>
        </div>

        {/*  Menu Icon for mobile/tablet */}
        <div
          className="md:hidden cursor-pointer text-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={25} />
        </div>

        {/* Dropdown Menu for mobile/tablet */}
        {menuOpen && (
          <div className="absolute top-14 right-4 bg-white shadow-md rounded-lg w-40 flex flex-col items-center py-2 z-50">
            <div
              className="w-full px-4 py-2 hover:bg-blue-100 text-center text-blue-600 cursor-pointer"
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
            >
              Login
            </div>
            <div
              className="w-full px-4 py-2 hover:bg-blue-100 text-center text-blue-600 cursor-pointer"
              onClick={() => {
                navigate("/votecount");
                setMenuOpen(false);
              }}
            >
              Vote Count
            </div>
          </div>
        )}
      </div>


   <div className=" h-15 w-full my-2 flex justify-center items-center text-[21px] text-green-700">'If you want to vote  than please Register and Login'</div>
    <div className="p-6">
      <h1 className="text-[25px] font-medium mb-6 text-center">Candidate List</h1>

      <div className="flex flex-wrap justify-center items-center">
  {users.map((user, index) => (
    <div
      key={index}
      className="bg-cyan-300 flex flex-col sm:flex-row items-center w-full sm:items-start justify-center m-2 p-4 rounded-md shadow-md  sm:w-[90%] md:w-[80%] lg:w-[70%] transition-all duration-300"
    >
      {/* Candidate Image */}
      <div className="h-48 w-48 sm:h-60 sm:w-60 rounded-md overflow-hidden">
        <img
          src={`http://localhost:3000/${user.image}`}
          alt={user.name}
          className="h-full w-full object-cover rounded-md"
        />
      </div>

      {/* Candidate Details */}
      <div className="bg-blue-400 rounded-md mt-3 sm:mt-0 sm:ml-4 p-6  sm:w-full text-black">
        <h2 className="font-light text-[20px] sm:text-[21px]">
          Name: {user.name}
        </h2>
        <h2 className="font-light text-[20px] sm:text-[21px]">
          Party: {user.party}
        </h2>
        <h3 className="font-light text-[20px] sm:text-[21px]">
          Age: {user.age}
        </h3>
        <h2 className="font-light text-[20px] sm:text-[21px]">
          District: {user.district}
        </h2>
        <h2 className="font-light text-[20px] sm:text-[21px]">
          Taluk: {user.taluk}
        </h2>
        <h2 className="font-light text-[20px] sm:text-[21px]">
          Post: {user.post}
        </h2>
      </div>
    </div>
  ))}
</div>
    </div>
 </>
  );
}

export{ Electorslist};











// import React, { useState, useEffect } from "react";
// // import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaVoteYea } from "react-icons/fa";
// import { Profilepage } from '../protectedpage/profilepage'
// // import {Homepage} from './home'
// function Electorslist() {
//   const navigate = useNavigate();
//         const [users, setUsers] = useState([]);
//         useEffect(()=>{
//            fetch('http://localhost:3000/admin/candidatedataout')
//            .then((res)=> res.json())
//            .then((data)=>  setUsers(data)).catch((error)=>{
//             console.error({error:error.message})
//            })
          
//         },[]);
//   return (

//    <>
//    <div className="h-14 w-full bg-white shadow-lg flex justify-between items-center px-2">
//    <div className='h-13 w-52  p-1 flex items-center cursor-pointer' onClick={() => navigate("/")}>
//     <div className='h-11 w-12    flex items-center px-2 py-1'>
//     <FaVoteYea className='h-8 w-8 text-blue-500'/>
//         </div>
//     <div className='h-11 w-32   py-1 text-[22px] text-black font-light cursor-pointer' onClick={() => navigate("/")}>VoteHub</div>
//    </div>
//    <div className="h-12 w-90 flex items-center">
//    <button  className='h-9 w-40 rounded-2xl bg-blue-500 text-[17px] text-white cursor-pointer' onClick={() => navigate("/login")}>Login</button>


// <button className='h-9 w-40 rounded-2xl bg-blue-500   mx-5 text-[17px] text-white cursor-pointer text-center'onClick={() => navigate("/votecount")} >Vote count</button>
//    </div>
//    </div>

//    <div className=" h-15 w-full my-2 flex justify-center items-center text-[21px] text-green-700">'If you want to vote  than please Register and Login'</div>
//     <div className="p-6">
//       <h1 className="text-[25px] font-medium mb-6 text-center">Candidate List</h1>

//       {/* Responsive Grid */}
//       <div className="flex flex-col items-center ">
//         {users.map((user, index) => (

//           <div className=" h-70 w-230 bg-cyan-300  m-2 flex py-4 px-4" key={index}>
//           <div className="h-60 w-60 rounded-md">
//             <img  src={`http://localhost:3000/${user.image}`}
//   alt={user.name} className="h-full w-full object-cover rounded-md"></img>
//           </div>

//           <div className="h-60 w-164 bg-blue-400 mx-2 rounded-md py-5 px-4">
          
//           <h2 className=" font-ligth  text-[21px]"> Name: {user.name}</h2>

//           <h2 className="font-light  text-[21px]">Party: {user.party}</h2>

//           <h3 className="font-light text-[21px]">Age: {user.age}</h3>

//           <h2 className="font-light  text-[21px]">District: {user.district}</h2>
//           <h2 className="font-light  text-[21px]">Taluk: {user.taluk}</h2>
//           <h2 className="font-light  text-[21px]">Post: {user.post}</h2>
         
//           </div>
         
//           </div>
//         ))}
//       </div>
//     </div>
//  </>
//   );
// }

// export{ Electorslist};