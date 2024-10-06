// imports
import { beginTask, completeTask,  deleteTask } from "./tasks"
import { toggleAlert } from "../elements/alert"
import { todoList } from "./tasks"
import { closeModal } from "../elements/modal"

// elements id
const btnConfirm = document.getElementById("btnConfirm")

// funcão que renderiza a TodoList
// ** usei o createElement pois acredito se comportar melhor com renderização condicional **
export const renderTaskList = () => {
  const todoListElement = document.getElementById("todoList")

  todoListElement.innerHTML = ""

  // se tiver algum item na lista
  if (todoList.length) {

    // forEach para varrer a todoList
    todoList.forEach(todo => {

      // cria elemento li
      const li = document.createElement("li")
      li.setAttribute("id", todo.id)
      li.classList.add(
        "list-group-item",
        "mb-2"
      )
      
      //cria uma div
      const div = document.createElement("div")
      div.classList.add(
        "d-flex",
        "align-items-center",
        "justify-content-between",
      )
      
      // cria um span
      const span = document.createElement("span")
      span.textContent = todo.text
      
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
      completeButton.setAttribute('id', 'completeButton')
      completeButton.classList.add(
        "fa-solid",
        "fa-circle-check",
        // "text-success"
      )
      
      // verifica se a todo está completa
      if (todo.completed) {

        // adiciona as classes de todo completa
        span.classList.add("completed")
        li.classList.add('done')
        completeButton.classList.add('text-success')
      }
      
      // adiciona evento de click no completeButton
      completeButton.addEventListener("click", (e) => {
        e.preventDefault()

        // chama função de completar task
        completeTask(todo, e)
      })
  
      // cria o deleteButton
      const deleteButton = document.createElement("i")
      deleteButton.setAttribute('id', 'deleteButton')
      deleteButton.setAttribute("data-bs-toggle", "modal")
      deleteButton.setAttribute("data-bs-target", "#exampleModal")
      deleteButton.classList.add(
        "fa-solid",
        "fa-circle-minus",
        "text-danger"
      )
  
      // adiciona evento de click no deleteButton
      deleteButton.addEventListener("click", (e) => {
        e.preventDefault()

        // adiciona evento de clique no botão de confirmação do modal
        btnConfirm.addEventListener('click', () => {

          // chama função de deletar task e fecha o modal
          deleteTask(todo)
          closeModal()
        })

        
      })
  
      // renderiza todos os elementos criados acima como filhos da todoList
      todoListElement.appendChild(li)
      li.appendChild(div)
      div.appendChild(span)
      div.appendChild(div2)
      div2.appendChild(completeButton)
      div2.appendChild(deleteButton)
      
    })

    // chama o alerta
    toggleAlert("success")

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

    // cria uma ancora
    const a = document.createElement("a")
    a.href = "#"
    
    a.textContent = "Adicione uma tarefa"
    
    // adiciona evento de click na ancora
    a.addEventListener("click", () => {
      
      // função de introdução a task
      beginTask()
    })

    // renderiza todos os elementos criados acima como filhos da todoList
    todoListElement.appendChild(li)
    li.appendChild(span)
    span.appendChild(a)
  }
  
}