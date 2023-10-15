import React, { useContext } from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Context, SERVER_URL } from '../App'

const TodoPage = () => {
  const navigate = useNavigate()
  const [,setTodos] = useContext(Context)

  const onLogoffClick = () => {
    axios.post(`${SERVER_URL}/auth/logoff`)
    .then(() => {
      setTodos([])
    })
    .finally(() => {
      navigate('/login')
    })
  }

  return (
    <>
      <div className=" bg-black w-[40vw] h-[80vh] my-10 px-4 mx-auto shadow-xl font-poppins overflow-y-auto">
        <TodoForm />
        <TodoList />
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-red-400 w-[40vw] rounded-md py-2 font-semibold transition-colors active:bg-red-600" onClick={onLogoffClick}>Log Off</button>
      </div>
    </>
  )
}

export default TodoPage