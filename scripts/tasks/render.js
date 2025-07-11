// Imports
import { getWeatherForecast } from "../api/wheaterApi"
import { closeModal } from "../elements/modal"
import { loadWeather } from "../libs/weather"
import { createPagination } from "../utils/pagination"
import { getTasks } from "../utils/storage"
import { completeTask } from "./complete"
import { deleteTask } from "./delete"

// Globais
const btnConfirm = document.getElementById("btnConfirm")
let taskToDelete = null

// Renderiza as tasks na lista
export const renderTaskList = (currentPage = 1, schedule = false, completed = false) => {
  const todoListElement = document.getElementById("todoList")
  let tasks = getTasks()
  
  // ordenação das tasks por hora criada
  let sortedTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  console.log(tasks.createdAt)

  if (schedule) {
    sortedTasks = tasks.filter(task => task.schedule !== null)
  
  } else {
    sortedTasks = tasks.filter(task => task.schedule === null)
  }

  if (completed) {
    sortedTasks = sortedTasks.filter(task=> task.completed === true)

  } else {
    sortedTasks = sortedTasks.filter(task=> task.completed === false)
  }

  // configurações da paginação
  const itensPerPage = 8
  const start = (currentPage -1) * itensPerPage
  const end = start + itensPerPage
  const paginatedTasks = sortedTasks.slice(start, end)
  
  todoListElement.innerHTML = ""

  if (tasks.length > 8) {
    createPagination(sortedTasks, schedule, completed)

  } else {
    document.querySelector('#pagination').style.display = 'none'
  }

  if (paginatedTasks.length) {
    paginatedTasks.forEach(async task => {

      // cria elemento li
      const li = document.createElement("li")
      li.setAttribute("id", task.id)
      li.classList.add(
        "list-group-item",
        "mb-2"
      )
      
      // cria uma div
      const div = document.createElement("div")
      div.classList.add(
        "d-flex",
        "align-items-center",
        "justify-content-between",
      )
      
      // cria um span
      const span = document.createElement("span")

      // insere o icone da previsão
      if (task.weatherIcon) {
        const icon = document.createElement("i")
        icon.className = task.weatherIcon
        icon.style.fontSize = "1rem"
        icon.style.marginRight = "0.5rem"
        span.appendChild(icon)
      }

      // adiciona o texto
      span.append(task.text) 

      // se tiver agendamento, adiciona a badge
      if (task.schedule) {
        const badge = document.createElement("span")
        badge.classList.add("badge", "bg-info", "ms-2")
        badge.textContent = task.schedule
        span.appendChild(badge)
      }
      
      // cria outra div
      const div2 = document.createElement("div")
      div2.classList.add(
        "btn-group",
        "flex",
        "align-items-center",
        "justify-content-center",
        "gap-1"
      )
      
      // cria o completeButton
      const completeButton = document.createElement("i")
      completeButton.classList.add(
        "fa-solid",
        "fa-circle-check",
        "complete-button"
        // "text-success"
      )
      
      // verifica se a todo está completa
      if (task.completed) {

        // adiciona as classes de todo completa
        span.classList.add("completed")
        li.classList.add('done')
        completeButton.classList.add('text-success')
      }
      
      // adiciona evento de click no completeButton
      completeButton.addEventListener("click", (e) => {
        e.preventDefault()

        // chama função de completar task
        completeTask(task, e)
      })
  
      // cria o deleteButton
      const deleteButton = document.createElement("i")
      deleteButton.setAttribute("data-bs-toggle", "modal")
      deleteButton.setAttribute("data-bs-target", "#exampleModal")
      deleteButton.classList.add(
        "fa-solid",
        "fa-circle-minus",
        "text-danger",
        "delete-button"
      )
  
      // adiciona evento de click no deleteButton
      deleteButton.addEventListener("click", (e) => {
        e.preventDefault()

        taskToDelete = task  
      })
  
      // renderiza todos os elementos criados acima como filhos da todoList
      todoListElement.appendChild(li)
      li.appendChild(div)
      // div.appendChild(span2)
      div.appendChild(span)
      div.appendChild(div2)
      div2.appendChild(completeButton)
      div2.appendChild(deleteButton)
      
    })  

  // se a todoList esta vazia
  } else {

    // cria um elemento para exibir que a lista esta vazia

    // cria um li
    const li = document.createElement("li")
    li.classList.add(
      "list-group-item",
      "p-4",
      "text-center"
    )

    // cria um span
    const span = document.createElement("span")
    span.textContent = "Lista vazia, "

    const strong = document.createElement("strong")
    strong.textContent =  "adicione uma tarefa"

    // renderiza todos os elementos criados acima como filhos da todoList
    todoListElement.appendChild(li)
    li.appendChild(span)
    span.appendChild(strong)
  }

  // deleta task específica caso o usuário clique em deletar
  btnConfirm.addEventListener("click", () => {
    if (taskToDelete) {
      deleteTask(taskToDelete)
      closeModal()
      taskToDelete = null
    }
  })
}