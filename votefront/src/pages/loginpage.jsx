import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";



function Loginpage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formdata, setformdata] = useState({
    aadharCardno:"",
    password:""
  })

  const handlechange = async(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value})
  }
  const [message, setMessage] = useState("");
  const submitted = async(e)=>{
    e.preventDefault()
    // setLoading(true);
   
   try{
   const res = await axios.post('http://localhost:3000/user/login',formdata)

   if(res.status === 201){
    setMessage("✅ login successfully! Redirecting...");
    const token = res.data.data.token;
    if(token){
    localStorage.setItem("token",res.data.data.token)
    alert('logged in successfully')
    }else{
      console.error("Token not found in backend response");
    }
    setTimeout(() => {
      navigate("/profilepage");
    },0);
  }
   }catch(error){
    console.error({error:error.message})
     if(error.response){
    if(error.response.status === 404){
      setMessage(error.response.data.message)
    }

    else if(error.response.status === 401){
      setMessage(error.response.data.message)
    }

    else if(error.response.status === 402){
      setMessage(error.response.data.message)
    }

    else if(error.response.status === 403){
      setMessage(error.response.data.message)
    }
  }
  }finally {
    setLoading(false);
  } 
  }

  return (
    <>
    <div className='h-dvh w-ful bg-[url(vidhansouda.jpg)] bg-no-repeat bg-center  bg-cover flex justify-center items-center opacity-70'>
        <form action="" className='h-78 w-107  backdrop-blur-md bg-black/3 rounded-[14px] border-1 border-gray-800' onSubmit={submitted}>
        <h1 className='text-gray-800 text-2xl text-center py-4 px-2'>Login</h1>

        <label for='name' className='px-2 text-[18px]'>Aadharcardno:</label>
        <input type="number" placeholder="Aadharno:" maxLength="12" className="p-2 rounded focus:outline-none w-68  px-2 backdrop-blur-md bg-black/0 my-3" name='aadharCardNo' required onChange={handlechange}/>

        <label for='name' className='px-2 text-[18px]'>Password:</label>
        <input type="password" placeholder="Enter your password" className="p-2 rounded focus:outline-none w-76  px-2 backdrop-blur-md bg-black/0 my-3" name='password' required onChange={handlechange}/>

          <button type="submit" className="  py-1 rounded-[20px] w-70 transition backdrop-blur-md bg-black/20 mx-16 text-black cursor-pointer" disabled={loading}>{loading ? 'loading': 'login' }</button>

            <p> {message && <p className="mt-2 text-sm text-center">{message}</p>}
            </p>
          <a href='/'><h1 className='text-black  text-center py-5' onClick={() => navigate("/")}>Return to homepage</h1></a>
        </form>
    </div>
    </>
  )
}

export {Loginpage}