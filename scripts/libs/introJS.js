// intro js
import introJs from 'intro.js'
import 'intro.js/minified/introjs.min.css'

export const startIntroJS = () => {
  introJs().setOptions({
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
        intro: "Obrigado por usar o todo-leaf. Gostou? entre em contato: 19992282130"
      }
    ]
  }).start()
}