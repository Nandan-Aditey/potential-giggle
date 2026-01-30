  // Simple image modal
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.getElementById('modal-close');

  document.querySelectorAll('[data-modal-target]').forEach(el => {
    el.addEventListener('click', () => {
      const img = el.querySelector('img');
      modalImg.src = img.src;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeBtn.click();
  });
