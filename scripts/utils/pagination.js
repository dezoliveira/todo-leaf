import { renderTaskList } from "../tasks/render"

export const createPagination = (tasks) => {
  // pagination
  const pagination = document.querySelector('#pagination')
  const pages = Math.ceil(tasks.length / 10)
  let html = '<ul class="d-flex pagination">'

  if (pages <= 1) {
    pagination.style.display = 'none'
    return
  }

  pagination.style.display = 'block'

  for (let i = 1; i <= pages; i++) {
    html += `<a class="page-link" data-page="${i}"><li class="page-item">${i}</li></a>`
  }

  html += '</ul>'
  pagination.innerHTML = html

  document.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()

      const page = parseInt(e.currentTarget.getAttribute('data-page'))
      console.log(page)
      renderTaskList(page)
    })
  })
}