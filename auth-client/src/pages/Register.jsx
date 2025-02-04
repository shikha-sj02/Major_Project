import React, { useState } from 'react'
import avater from '../assets/profile1.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'
//const baseUrl = "https://majorproject-1-t1wr.onrender.com";
const baseUrl = "http://localhost:8000";
const Register = () => {

  const [image, setImage] = useState({})
  const [uploading, setUploading] = useState(false)
  
  const handleImage = async (e) => {
    const file = e.target.files[0]
    let formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const { data } = await axios.post(`${baseUrl}/api/v1/all/upload-image`, formData)
      setUploading(false)
      setImage({
        url: data.url,
        public_id: data.public_id
      })
    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate()
 
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const from = e.target
    const name = from.name.value
    const email = from.email.value
    const password = from.password.value
    const passwordConfirm = from.confirmPassword.value
    const profileImage = image?.url
    const userData = {
      name, email, password, passwordConfirm,
      profileImage
    };
     fetch('http://localhost:8000/api/v1/user/register', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log(data.data);
          localStorage.setItem("token", data.data.token),
            toast.success(data.message)
          from.reset()
          navigate('/home')
        } else {
          toast.error(data.message)

        }
      })
  };


  return (
    <div className="register">
      <div className="w-full mx-auto pt-[16vh] mb-2">
        <form className=' ease-in duration-300 w-[80% ] sm:w-max shadow-sm backdrop-blur-md bg-[#FFFADC] lg:w-max mx-auto flex flex-col  rounded-md px-8 py-4' onSubmit={handleOnSubmit}>
          <label htmlFor='file-upload' className='custom-file-upload'>
            <img src={image?.url || avater} alt="" className="h-32 w-32 bg-contain rounded-full mx-auto
cursor-pointer" />
          </label>
          <label className='block text-center text-gray-900 text-base mb-2'>Profile Picture</label>
          <input type="file" label="Image" name='myFile' id='file-upload' className='hidden'
            accept=' .jpeg .png .jpg' onChange={handleImage} />
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor=" name"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              name="name"
              className=" shadow-sm
          bg-white appearance-none border rounded w-full py-2 px-3  text-gray-700
          leading-tight focus:outline-none focus: shadow-outline"
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor=" email"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              className=" shadow-sm
          bg-white appearance-none border rounded w-full py-2 px-3  text-gray-700
          leading-tight focus:outline-none focus: shadow-outline"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="mb-3">
              <label className='block text-gray-700 text-sm mb-2'>
                Password
              </label>
              <input type="password" placeholder='Enter Password' name='password' className='
shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 
☐text-gray-700 leading-tight focus:outline-none focus: shadow-outline' />
            </div>
            <div className="mb-3">
              <label className='block text-gray-700 text-sm mb-2'>
                Confirm Password
              </label>
              <input type="password" placeholder='Retype Password' name='confirmPassword' className='
              shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 
text-gray-700 leading-tight focus:outline-none focus: shadow-outline' />
            </div>
          </div>
          {/* <button
            className="bg-[#f54748] active:scale-90 transition duration-150 transform
      hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-x1 font-medium text-white
      mx-auto text-center mb-3 mt-5"
            type="submit"
          >
            Register Now!
          </button> */}
<button      type="submit" class="text-white bg-gradient-to-r mt-2 w-full rounded-full bg-[#CF3032]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium  text-sm px-5 py-2 text-center me-2 ">Register Now</button>

          <Link
            to="/login"
            className="text-[#fdc55e] text-center font-semibold w-full mb- 3 py-2
px-4 rounded"
          >
            Already have an Account
          </Link>
          <ToastContainer />
        </form>
      </div>
    </div>
  )
}
export default Register

