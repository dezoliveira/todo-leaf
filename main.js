const formNotes = document.getElementById("formNotes")
const todoText = document.getElementById("todoText")
const todoList = document.getElementById("todoList")
const todos = []

formNotes.addEventListener("submit", (e) => {
  e.preventDefault()
  addTodo()
})

const addTodo = () => {
  const todo = todoText.value

  if (!todo) {
    todoList.innerHTML += `
      <h1>Lista Vazia</h1>
    `

    return
  }
  
  todos.push(todo)
  formNotes.reset()
  todoText.focus()

  renderTodoList()
}

const renderTodoList = () => {
  todoList.innerHTML = ""

  for (let t in todos) {
    todoList.innerHTML += `
      <li
        id="${t}"
        class="list-group-item mb-2"
      >
        <div class="d-flex align-items-center justify-content-between">
          <label>
            ${todos[t]}
          </label>
          <div class="btn-group flex align-items-center justify-content-center gap-1">
            <i class="fa-solid fa-circle-check text-success"></i>
            <i class="fa-solid fa-circle-minus text-danger"></i>
          </div>
        </div>
      </li>
    `
  }
}