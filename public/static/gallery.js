function openModal(src, caption) {
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImg");

  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal() {
  document.getElementById("photoModal").style.display = "none";
}

// Scroll progress bar
  window.addEventListener("scroll", () => {
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / docHeight) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
  });
  