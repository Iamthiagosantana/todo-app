import React, { useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

export const Context = React.createContext();

function App() {
  const [todos, setTodos] = useState([]);
  
  return (
    <div className=" bg-black w-[40vw] h-[80vh] my-10 px-4 mx-auto shadow-xl font-poppins overflow-auto">
      <Context.Provider value={[todos, setTodos]}>
        <TodoForm/>
        <TodoList/>
      </Context.Provider>
    </div>
  )
}

export default App
