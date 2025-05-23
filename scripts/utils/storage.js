// Busca tasks
export const getTasks = () => JSON.parse(localStorage.getItem("tasks") || "[]")

// Adiciona tasks
export const setTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks))

// Limpa chave caso vazia
export const clearTaskIfEmpty = () => {
  const tasks = getTasks()
  if (tasks.length === 0) localStorage.removeItem("tasks")
}