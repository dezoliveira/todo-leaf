const formNotes = document.getElementById("formNotes")
const taskInput = document.getElementById("taskInput")
let todoList = []
let i = 0

console.log(todoList)

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

const completeTask = (task) => {
  const todoElement = document.getElementById(task.id)

  todoList.map((todo) => {
    if (todo.id === task.id) {
      todo.completed = true
      todoElement.classList.add("completed")
    }
  })

}

const renderTaskList = () => {
  const todoListElement = document.getElementById("todoList")

  todoListElement.innerHTML = ""

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

    const label = document.createElement("label")
    label.textContent = todo.text

    const div2 = document.createElement("div")
    div2.classList.add(
      "btn-group",
      "flex",
      "align-items-center",
      "justify-content-center",
      "gap-1"
    )

    const completeButton = document.createElement("i")
    completeButton.classList.add(
      "fa-solid",
      "fa-circle-check",
      "text-success"
    )

    if (todo.completed) {
      li.classList.add("completed")
      completeButton.classList.add('text-success')
    }
    
    completeButton.addEventListener("click", (e) => {
      e.preventDefault()
      completeTask(todo)
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
    div.appendChild(label)
    div.appendChild(div2)
    div2.appendChild(completeButton)
    div2.appendChild(deleteButton)
    
  });
}