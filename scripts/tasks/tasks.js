// imports
import { renderTaskList } from "./taskList"
import { toggleAlert } from "../elements/alert"

// elements id
const taskInput = document.getElementById("taskInput")

// variáveis globais (export para exportar globalmente)
export let todoList = []
export let i = 0

// inicia o usuário ao fluxo das tasks
export const beginTask = () => {
  taskInput.focus()
}

// função que adiciona uma task
export const addTask = () => {
  let taskText = taskInput.value.trim()

  // se input for vazio, não prossegue
  if (taskText == '')
    return

  // objeto task
  const task = {
    id: i++,
    text: taskText,
    createdAt: Date.now(),
    completed: false
  }

  // adiciona task a todoList
  todoList.push(task)
  taskInput.value = ''
  taskInput.focus()

  // renderiza a lista 
  renderTaskList(todoList)
}

// função que completa uma task
export const completeTask = (task, e) => {

  const buttonId = e.target
  const todoElement = document.getElementById(task.id)

  // busca o elemento span que é filho do filho do todoElement
  const spanElement = todoElement.children[0].children[0]

  // obtem a todo selecionada e a completa
  todoList.map((todo) => {

    if (todo.id === task.id) {
      todo.completed = true
      todoElement.classList.add("done")
      spanElement.classList.add("completed")
      buttonId.classList.add("text-success")
    }
    
  })

  // chama o alert
  toggleAlert("info")
}

// função que deleta uma task
export const deleteTask = (task) => {

  // remove a task que foi selecionada
  let filteredTodo = todoList.filter((todo) => {
    return todo.id !== task.id
  })

  todoList = filteredTodo

  // renderiza a lista 
  renderTaskList()
  
  // chama o alert
  toggleAlert("danger")
}