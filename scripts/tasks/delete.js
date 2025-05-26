// Imports
import { getTasks, setTasks } from "../utils/storage"
import { renderTaskList } from "./render"
import { toggleAlert } from "../elements/alert"

// Função que deleta uma task
export const deleteTask = (task) => {
  const tasks = getTasks()

  // Remove a task que foi selecionada
  let updatedTasks = tasks.filter((todo) => todo.id !== task.id)
  setTasks(updatedTasks)

  // Renderiza a lista 
  renderTaskList()
  
  toggleAlert("danger")
}