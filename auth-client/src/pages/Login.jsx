import React from "react";
import { Link, NavLink,useNavigate } from "react-router-dom";
import logo from "../assets/logo_big-removebg.png";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
//const baseUrl = "https://majorproject-1-t1wr.onrender.com";
const baseUrl = "http://localhost:8000";
const Login = () => {

const navigate = useNavigate()

const handleOnSubmit = (e) => {
  e.preventDefault()
  const from = e.target
  const email = from.email.value
  const password = from.password.value

  const userData = {
     email, password
  };
   fetch(`${baseUrl}/api/v1/user/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        console.log(data.data.token);
        localStorage.setItem("token", data.data.token),
          toast.success(data.message)
        from.reset()
        navigate('/home')
      } else {
        toast.error(data.message)

      }
    });
};

  return (
    <div className="login">
      <div className="h-screen pt-[25vh]">
        <form
          className=" ease-in duration-300 w-[80% ] sm:w-max shadow-sm backdrop-blur-md bg-[#FFFADC]
        1g:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5" onSubmit={handleOnSubmit}
        >
          <NavLink to="/home">
            <img
              src={logo}
              alt=""
              className="mb-6 h-20 cursor-pointer text-center" 
            />
          </NavLink>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"  
              name="email"
              className=" shadow-sm
          bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700
          leading-tight focus:outline-none focus: shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor=" email"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="***********"
              name="password"
              className=" shadow-sm
          bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] Otext-gray-700
          leading-tight focus:outline-none focus: shadow-outline"
            />
          </div>
          {/* <button
            className="bg-[#f54748] active:scale-90 transition duration-150 transform
      hover:shadow-x1 shadow-md w-full rounded-full px-8 py-2 text-x1 font-medium text-white
      mx-auto text-center"
            type="submit"
          >
            Sign In
          </button> */}
<button      type="submit" class="text-white bg-gradient-to-r w-full rounded-full bg-[#CF3032]  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2">Sign in</button>

          <Link
            to="/register"
            className="text-[#fdc55e] text-center font-semibold w-full mb- 3 py-2
px-4 rounded"
          >
            Create an Account
          </Link>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};
export default Login;
