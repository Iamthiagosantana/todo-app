import axios from "axios"

export const loadData = async (setTodos) => {
  await axios
    .get("http://localhost:4000/todos")
    .then(res => {
      console.log(res.data.todos)
      setTodos(res.data.todos)
    })
    .catch(err => {
      console.log(err.response.data)

      const { redirectTo } = err.response.data
      if (redirectTo) {
        navigate(redirectTo)
      }
    });
}