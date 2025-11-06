
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaVoteYea, FaBars } from "react-icons/fa";

function Profilepage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await fetch("http://localhost:3000/admin/candidatedata", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          return navigate("/login");
        }

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error({ error: error.message });
      }
    };
    fetchdata();
  }, [navigate]);

  return (
    <>
      {/*  NAVBAR */}
      <div className="h-14 w-full bg-white shadow-lg flex justify-between items-center px-4 relative">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaVoteYea className="h-8 w-8 text-blue-500" />
          <span className="text-[22px] text-black font-light ml-2">VoteHub</span>
        </div>

        {/* Buttons for large screens */}
        <div className="hidden md:flex items-center">
          <button
            className="h-9 w-40 rounded-2xl bg-blue-500 text-[17px] text-white cursor-pointer"
            onClick={() => navigate("/userprofile")}
          >
            Profile
          </button>

          <button
            className="h-9 w-40 rounded-2xl bg-blue-500 mx-5 text-[17px] text-white cursor-pointer"
            onClick={() => navigate("/votecountin")}
          >
            Vote Count
          </button>
        </div>

        {/* Menu Icon for mobile/tablet */}
        <div
          className="md:hidden cursor-pointer text-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={25} />
        </div>

        {/*  Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-14 right-4 bg-white shadow-md rounded-lg w-40 flex flex-col items-center py-2 z-50">
            <div
              className="w-full px-4 py-2 hover:bg-blue-100 text-center text-blue-600 cursor-pointer"
              onClick={() => {
                navigate("/userprofile");
                setMenuOpen(false);
              }}
            >
              Profile
            </div>
            <div
              className="w-full px-4 py-2 hover:bg-blue-100 text-center text-blue-600 cursor-pointer"
              onClick={() => {
                navigate("/votecountin");
                setMenuOpen(false);
              }}
            >
              Vote Count
            </div>
          </div>
        )}
      </div>

      {/*  CONTENT */}
      <div className="p-6">
        <h1 className="text-[25px] font-medium mb-6 text-center">
          Candidate List
        </h1>
        <p className="text-center text-[20px] text-green-700">
          “Cast your vote wisely, choose the best leader for a better future.”
        </p>

        <div className="flex flex-wrap justify-center items-center">
          <div className="text-[20px] text-red-600">{message}</div>

          {users.map((user, index) => (
            <div
              key={index}
              className="bg-gray-200 flex flex-col sm:flex-row items-center w-full sm:items-start justify-center m-2 p-4 rounded-md shadow-md sm:w-[90%] md:w-[80%] lg:w-[70%] transition-all duration-300"
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
              <div className=" rounded-md mt-3 sm:mt-0 sm:ml-4 p-6 sm:w-full text-black">
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

              {/*  Vote Button */}
              <button
                className="h-10 w-34 bg-amber-500 text-[22px] text-center p-1 rounded-lg cursor-pointer mt-4 sm:mt-0 sm:ml-4"
                onClick={async () => {
                  try {
                    const name = user.name;
                    const image = user.image;
                    const partyname = user.party;
                    const candidatepost = user.post;
                    const token = localStorage.getItem("token");

                    const voter = await axios.post(
                      "http://localhost:3000/user/uservoter",
                      { name, image, partyname, candidatepost },
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    );

                    if (voter.status === 201) {
                      alert("You have voted successfully");
                      setMessage(voter.response.message);
                    }
                  } catch (error) {
                    console.error({ error: error.message });
                    if (error.response) {
                      if (
                        error.response.status === 403 ||
                        error.response.status === 401
                      ) {
                        alert("Sorry you can not vote once again");
                        setMessage(
                          "You have voted already, you can't vote once again"
                        );
                      }
                    }
                  }
                }}
              >
                Vote
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export { Profilepage };














// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaVoteYea } from "react-icons/fa";
// import { Navigate } from "react-router-dom";
// // import { response } from "express";

// function Profilepage(){

//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [message, setMessage] = useState("");

//     useEffect(()=>{
//       const fetchdata=async()=>{
//          try {  
//          const token = localStorage.getItem('token'); 

//          if(!token) return navigate('/login')

//       const res = await fetch('http://localhost:3000/admin/candidatedata',{
//          headers: { 
//             "Content-Type": "application/json",
//             Authorization : `Bearer ${token}`},
//       })

//       if(res.status === 401){
//          localStorage.removeItem('token')
//          return navigate('/login')
//       }
//       else if(res.status === 403){
//          localStorage.removeItem('token')
//         return  navigate('/login')
//       }

//      const data = await res.json()
//      setUsers(data)

//       }catch(error){
//          console.error({error:error.message})
//       }
//       }
//       fetchdata()
//     },[navigate]);
   

//  return (
//     <>
//    <div className="h-14 w-full bg-white shadow-lg flex justify-between items-center px-2">
//    <div className='h-13 w-52  p-1 flex items-center cursor-pointer' onClick={() => navigate("/")}>
//     <div className='h-11 w-12    flex items-center px-2 py-1'>
//     <FaVoteYea className='h-8 w-8 text-blue-500'/>
//         </div>
//     <div className='h-11 w-32   py-1 text-[22px] text-black font-light cursor-pointer' onClick={() => navigate("/")}>VoteHub</div>
//    </div>
//    <div className="h-12 w-90 flex items-center">
//    <button  className='h-9 w-40 rounded-2xl bg-blue-500 text-[17px] text-white cursor-pointer' onClick={() => navigate("/userprofile")}>profile</button>


// <button className='h-9 w-40 rounded-2xl bg-blue-500   mx-5 text-[17px] text-white cursor-pointer text-center'onClick={() => navigate("/votecountin")} >Vote count</button>
//    </div>
//    </div>
//    <div className="p-6">
//       <h1 className="text-[25px] font-medium mb-6 text-center">Candidate List</h1>
//       <p className=" text-center   text-[20px] text-green-700">“Cast your vote wisely, choose the best leader for a better future.”</p>

//       <div className="flex flex-col items-center ">
//     <div className="text-[20px] text-red-600">{message}</div>
//         {users.map((user, index) => (
           
//            <div className=" h-70 w-230 bg-gray-200  m-2 flex py-4 px-4 shadow-lg" key={index}>
//            <div className="h-60 w-60 rounded-md ">
//             <img  src={`http://localhost:3000/${user.image}`}
//   alt={user.name} className="h-full w-full object-cover rounded-md shadow-lg"></img>
//            </div>  

//            <div className="h-60 w-154 mx-2 rounded-md py-5 px-4">
           
//            <h2 className=" font-ligth  text-[21px]"> Name: {user.name}</h2>

//            <h2 className="font-light  text-[21px]">Party: {user.party}</h2>

//            <h3 className="font-light text-[21px]">Age: {user.age}</h3>

//            <h2 className="font-light  text-[21px]">District: {user.district}</h2>
//            <h2 className="font-light  text-[21px]">Taluk: {user.taluk}</h2>
//            <h2 className="font-light  text-[21px]">Post: {user.post}</h2> 
          
//           </div> 

       
//           <button className=" h-10 w-34 bg-amber-500 text-[22px] text-center p-1 rounded-lg cursor-pointer" onClick={async()=>{

//             try{
//             const name = user.name;
//             const image = user.image;
//             const partyname = user.party;
//             const candidatepost=user.post;
//                const token = localStorage.getItem("token")
             
//                const voter = await axios.post('http://localhost:3000/user/uservoter',{name,image,partyname,candidatepost},{
//                   headers:{
//                      Authorization:`Bearer ${token}`
//                   }
//                })
//                // console.log(voter.data)
//                if(voter.status === 201){
//                   alert('You have voted successfully');
//                   setMessage(voter.response.message);
               
//                }
              
//             }catch(error){
//                console.error({error:error.message})
//                if(error.response){
//                 if(error.response.status === 403){
//                   alert('Sorry you can not vote once again')
//                   setMessage('You have voted already you cant vote once again')
//                   // return navigate('/login')
//                 }
//                 if(error.response.status === 401){
//                   alert('Sorry you can not vote once again')
//                   setMessage('You have voted already you cant vote once again')
//                   // return navigate('/login')
//                 }
//                }
//             }

//           }}>Vote</button>  
         
//          </div> 

//         ))}
//       </div>
//     </div> 
//     </>
//  )
// }

// export {Profilepage}