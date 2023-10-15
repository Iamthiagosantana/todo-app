import axios from "axios"
import { SERVER_URL } from "../App"

export const loadData = async (setTodos) => {
  await axios
    .get(`${SERVER_URL}/todos`)
    .then(res => {
      console.log(res.data.todos)
      setTodos(res.data.todos)
    })
}