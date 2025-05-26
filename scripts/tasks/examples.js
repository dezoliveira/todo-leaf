// Imports
import { getTasks, setTasks } from "../utils/storage"
import { renderTaskList } from "./render"

// Função que cria exemplos na lista
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
  }
}