// /scripts/utils/pagination.js

import { renderTaskList } from "../tasks/render.js"

export const setupPagination = (tasks) => {
  const pagination = document.querySelector('#pagination')
  const pages = Math.ceil(tasks.length / 10)
  let html = 'ul class="d-flex gap-2"'

  if (pages <= 1) {
    pagination.style.display = 'none'
    return
  }

  pagination.style.display = 'block'

  for (let i = 1; i <= pages; i++) {
    html += `<li data-page="${i}">${i}</li>`
  }
}