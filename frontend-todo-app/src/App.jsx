import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import TodoPage from './pages/TodoPage'

import { loadData } from './utils/loadData'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'

axios.defaults.withCredentials = true;

export const Context = React.createContext();
export const SERVER_URL = import.meta.env.REACT_APP_SERVER_URL;

function App() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    if (todos.length === 0) {
      loadData(setTodos)
    }
  }, [])
  return (
    <BrowserRouter>
    <Context.Provider value={[todos, setTodos]}>
      <Routes>
        
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/todos" element={<TodoPage/>}></Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Context.Provider>
    </BrowserRouter>
  )
}

export default App
