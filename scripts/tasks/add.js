// Imports
import { getTasks, setTasks } from "../utils/storage"
import { renderTaskList } from "./render"
import { toggleAlert } from "../elements/alert"
import { getWeatherForecast } from "../api/wheaterApi"
import { loadWeather } from "../libs/weather"

// Elements
const taskInput = document.getElementById("taskInput")
const taskSchedule = document.getElementById("taskSchedule")
const datepicker = document.getElementById("datepicker")

// Função que adiciona uma task
export const addTask = async () => {
  const taskText = taskInput.value.trim()
  if (!taskText) return

  const lat = sessionStorage.getItem("lat")
  const lon = sessionStorage.getItem("lon")
  let icon = null

  if (lat && lon) {
    const { daily } = await getWeatherForecast(lat, lon)
    let formattedDate = new Date().toISOString().split("T")[0]

    if (taskSchedule.checked && datepicker.value) {
      formattedDate = datepicker.value.split("/").reverse().join("-")
    }

    const index = daily.time.indexOf(formattedDate)
    console.log(index)
    if (index !== -1) {
      const weather = await loadWeather(lat, lon, index)
      icon = weather.icon
    }
  }

  const tasks = getTasks()

  // Cria nova task
  const newTask = {
    id: crypto.randomUUID(),
    text: taskText,
    createdAt: Date.now(),
    completed: false,
    schedule: taskSchedule.checked ? datepicker.value : null,
    weatherIcon: icon
  }

  console.log(newTask)

  // Adiciona nova task junto com as outras
  const updatedTasks = [...tasks, newTask]
  setTasks(updatedTasks)

  taskInput.value = ''
  taskInput.focus()

  // renderTaskList(updatedTasks)
  renderTaskList(1, taskSchedule.checked)

  if (taskSchedule.checked) {
    document.getElementById('nav-schedule-tab').click()

  } else {
    document.getElementById('nav-tasks-tab').click()
  }


  toggleAlert("success")
}