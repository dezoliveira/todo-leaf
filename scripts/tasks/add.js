// Imports
import { getTasks, setTasks } from "../utils/storage"
import { renderTaskList } from "./render"
import { toggleAlert } from "../elements/alert"

// Elements
const taskInput = document.getElementById("taskInput")

// Função que adiciona uma task
export const addTask = () => {
  const taskText = taskInput.value.trim()
  if (!taskText) return

  const tasks = getTasks()

  // Cria nova task
  const newTask = {
    id: crypto.randomUUID(),
    text: taskText,
    createdAt: Date.now(),
    completed: false
  }

  // Adiciona nova task junto com as outras
  const updatedTasks = [...tasks, newTask]
  setTasks(updatedTasks)

  taskInput.value = ''
  taskInput.focus()

  // renderTaskList(updatedTasks)
  renderTaskList()
  toggleAlert("success")
}