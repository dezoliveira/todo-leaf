import { renderTaskList } from "../tasks/render"

// Cria a paginação
export const createPagination = (tasks) => {
  // elemento paginação
  const pagination = document.querySelector('#pagination')
  
  // calcula o número de páginas com base no número de tarefas
  const pages = Math.ceil(tasks.length / 10)
  let html = '<ul class="pagination d-flex justify-content-end m-0 p-2">'

  // exibe apenas se tiver alguma página
  if (pages <= 1) {
    pagination.style.display = 'none'
    return
  }

  pagination.style.display = 'block'

  // renderiza lista de páginas
  for (let i = 1; i <= pages; i++) {
    html += `<a class="page-link" data-page="${i}"><li class="page-item">${i}</li></a>`
  }

  html += '</ul>'
  pagination.innerHTML = html

  // adiciona evento de clique nas páginas e enviar página clicada
  document.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()

      const page = parseInt(e.currentTarget.getAttribute('data-page'))
      renderTaskList(page)
    })
  })
}