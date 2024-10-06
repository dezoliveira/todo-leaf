// função que gerencia a exibição do alerta na página
export const toggleAlert = (value) => {

	// elements id
	const alert = document.querySelector(".alert")
	let text = ""
	
	// switch case

	// parametros:
	// - success
	// - danger
	// - info

	// gerencia as classes do alerta conforme o parâmetro
	switch (value){

		// success
		case "success":
			text = "Task adicionada com sucesso."
			alert.classList.remove('alert-danger')
			alert.classList.remove('alert-info')
			alert.classList.add('alert-success')
			break

		// danger
		case "danger":
			text = "Task deletada com sucesso."
			alert.classList.remove('alert-success')
			alert.classList.remove('alert-info')
			alert.classList.add('alert-danger')
			break

		// info
		case "info":
			text = "Task completada com sucesso."
			alert.classList.remove('alert-success')
			alert.classList.remove('alert-danger')
			alert.classList.add('alert-info')
			break

		default: 
			break
	}

	alert.textContent = text

	// temporizador 
	alert.style.display = "block"

	setTimeout(() => {
		alert.style.display = "none"
	}, 2000)
  
}