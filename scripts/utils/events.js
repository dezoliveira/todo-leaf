import { loadTaskExamples } from "../tasks/examples"
import { startIntroJS } from "../libs/introJS"
import { addTask } from "../tasks/add"
import { renderTaskList } from "../tasks/render"

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