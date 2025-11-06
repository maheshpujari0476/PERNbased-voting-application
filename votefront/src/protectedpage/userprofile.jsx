import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { FaVoteYea } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

const Userprofile = () => {
    const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    
    const fetchUser = async () => {
      try {
      
        const token = localStorage.getItem('token'); 
           if(!token) return navigate('/login')
        const res = await fetch('http://localhost:3000/user/userprofile',{
           headers: { 
              Authorization : `Bearer ${token}`},
        })
        if(res.status === 401){
            localStorage.removeItem('token')
            return navigate('/login')
         }
         else if(res.status === 403){
            localStorage.removeItem('token')
            return navigate('/login')
         }
        const data = await res.json()
        setUser(data)
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  },[navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  if (!user) return <div className="text-center text-xl mt-10">Loading...</div>;

  const tokendestroy=()=>{
     localStorage.removeItem('token')
    alert('token deleted successfully')
    return navigate('/')
  }

  return (
    <>
    <nav className='h-13 w-full flex items-center justify-between p-2 mb-2 '>
    <div className='h-13 w-52  p-1 flex items-center cursor-pointer' onClick={() => navigate("/")}>
     <div className='h-11 w-12    flex items-center px-2 py-1'>
     <FaVoteYea className='h-8 w-8 text-blue-500'/>
         </div>
     <div className='h-11 w-32   py-1 text-[22px] text-black font-light cursor-pointer' onClick={() => navigate('/')}>VoteHub</div>
    </div>
 
    
    {/* <button
className="h-9 w-40 rounded-2xl bg-blue-500 mx-4 text-[17px] text-white cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all"
              onClick={() => navigate("/profilepage")}
            >
              Candidate List
            </button> */}
    <div className='h-14 w-184 m-3'></div>
    <div className='h-13 w-80  flex items-center p-2'>
 
   
     <button  className='h-9 w-40 rounded-2xl bg-blue-500 text-[17px] text-white cursor-pointer' onClick={tokendestroy}>Logout</button>
     {/* <button  className='h-9 w-40 rounded-2xl bg-blue-500 text-[17px] text-white cursor-pointer' onClick={navigate("/profilepage")}>Logout</button> */}
 
     <button className='h-9 w-40 rounded-2xl bg-blue-500   mx-5 text-[17px] text-white cursor-pointer'onClick={() => navigate("/profilepage")} >Candidatelist</button>
 
 
    </div>
    </nav>


    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center border border-gray-200">
        
        {/* Profile Image Section */}
        <div className="relative w-28 h-28 mx-auto mb-4">
          <img
            src={image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="User Avatar"
            className="w-28 h-28 mx-auto rounded-full border-4 border-blue-500 object-cover"
          />

          {/* Plus Icon Overlay */}
          <label
            htmlFor="fileInput"
            className="absolute bottom-0 right-2 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700"
          >
            ➕
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* User Info */}
        {user.map((user,index)=> (
        <div key={index}>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
        <p className="text-gray-500 mb-6">ID: {user.aadharcardno}</p>

        <div className="text-left space-y-2">
          <p><span className="font-semibold text-gray-700">📧 Email:</span> {user.email}</p>
          <p><span className="font-semibold text-gray-700">🎂 Age:</span> {user.age}</p>
          <p><span className="font-semibold text-gray-700">📱 Mobile:</span> {user.mobile}</p>
          <p><span className="font-semibold text-gray-700">🏠 Address:</span> {user.address}</p>
        </div>

        </div>
        ))}
     

        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
    </>
  );
};

export { Userprofile };