# Todo Leaf
#### Visão Geral
Bem vindo ao Todo Leaf, aplicativo de TodoList completo para criar sua lista de tarefas do dia a dia.

Suas funcionalidades são:

- Criação de uma tarefa.
- Conclusão de uma tarefa.
- Deleção de uma tarefa.

Acesse: https://todo-leaf.vercel.app/

---
#### Tecnologias 
- HTML/CSS
- Bootstrap
- Javascript
- Font Awesome
- Vite

---
#### Scripts
- elements
    - alert.js
    - modal.js

- tasks
    - taskList.js
    - tasks.js

--- 
#### Funções
- alert.js
    - toggleAlert: Renderiza condicionalmente o alert no aplicativo conforme os parâmetros
        - parametros:
            - success
            - danger
            - info 

- modal.js
    - closeModal: Gerencia o fechamento do modal ao excluir uma task

- tasks.js
    - beginTask: Inicia o usuário no fluxo ao clicar em "Adicione uma tarefa".
    - addTask: Adiciona uma task a todoList.
    - completeTask: Competa a task selecionada na todoList.
    - deleteTask: Deleta a task selecionada da TodoList

- taskList.js
    - renderTaskList: Renderiza toda a taskList no DOM dinamicamente.

--- 

#### Como Rodar o Projeto (local)
- git clone https://www.github.com/dezoliveira/todo-leaf
- cd todo-leaf
- npm install
- npm run dev
- acesse: http://localhost:5173/