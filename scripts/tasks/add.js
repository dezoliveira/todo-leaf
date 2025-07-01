// Imports
import { getTasks, setTasks } from "../utils/storage"
import { renderTaskList } from "./render"
import { toggleAlert } from "../elements/alert"

// Elements
const taskInput = document.getElementById("taskInput")
const taskSchedule = document.getElementById("taskSchedule")
const datepicker = document.getElementById("datepicker")

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
    completed: false,
    schedule: taskSchedule.checked ? datepicker.value : null
  }

  console.log(newTask)

  // Adiciona nova task junto com as outras
  const updatedTasks = [...tasks, newTask]
  setTasks(updatedTasks)

  taskInput.value = ''
  taskInput.focus()

  // renderTaskList(updatedTasks)
  renderTaskList()
  toggleAlert("success")
}