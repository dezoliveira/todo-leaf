const formNotes = document.getElementById("formNotes")
const taskInput = document.getElementById("taskInput")
const todoList = []
let i = 0

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
  taskInput.value = ''
  taskInput.focus()

  renderTaskList()
  
}

const deleteTask = (e) => {
  e.preventDefault()
  alert('delete')
}

const completeTask = (e) => {
  e.preventDefault()
  alert('complete')
}

const renderTaskList = () => {
  
}