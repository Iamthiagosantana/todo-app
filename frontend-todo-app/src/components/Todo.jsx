import {useEffect, useRef, useState } from "react"
import {FaTrashAlt, FaEdit, FaRegEdit, FaCheck} from "react-icons/fa"
import { verifyTaskText } from "../utils/verifyTodo"
import { characterLimit } from "../constants"

// eslint-disable-next-line react/prop-types
const Todo = ({ taskId, taskName, deleteTodo, updateCompleteTodo, updateTodo, completed }) => {

  const [editing, setEditing] = useState(false)
  const [remainingChars, setRemainingChars] = useState(characterLimit)

  const taskInputRef = useRef()

  const updateEditing = () => {
    const text = taskInputRef.current.value
    if (editing) {
      if (!verifyTaskText(text)) {
        return
      }
      updateTodo(taskId, text)
    }
    setEditing(value => !value)
  }

  const updateRemainingChars = () => {
    setRemainingChars(characterLimit - taskInputRef.current.value.length)
  }

  useEffect(() => {
    updateRemainingChars()
  }, [])

  return (
    <li className="flex flex-row justify-between list-none items-center bg-white h-12 px-2 gap-2">
        <input className={`bg-transparent w-full ${completed ? 'line-through' : ''}`}
               type="text" 
               ref={taskInputRef} 
               defaultValue={taskName} 
               disabled={!editing} 
               onChange={updateRemainingChars}>
        </input>
        <p className="text-gray-500 text-md mx-2">{remainingChars}</p>
        <div className="flex flex-row justify-between gap-2">
          <button type="button" className="transition-colors active:bg-yellow-300" onClick={updateEditing}>
            {editing ? <FaRegEdit/>: <FaEdit/>}
          </button>
          <button type="button" className="transition-colors active:bg-red-300" onClick={() => {deleteTodo(taskId)}}><FaTrashAlt /></button>
          <button type="button" className="transition-colors active:bg-green-300" onClick={() => {updateCompleteTodo(taskId)}}><FaCheck /></button>
          
        </div>
        
    </li>
  )
}

export default Todo