import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { verifyLoginData } from '../utils/verifyLoginData';
import { Context } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { loadData } from '../utils/loadData';

const LoginForm = () => {

  const usernameRef = useRef();
  const passwordRef = useRef();
  const [, setTodos] = useContext(Context);
  const navigate = useNavigate();

  const authPost = async (username, password) => {
    await axios.post("http://localhost:4000/auth/register", {username, password})
    .then(() => {
      loadData(setTodos)
      .then(() => navigate('/todos'))
      .catch(err => console.log(err))
    })
    .catch(err => {

      const { redirectTo } = err.response.data 
      if (redirectTo) {
        navigate(redirectTo)
      }
    })
  }

  const inputAlert = () => {
    window.alert("Username has to be between 6 and 20 characters long.\nPassword has to be between 8 and 20 characters long.\nOnly letters and numbers allowed.")
  }

  const onRegisterSubmit = (e) => {
    e.preventDefault()

    const username = usernameRef.current.value
    const password = passwordRef.current.value

    if (!verifyLoginData(username, password)) {
      inputAlert()
      return
    }
    authPost(username, password)
  }
  
  return (
    <form className="w-full md:w-1/2 rounded-lg" onSubmit={onRegisterSubmit}>
        <h2 className="text-2xl text-center text-gray-600 mb-8">Register</h2>
        <div className="px-12 pb-10">
          <div className="w-full mb-2">
            <div className="flex items-center">
              <input
                type="text"
                ref={usernameRef}
                placeholder="Username"
                className="
                  w-full
                  border
                  border-gray-600 
                  rounded
                  px-3
                  py-2
                  text-gray-600
                  focus:outline-none
                "
              />
            </div>
          </div>
          <div className="w-full mb-2">
            <div className="flex items-center">
              <input
                type="password"
                ref={passwordRef}
                placeholder="Password"
                className="
                  w-full
                  border
                  border-gray-600
                  rounded
                  px-3
                  py-2
                  text-gray-600
                  focus:outline-none
                "
              />
            </div>
          </div>
          <button
            type="submit"
            className="
              w-full
              py-2
              mb-4
              mt-8
              rounded-full
              bg-black
              text-gray-100
              focus:outline-none
            "
          >
            Register
          </button>
          <Link 
            to="/login"
            className="
              justify-center
              py-2
              w-full
              flex
              rounded-full
              bg-white
              text-gray-600
              border
              border-gray-600
              focus:outline-none
            "
          >
            Go to Login
            
          </Link>
        </div>
      </form>
  )
}

export default LoginForm