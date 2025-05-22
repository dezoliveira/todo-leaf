// imports
import { renderTaskList } from '/scripts/tasks/taskList'
import { addTask } from '/scripts/tasks/tasks'
import { startIntroJS } from './scripts/libs/introJS'

// chama função que renderiza a todoList ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  renderTaskList()

  const formNotes = document.getElementById("formNotes")
  
  if (formNotes) {
    startIntroJS()
  }
})

// chama função para adicionar a task após submeter o formulário
formNotes.addEventListener("submit", (e) => {
  e.preventDefault()
  addTask()
})