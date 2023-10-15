import { useContext } from "react";
import Todo from "./Todo";
import { Context } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useContext(Context)
  const navigate = useNavigate()
  
  const deleteTodo = (todoId) => {
    axios
      .delete(`http://localhost:4000/todos/${todoId}`, {withCredentials: true})
      .then(() => {
        setTodos(todos.filter(todo => todo._id != todoId))
      })
      .catch(err => {
        const { redirectTo } = err.response.data 
        if (redirectTo) {
          navigate(redirectTo)
        }
      })
    
  }

  const updateCompleteTodo = (todoId) => {
    const todoToUpdate = todos.find(todo => todo._id === todoId)
    if (todoToUpdate) {
      axios
        .put(`http://localhost:4000/todos/${todoId}`, { todo: {name: todoToUpdate.name, completed: !todoToUpdate.completed }}, {withCredentials: true})
        .then(() => {
          setTodos(currentTodos =>
            currentTodos.map(todo => {
              if (todo._id === todoId) {
                return { ...todo, completed: !todoToUpdate.completed }
              }
              return todo
            })
          )
        })
        .catch(err => {

          const { redirectTo } = err.response.data 
          if (redirectTo) {
            navigate(redirectTo)
          }
        })
      
    }
    else {
      console.error("Todo not found.")
    }
  }

  const updateTodo = (todoId, text) => {
    const todoToUpdate = todos.find(todo => todo._id === todoId)

    if (todoToUpdate) {
      axios
      .put(`http://localhost:4000/todos/${todoId}`, { todo: {name: text, completed: todoToUpdate.completed }}, {withCredentials: true})
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.map(todo => {
            if (todo._id === todoId) {
              return { ...todo, name: text }
            }
            return todo
          })
        )
      })
      .catch(err => {

        const { redirectTo } = err.response.data 
        if (redirectTo) {
          navigate(redirectTo)
        }
      })
    }
    else {
      console.error("Todo not found.")
    }
    
  }

  return <ul className="flex flex-col gap-4 my-6">
    {todos.map((todo) => <Todo key={todo._id}
      taskId={todo._id}
      taskName={todo.name}
      deleteTodo={deleteTodo}
      updateCompleteTodo={updateCompleteTodo}
      updateTodo={updateTodo}
      completed={todo.completed} />
    )}
  </ul>;
};

export default TodoList;
