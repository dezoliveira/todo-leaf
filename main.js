// imports
import { renderTaskList } from '/scripts/tasks/taskList'
import { addTask } from '/scripts/tasks/tasks'

// elements id
const formNotes = document.getElementById("formNotes")

// chama função que renderiza a todoList ao carregar a página
document.addEventListener("load", () => {
  renderTaskList()
})

// chama função para adicionar a task após submeter o formulário
formNotes.addEventListener("submit", (e) => {
  e.preventDefault()
  addTask()
})