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
  const tasksStorage = getTasksFromStorage()
  let taskText = taskInput.value.trim()
  let taskId = 0

  if (tasksStorage && tasksStorage.length > 0) {
    const lastTask = tasksStorage[tasksStorage.length -1]
    taskId = lastTask.id + 1
  }

  // objeto task
  const task = {
    id: taskId,
    text: taskText,
    createdAt: Date.now(),
    completed: false
  }

  // adiciona task a todoList
  todoList.push(task)

  // adiciona ao localStorage
  addTaskToStorage(task)

  // limpa os campos
  taskInput.value = ''
  taskInput.focus()

  // renderiza a lista 
  renderTaskList(todoList)
}

// função que completa uma task
export const completeTask = (task, e) => {
  const todoStorage = getTasksFromStorage()
  const buttonElement = e.target.closest(".complete-button") 
  const todoElement = document.getElementById(task.id)

  // busca o elemento span que é filho do filho do todoElement
  const spanElement = todoElement.querySelector("span")

  // obtem a todo selecionada e a completa
  todoList.map((todo) => {
    if (todo.id === task.id) {
      todo.completed = true
    }
  })

  todoStorage.map((todo) => {
    if (todo.id === task.id) {
      todo.completed = true
    }
  })

  localStorage.setItem('tasks', JSON.stringify(todoStorage))

  todoElement.classList.add("done")
  spanElement.classList.add("completed")
  buttonElement.classList.add("text-success")

  renderTaskList()

  // chama o alert
  toggleAlert("info")
}

// função que deleta uma task
export const deleteTask = (task) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []

  // remove a task que foi selecionada
  let filteredTodo = tasks.filter((todo) => todo.id !== task.id)

  todoList = filteredTodo
  
  localStorage.setItem('tasks', JSON.stringify(filteredTodo))

  // renderiza a lista 
  renderTaskList()
  
  // chama o alert
  toggleAlert("danger")
}

// função que adiciona task no storage
export const addTaskToStorage = (task) => {
  const storage = localStorage.getItem('tasks')
  let tasksStorage = []

  if (storage) {
    tasksStorage = JSON.parse(storage)
  }

  const hasTask = tasksStorage.some(t => t.id === task.id)

  if (!hasTask) {
    tasksStorage.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasksStorage))
  }
}

export const getTasksFromStorage = () => {
  const storage = localStorage.getItem('tasks')
  let tasksStorage = []

  if (storage) {
    tasksStorage = JSON.parse(storage)
  }

  return tasksStorage
}

export const loadTaskExamples = () => {
  const storage = localStorage.getItem('tasks')

  if (!storage) {
    const taskExamples = [
      {
        id: 0,
        text: 'Tomar uma xícara de café',
        createdAt: Date.now(),
        completed: false
      },
      {
        id: 1,
        text: 'Estudar Javascript',
        createdAt: Date.now(),
        completed: false
      },
    ]
    
    localStorage.setItem('tasks', JSON.stringify(taskExamples))
  }
}