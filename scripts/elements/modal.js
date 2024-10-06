export const closeModal = () => {
  const modalElement = document.getElementById('exampleModal');
  const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
  modal.hide()
}