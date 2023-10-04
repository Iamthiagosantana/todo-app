import { useEffect, useRef, useState } from "react"
import {FaTrashAlt, FaEdit, FaCheck} from "react-icons/fa"
import { characterLimit, verifyTaskText } from "../utils/verifyTodo"

// eslint-disable-next-line react/prop-types
const Todo = ({ taskId, taskName, deleteTodo }) => {

  const [editing, setEditing] = useState(false)
  const [remainingChars, setRemainingChars] = useState(characterLimit)
  const taskInputRef = useRef()

  const updateEditing = () => {
    if (editing) {
      if (!verifyTaskText(taskInputRef.current.value)) {
        return
      }
    }
    setEditing(value => !value)
  }

  const updateRemainingChars = () => {
    setRemainingChars(characterLimit - taskInputRef.current.value.replace(/\s+/g, "").length)
  }

  useEffect(() => {
    updateRemainingChars()
  }, [])


  return (
    <li className="flex flex-row justify-between list-none items-center bg-white h-12 px-2 gap-2">
        <input className="bg-transparent w-full" type="text" ref={taskInputRef} defaultValue={taskName} disabled={!editing} 
              onChange={updateRemainingChars}></input>
        <p className="text-gray-500 text-md mx-2">{remainingChars}</p>
        <div className="flex flex-row justify-between gap-2">
          <button type="button" className="transition-colors active:bg-yellow-300" onClick={updateEditing}>
            {editing ? <FaCheck color={"green"}/>: <FaEdit/>}
          </button>
          <button type="button" className="transition-colors active:bg-red-300" onClick={() => {deleteTodo(taskId)}}><FaTrashAlt /></button>
        </div>
        
    </li>
  )
}

export default Todo