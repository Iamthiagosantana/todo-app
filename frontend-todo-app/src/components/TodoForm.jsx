import { useRef , useContext } from "react"
import { verifyTaskText } from "../utils/verifyTodo"
import { Context, SERVER_URL } from "../App"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const TodoForm = () => {

  const textRef =  useRef()
  const [todos, setTodos] = useContext(Context)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (verifyTaskText(textRef.current.value)) {
        axios.post(`${SERVER_URL}/todos`, {todo: {name: textRef.current.value, completed: false}}, {withCredentials: true})
        .then(res => {
          setTodos([...todos, res.data.todo])
        })
        .catch(err => {
          const { redirectTo } = err.response.data
          if (redirectTo) {
            navigate(redirectTo)
          }
        })
    }
  }

  return (
    <form className="flex flex-row" onSubmit={handleSubmit}>
        <input className="w-full my-4 h-8 px-2 text-sm" type="text" placeholder="Enter a task" ref={textRef} required></input>
        <input className="bg-green-200 w-32 my-4 font-semibold text-sm text-black cursor-pointer transition-colors
                            hover:bg-green-300
                            active:bg-green-400 " type="submit" value="Add Task"></input>
    </form>
  )
}

export default TodoForm