// intro js
import introJs from 'intro.js'
import 'intro.js/minified/introjs.min.css'

export const startIntroJS = () => {
  const intro = introJs()
  
  intro.setOptions({
    steps: [
      {
        intro: "Bem vindo ao meu gerenciador de tarefas!"
      },
      {
        element: document.querySelector('#formNotes'),
        intro: "Aqui você pode adicionar um nova tarefa"
      },
      {
        element: document.querySelector('#taskInput'),
        intro: "Digite a tarefa que deseja adicionar"
      },
      {
        element: document.querySelector('#btnAddTask'),
        intro: "Clique no botão para adicionar a tarefa"
      },
      {
        element: document.querySelector('#todoList'),
        intro: "Aqui aparecerá a lista dos itens que você adicionou"
      },
      {
        element: document.querySelector('#todoList li'),
        intro: "Você pode interagir com os itens"
      },
      {
        element: document.querySelector('.complete-button'),
        intro: "Clique no botão preto para completar uma tarefa"
      },
      {
        element: document.querySelector('.delete-button'),
        intro: "Clique no botão vermelho para deletar uma tarefa"
      },
      {
        intro: `
          Obrigado por usar o <strong>todo-leaf</strong>!<br>
          Gostou? <br> Entre em contato:<br>
          <a href="https://wa.me/5519992282130" target="_blank">
            WhatsApp 🔗
          </a>
        `
      }
    ],
  })

  intro.start()
}