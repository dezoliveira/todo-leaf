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

  const activeTab = document.querySelector('.nav-link.active').id

  let schedule = false
  let completed = false

  if (activeTab === 'nav-schedule-tab') {
    schedule = true
  }

  if (activeTab === 'nav-completed-tab') {
    completed = true
  }

  renderTaskList(1, schedule, completed)
  
  toggleAlert("danger")
}