import { beginTask, completeTask,  deleteTask } from "./tasks"
import { toggleAlert } from "../elements/alert"
import { todoList } from "./tasks"
import { closeModal } from "../elements/modal"

const btnConfirm = document.getElementById("btnConfirm")

export const renderTaskList = () => {
  const todoListElement = document.getElementById("todoList")

  todoListElement.innerHTML = ""

  if (todoList.length) {

    todoList.forEach(todo => {
      const li = document.createElement("li")
      li.setAttribute("id", todo.id)
      li.classList.add(
        "list-group-item",
        "mb-2"
      )
  
      const div = document.createElement("div")
      div.classList.add(
        "d-flex",
        "align-items-center",
        "justify-content-between",
      )
  
      const span = document.createElement("span")
      span.textContent = todo.text
  
      const div2 = document.createElement("div")
      div2.classList.add(
        "btn-group",
        "flex",
        "align-items-center",
        "justify-content-center",
        "gap-1"
      )
  
      const completeButton = document.createElement("i")
      completeButton.setAttribute('id', 'completeButton')
      completeButton.classList.add(
        "fa-solid",
        "fa-circle-check",
        // "text-success"
      )
  
      if (todo.completed) {
        span.classList.add("completed")
        li.classList.add('done')
        completeButton.classList.add('text-success')
      }
      
      completeButton.addEventListener("click", (e) => {
        e.preventDefault()
        completeTask(todo, e)
      })
  
      const deleteButton = document.createElement("i")
      deleteButton.setAttribute('id', 'deleteButton')
      deleteButton.setAttribute("data-bs-toggle", "modal")
      deleteButton.setAttribute("data-bs-target", "#exampleModal")
      deleteButton.classList.add(
        "fa-solid",
        "fa-circle-minus",
        "text-danger"
      )
  
      deleteButton.addEventListener("click", (e) => {
        e.preventDefault()
        btnConfirm.addEventListener('click', () => {
          deleteTask(todo)
          closeModal()
        })

        
      })
  
      todoListElement.appendChild(li)
      li.appendChild(div)
      div.appendChild(span)
      div.appendChild(div2)
      div2.appendChild(completeButton)
      div2.appendChild(deleteButton)
      
    })

    toggleAlert("success")

  } else {

    const li = document.createElement("li")
    li.classList.add(
      "list-group-item",
      "p-4",
      "text-center"
    )

    const span = document.createElement("span")
    span.textContent = "Lista vazia, "

    const a = document.createElement("a")
    a.href = "#"
    
    a.addEventListener("click", () => {
      beginTask()
    })

    a.textContent = "Adicione uma tarefa"

    todoListElement.appendChild(li)
    li.appendChild(span)
    span.appendChild(a)
  }
  
}