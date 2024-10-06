// função de fechar o modal no bootstrap 5.2
export const closeModal = () => {
  const modalElement = document.getElementById('exampleModal');
  const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
  modal.hide()
}