// import { useState } from 'react'
import {Homepage} from "./pages/home";
import {Registerpage} from "./pages/register";
import {Loginpage} from "./pages/loginpage"
import { Electorslist } from './pages/electors';
import { Votecountlist } from './pages/votecount';
import { Profilepage } from './protectedpage/profilepage';
import { Protectedvotecount } from './protectedpage/votecountin';
import { Userprofile } from "./protectedpage/userprofile";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Protectedroute from "./protectedpage/Protectedroute";

function App() {
  // const [count, setCount] = useState(0);

  return (
    
 
    
      <Router>
             <Routes>
               <Route path="/" element={<Homepage />} />
               <Route path="/register" element={<Registerpage />} />
               <Route path="/login" element={<Loginpage />} />
               <Route path="/electorslist" element={<Electorslist />} />
               <Route path='/votecount' element={<Votecountlist />} />
               <Route path='/userprofile' element={ <Userprofile />} />
               <Route path='/profilepage' element={ 
                <Profilepage />
                } />

               <Route path='/votecountin' element={
               <Protectedvotecount />  
                } />
             </Routes>
           </Router>
  )
}

export default App

