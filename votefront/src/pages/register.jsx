
import {  useState } from 'react'
import {Homepage} from './home'
import axios from 'axios'
// import './App.css'
import { useNavigate } from "react-router-dom";
function Registerpage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
 const [formdata,setFormdata] = useState({
  name: "",
  aadharCardNo: "",
  age: "",
  email: "",
  mobile: "",
  address: "",
  password: ""
 })
 const [message, setMessage] = useState("");
 const handlechange = async(e)=>{



  setFormdata({...formdata,[e.target.name]: e.target.value})
  // setLoading(true)
  //   setMessage("");
 }

const submitted = async (e) => {
  e.preventDefault(); 
  setLoading(true);

  try {
    // ✅ send formData to backend
    const data = await axios.post("http://localhost:3000/user/register",formdata);

    if(data.status === 201){
      setMessage("✅ Registered successfully! Redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  } catch (error) {
    console.error("⚠️ Error sending data:", error);
    if(error.response){
      if(error.response.status === 303){
        setMessage(error.response.data.message)
      }
      else if(error.response.status === 403){
        setMessage(error.response.data.message)
      }
      else if(error.response.status === 400){
        setMessage(error.response.data.message)
      }
      else if( error.response.status === 401){
        setMessage(error.response.data.message)
      }
      else if( error.response.status === 405){
        setMessage(error.response.data.message)
      }else if(error.response.status === 502){
        setMessage(error.response.data.message)
      }
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <>
    <div className='h-dvh w-ful bg-[url(vidhansouda.jpg)] bg-no-repeat bg-center  bg-cover flex justify-center items-center opacity-70'>
        <form action="" className='h-143 w-107  backdrop-blur-md bg-black/3 rounded-[12px] border-1 border-gray-800' onSubmit={submitted}>
        <h1 className='text-gray-800 text-2xl text-center py-3 px-2'>Create Account</h1>

        <label for='name' className='px-2 text-[18px]'>Name:</label>
        <input type="text" placeholder="Full Name" name='name' className="p-2 rounded focus:outline-none w-85  px-2 backdrop-blur-md bg-black/0" onChange={handlechange}  required/>

        <label for='name' className='px-2 text-[18px]'>Aadharcardno:</label>
        <input type="number" placeholder="Aadharno:"name='aadharCardNo'  maxLength="12" className="p-2 rounded focus:outline-none w-68  px-2 backdrop-blur-md bg-black/0 my-3" onChange={handlechange}  required/>

        <label for='name' className='px-2 text-[18px]'>Age:</label>
        <input type="number"  placeholder="Age" name='age'  className="p-2 rounded focus:outline-none w-88  px-2 backdrop-blur-md bg-black/0" onChange={handlechange} required/>

        <label for='name' className='px-2 text-[18px]'>Email:</label>
        <input type="email" placeholder="Email" name='email'  className="p-2 rounded focus:outline-none w-85  px-2 backdrop-blur-md bg-black/0 my-3" onChange={handlechange} />

        <label for='name' className='px-2 text-[18px]'>Password:</label>
        <input type="password" placeholder="Enter your password" name='password'  className="p-2 rounded focus:outline-none w-76  px-2 backdrop-blur-md bg-black/0 my-3" required onChange={handlechange} />


        <label for='name' className='px-2 text-[18px]'>Mobile:</label>
        <input type="number" placeholder="Mobile number" name='mobile'  className="p-2 rounded focus:outline-none w-83  px-2 backdrop-blur-md bg-black/0" required onChange={handlechange} />
        
    
        <textarea
            placeholder="Address"
         className="p-2 rounded focus:outline-none w-98  px-2 backdrop-blur-md bg-black/1 my-3 mx-3" name='address' required onChange={handlechange} 
          ></textarea>

          <button type="submit"  className=" text-black py-1 rounded-[20px] w-70  backdrop-blur-md bg-black/20 mx-16 cursor-pointer" disabled={loading}> {loading ? "Registering..." : "Register"}</button>

          {message && <p className="mt-2 text-smn text-center">{message}</p>}


          <a href='/'><h1 className='text-black  text-center py-5' onClick={() => navigate("/")}>Return to Home</h1></a>
        </form>
    </div>
    </>
  )
}

export {Registerpage}