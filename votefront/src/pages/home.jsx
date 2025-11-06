
import React, { useState } from "react";
import { FaVoteYea, FaInstagram, FaFacebook, FaTwitter, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import vidhansouda from '../assets/vidhansouda.jpg'

function Homepage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="h-20 w-full flex items-center justify-between p-2 mb-2 bg-white fixed top-0 left-0 z-50 shadow-sm">
          {/* Logo */}
          <div
            className="h-13 w-52 p-1 flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="h-11 w-12 flex items-center px-2 py-1">
              <FaVoteYea className="h-8 w-8 text-blue-500" />
            </div>
            <div className="h-11 w-32 py-1 text-[22px] text-black font-light cursor-pointer">
              VoteHub
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex h-13 w-80 items-center p-2">
            <button
              className="h-9 w-40 rounded-2xl bg-blue-500 text-[17px] text-white cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </button>

            <button
              className="h-9 w-30 rounded-2xl bg-blue-500 mx-5 text-[17px] text-white cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div
            className="md:hidden relative flex items-center"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <FaBars
              className="text-2xl cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />

            {/* Dropdown (slide-down divs) */}
            <div
              className={`absolute top-10 right-0 w-40 bg-white shadow-md rounded-md transition-all duration-300 overflow-hidden ${
                menuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div
                className="p-3 text-[17px] hover:bg-blue-100 cursor-pointer text-center"
                onClick={() => {
                  navigate("/register");
                  setMenuOpen(false);
                }}
              >
                Register
              </div>
              <div
                className="p-3 text-[17px] hover:bg-blue-100 cursor-pointer text-center"
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
              >
                Login
              </div>
            </div>
          </div>
        </nav>

        {/* Background Section (blur effect kept same) */}
        {/* <div className="h-[400px] md:h-[450px] w-full bg-[url('/vidhansouda.jpg)'] bg-no-repeat bg-center bg-cover blur-[2px] flex justify-center items-center mt-20"></div> */}

        {/* <div className="h-[400px] md:h-[450px] w-full  bg-no-repeat bg-center bg-cover blur-[2px] flex justify-center items-center mt-20" style={{ backgroundImage: `url(${vidhansouda})` }}></div> */}

        <div
  className="h-[400px] md:h-[450px] w-full bg-no-repeat bg-center bg-cover blur-[2px] flex justify-center items-center mt-20"
  style={{ backgroundImage: `url(${vidhansouda})` }}
></div>
        {/* Content */}

        <div className="text-center px-4 mt-6">
          <div className="text-[40px] font-semibold font-serif">Welcome to VoteHub</div>
          <div className="text-[15px] font-extralight mt-2 font-serif max-w-3xl mx-auto">
            VoteHub is your go-to platform for all voting-related activities. Whether
            you're registering, checking your elector status, or reviewing your vote
            history, we make the process simple and accessible for everyone.
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
            <button
              className="h-10 w-40 bg-blue-500 text-[16px] rounded-2xl text-white cursor-pointer"
              onClick={() => navigate("/electorslist")}
            >
              View Electors
            </button>
            <button
              className="h-10 w-40 bg-blue-500 text-[16px] rounded-2xl text-white cursor-pointer"
              onClick={() => navigate("/votecount")}
            >
              Vote History
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="h-auto w-full bg-gray-300 flex flex-col md:flex-row items-center justify-between px-4 mt-8 py-3">
          <div className="flex flex-col md:flex-row items-center justify-around text-center space-y-2 md:space-y-0">
            <div className="p-1 cursor-pointer">About Us</div>
            <div className="p-1 cursor-pointer md:ml-4">Contact</div>
            <div className="p-1 cursor-pointer md:ml-4">Privacy Policy</div>
          </div>

          <div className="flex items-center justify-center mt-3 md:mt-0">
            <button className="h-8 w-8 m-1 flex items-center justify-center">
              <FaFacebook className="h-5 w-5 cursor-pointer" />
            </button>
            <button className="h-8 w-8 m-1 flex items-center justify-center">
              <FaTwitter className="h-5 w-5 cursor-pointer" />
            </button>
            <button className="h-8 w-8 m-1 flex items-center justify-center">
              <FaInstagram className="h-5 w-5 cursor-pointer" />
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}

export { Homepage };







// import React  from 'react'
// import { FaVoteYea } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa"
// import { FaFacebook } from "react-icons/fa"
// import { FaTwitter } from "react-icons/fa"
// import { useNavigate } from "react-router-dom";
// function Homepage() {
//   const navigate = useNavigate();

//   return (
//     <>
//    <div>
//    <nav className='h-20 w-full flex items-center justify-between p-2 mb-2 '>
//    <div className='h-13 w-52  p-1 flex items-center cursor-pointer' onClick={() => navigate("/")}>
//     <div className='h-11 w-12    flex items-center px-2 py-1'>
//     <FaVoteYea className='h-8 w-8 text-blue-500'/>
//         </div>
//     <div className='h-11 w-32   py-1 text-[22px] text-black font-light cursor-pointer' onClick={() => navigate("/")}>VoteHub</div>
//    </div>
//    <div className='h-14 w-184 m-3 '></div>
//    <div className='h-13 w-80  flex items-center p-2'>

  
//     <button  className='h-9 w-40 rounded-2xl bg-blue-500 text-[17px] text-white cursor-pointer' onClick={() => navigate("/register")}>Register</button>


//     <button className='h-9 w-30 rounded-2xl bg-blue-500   mx-5 text-[17px] text-white cursor-pointer'onClick={() => navigate("/login")} >Login</button>


//    </div>
//    </nav>

// <div className='h-100 w-full bg-[url(vidhansouda.jpg)] bg-no-repeat  bg-center bg-cover blur-[2px]  flex justify-center items-center'></div>


//  <div className='h-13 w-200  text-[27px] font-semibold text-center p-2 flex justify-center items-center mx-56 font-serif'>Welcome to VoteHub</div>
//  <div className='h-13 w-200  text-[13px] font-extralight text-center p-2 flex justify-center items-center mx-57 font-serif'>VoteHub is your go-to platform for all voting-related activities .Whether you're registering , checking your elector status, or reviewing your vote history,we make the process simple andaccessible for everyone</div>
//  <div className='h-12 w-190  mx-63 my-2 p-2 flex items-center'>
 
//     <button className='h-10 w-90 bg-blue-500 m-2 text-[16px] text-center py-2 rounded-2xl text-white cursor-pointer' onClick={() => navigate("/electorslist")} >View Electors</button>
    

//     <button className='h-10 w-90 bg-blue-500 m-2 text-[16px] text-center py-2 rounded-2xl text-white cursor-pointer' onClick={() => navigate("/votecount")}>Vote History</button>

//  </div>
// <div className='h-19 w-full '></div>
// <footer className='h-21 w-full bg-gray-300 flex  items-center justify-between px-4'>
//     <div className='h-10 w-74  p-1 flex items-center justify-around text-center'>
//         <div className='h-8 w-20  p-1 cursor-pointer'>About Us</div>
//         <div className='h-8 w-20  p-1 cursor-pointer'>Contact</div>
//         <div className='h-8 w-28  p-1 cursor-pointer'>Privacy Policy</div>
//     </div>
//     <div className='h-10 w-30  flex items-center px-2'>
//         <button className='h-8 w-8  m-1 flex items-center p-1'><FaFacebook className='h-5 w-5 cursor-pointer'/></button>
//         <button className='h-8 w-8  m-1 flex items-center p-1'><FaTwitter className='h-5 w-5 cursor-pointer'/></button>
//         <button className='h-8 w-8  m-1 flex items-center p-1'><FaInstagram className='h-5 w-5 cursor-pointer'/></button>
//     </div>
// </footer>

//    </div>
//     </>
//   )
// }

// export { Homepage }