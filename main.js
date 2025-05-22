// imports
import { renderTaskList } from '/scripts/tasks/taskList'
import { addTask } from '/scripts/tasks/tasks'
import { startIntroJS } from './scripts/libs/introJS'
import { loadTaskExamples } from './scripts/tasks/tasks'

// chama função que renderiza a todoList ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const tutorialView = localStorage.getItem('tutorialView')
  const formNotes = document.getElementById("formNotes")

  loadTaskExamples()
  renderTaskList()
  
  if (!tutorialView && formNotes) {
    startIntroJS()
    localStorage.setItem('tutorialView', true)
  }
})

// chama função para adicionar a task após submeter o formulário
formNotes.addEventListener("submit", (e) => {
  e.preventDefault()
  addTask()
})

// Limpa chave quando usuário sair do app
window.addEventListener("beforeunload", () => {
  const storage = localStorage.getItem('tasks')
  if (storage === '[]') {
    localStorage.removeItem('tasks')
  }
})