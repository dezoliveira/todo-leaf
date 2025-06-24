// Imports
import { loadTaskExamples } from "../tasks/examples"
import { startIntroJS } from "../libs/introJS"
import { addTask } from "../tasks/add"
import { renderTaskList } from "../tasks/render"
import { getWeatherForecast } from "../api/wheaterApi"
import { getWeatherDescription, loadWeather } from "../libs/weather"

// Função que inicializa o app
export const initializeApp = () => {
  // Função principal
  document.addEventListener("DOMContentLoaded", () => {
    const tutorialView = localStorage.getItem('tutorialView')
    const formNotes = document.getElementById("formNotes")

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

export const getUserLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async(position) => {
      const element = document.getElementById("weatherDescription")
      
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      const weather = await loadWeather(lat, lon)

      element.innerHTML = `${weather.description}, mín: ${weather.min}°C, máx: ${weather.max}°C`
    },
    (error) => {
      console.error("Erro ao obter localização", error.message)
    })
  
  } else {
    console.error("Geolocalização não é suportada pelo navegador")
  }
}