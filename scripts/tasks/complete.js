// Imports
import { getTasks, setTasks } from "../utils/storage"
import { toggleAlert } from "../elements/alert"
import { renderTaskList } from "./render"

// Função que completa uma task
export const completeTask = (task, e) => {
  const tasks = getTasks()

  // Atualiza nova task com status = completa
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

  // document.getElementById('nav-completed-tab').click()
  // renderTaskList(1, false, true)

  // if (task.schedule) {
  //   document.getElementById('nav-schedule-tab').click()
  //   renderTaskList(1, true, false)
  
  // } else {
  //   document.getElementById('nav-tasks-tab').click()
  //   renderTaskList(1, false, false)
  // }

  toggleAlert("info")
}