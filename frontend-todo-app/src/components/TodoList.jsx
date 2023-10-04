import { useContext } from "react";
import Todo from "./Todo";
import { Context } from "../App";

const TodoList = () => {
  const [todos, setTodos] = useContext(Context)

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id != todoId))
  }

  return <ul className="flex flex-col gap-4 my-6">
    {todos.map((todo) => <Todo key={todo.id} taskId={todo.id} taskName={todo.name} deleteTodo={deleteTodo}/>)}
  </ul>;
};

export default TodoList;
