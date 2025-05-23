// imports
import { renderTaskList } from "./taskList"
import { toggleAlert } from "../elements/alert"
import { getTasks, setTasks } from "../utils/storage"

const taskInput = document.getElementById("taskInput")

// Inicia o usuário ao fluxo das tasks
export const beginTask = () => {
  taskInput.focus()
}

// Função que adiciona uma task
export const addTask = () => {
  const taskText = taskInput.value.trim()
  if (!taskText) return

  const tasks = getTasks()

  // Cria nova task
  const newTask = {
    id: crypto.randomUUID(),
    text: taskText,
    createdAt: Date.now(),
    completed: false
  }

  const updatedTasks = [...tasks, newTask]
  setTasks(updatedTasks)

  taskInput.value = ''
  taskInput.focus()

  renderTaskList(updatedTasks)
  toggleAlert("success")
}

// função que completa uma task
export const completeTask = (task, e) => {
  const tasks = getTasks()

  const updatedTasks = tasks.map((todo) => {
    if (todo.id === task.id) {
      todo.completed = true
    }
  })

  // Atualiza localStorage 
  setTasks(updatedTasks)

  // Atualização dos elementos
  const buttonElement = e.target.closest(".complete-button") 
  const todoElement = document.getElementById(task.id)
  const spanElement = todoElement.querySelector("span")

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