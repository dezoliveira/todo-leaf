// imports
import { renderTaskList } from '/scripts/tasks/taskList'
import { addTask } from '/scripts/tasks/tasks'
import { startIntroJS } from './scripts/libs/introJS'
import { loadTaskExamples } from './scripts/tasks/tasks'

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

// Remove a chave ao sair do app
window.addEventListener("beforeunload", () => {
  const storage = localStorage.getItem('tasks')
  
  if (storage === '[]') {
    localStorage.removeItem('tasks')
  }
})