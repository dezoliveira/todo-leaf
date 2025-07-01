// Imports
import { loadTaskExamples } from "../tasks/examples"
import { startIntroJS } from "../libs/introJS"
import { addTask } from "../tasks/add"
import { renderTaskList } from "../tasks/render"
import { loadWeather } from "../libs/weather"
import flatpickr from "flatpickr"
import "flatpickr/dist/themes/light.css"
import { getWeatherForecast } from "../api/wheaterApi"

// Função que inicializa o app
export const initializeApp = async () => {
  // Função principal
  document.addEventListener("DOMContentLoaded", async () => {
    const tutorialView = localStorage.getItem('tutorialView')
    const formNotes = document.getElementById("formNotes")

    await getUserLocation()

    // Carrega tasks de exemplo caso não existam
    loadTaskExamples()

    // Renderiza lista de tasks
    renderTaskList()
    
    // Inicia tutorial apenas se for a primeira vez
    if (!tutorialView && formNotes) {
      startIntroJS()
      localStorage.setItem('tutorialView', true)
    }
  })

  // Adiciona task caso o form existir
  if (formNotes) {
      formNotes.addEventListener("submit", (e) => {
      e.preventDefault()
      addTask()
    })
  }
} 

// Remove a chave ao sair do app
export const handleUnload = () => {
  window.addEventListener("beforeunload", () => {
    const storage = localStorage.getItem('tasks')

    if (storage === '[]') {
      localStorage.removeItem('tasks')
    }
  })
}

let userLat = null
let userLon = null

export const getUserLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async(position) => {
      const element = document.getElementById("weatherDescription")
      
      userLat = position.coords.latitude
      userLon = position.coords.longitude

      const { daily } = await getWeatherForecast(userLat, userLon)

      const weather = await loadWeather(userLat, userLon)

      element.innerHTML = `${weather.description}, mín: ${weather.min}°C, máx: ${weather.max}°C`
    
      // Ultima data
      const lastDay = new Date(daily.time[daily.time.length -1])

      console.log(lastDay)
      createFlatPicker(lastDay)
    },
    (error) => {
      console.error("Erro ao obter localização", error.message)
    })
  
  } else {
    console.error("Geolocalização não é suportada pelo navegador")
  }
}

const createFlatPicker = (date) => {
  flatpickr("#datepicker", {
    dateFormat: "d/m/Y",
    minDate: "today",
    maxDate: date,
    defaultDate: "today",
    onChange: async (selectedDates) => {
      try {
        let formattedDate = new Date(selectedDates).toLocaleDateString()
        let index = 0

        const { daily } = await getWeatherForecast(userLat, userLon)

        const dates = daily.time

        console.log(dates)

        formattedDate = formattedDate.split("/")[2] + '-' + formattedDate.split("/")[1] + '-' + formattedDate.split("/")[0]

        for (let i in dates) {
          if (formattedDate.match(dates[i])) {
            index = dates.indexOf(formattedDate)
            console.log(index)
          }
        }

      } catch(error) {
        console.error("Data inválida", error)
      }
    }
  })
}