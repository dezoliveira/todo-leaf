const formNotes = document.getElementById("formNotes")
const taskInput = document.getElementById("taskInput")
let todoList = []
let i = 0

const beginTask = () => {
  document.getElementById('taskInput').focus()
}

document.addEventListener("load", () => {
  renderTaskList()
})

formNotes.addEventListener("submit", (e) => {
  e.preventDefault()
  addTask()
})

const addTask = () => {
  let taskText = taskInput.value.trim()

  if (taskText == '')
    return

  const task = {
    id: i++,
    text: taskText,
    createdAt: Date.now(),
    completed: false
  }

  todoList.push(task)
  console.log(todoList)
  taskInput.value = ''
  taskInput.focus()

  renderTaskList()
  
}

const deleteTask = (task) => {
  let filteredTodo = todoList.filter((todo) => {
    return todo.id !== task.id
  })

  todoList = filteredTodo
  renderTaskList()
}

const completeTask = (task, e) => {
  const buttonId = e.target
  const todoElement = document.getElementById(task.id)

  const child = todoElement.children[0].children[0]

  todoList.map((todo) => {
    if (todo.id === task.id) {
      todo.completed = true
      todoElement.classList.add("done")
      child.classList.add("completed")
      buttonId.classList.add("text-success")
    }
  })

}

const renderTaskList = () => {
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
      deleteButton.classList.add(
        "fa-solid",
        "fa-circle-minus",
        "text-danger"
      )
  
      deleteButton.addEventListener("click", (e) => {
        e.preventDefault()
        deleteTask(todo)
      })
  
      todoListElement.appendChild(li)
      li.appendChild(div)
      div.appendChild(span)
      div.appendChild(div2)
      div2.appendChild(completeButton)
      div2.appendChild(deleteButton)
      
    })

  } else {

    const li = document.createElement("li")
    li.classList.add(
      "list-group",
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

    todoListElement.appendChild(span)
    span.appendChild(a)
  }

}