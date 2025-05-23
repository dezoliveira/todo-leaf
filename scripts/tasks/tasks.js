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
      return { ...todo, completed: true }
    }

    return todo
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

  toggleAlert("info")
}

// Função que deleta uma task
export const deleteTask = (task) => {
  const tasks = getTasks()

  // Remove a task que foi selecionada
  let updatedTasks = tasks.filter((todo) => todo.id !== task.id)
  setTasks(updatedTasks)

  // Renderiza a lista 
  renderTaskList()
  
  toggleAlert("danger")
}

export const loadTaskExamples = () => {
  const tasks = getTasks()

  if (!tasks.length) {
    const taskExamples = [
      {
        id: crypto.randomUUID(),
        text: 'Tomar uma xícara de café',
        createdAt: Date.now(),
        completed: false
      },
      {
        id: crypto.randomUUID(),
        text: 'Estudar Javascript',
        createdAt: Date.now(),
        completed: false
      },
    ]
    
    setTasks(taskExamples)
    renderTaskList()
    console.log(taskExamples)
  }
}