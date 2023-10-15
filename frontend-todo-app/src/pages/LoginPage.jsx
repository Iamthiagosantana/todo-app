import React from 'react'
import LoginForm from '../components/LoginForm'


const LoginPage = () => {

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="p-12 border-gray-600 w-1/2 h-2/3 flex items-center justify-center border">
        <LoginForm/>
      </div>
    </div>
  )
}

export default LoginPage