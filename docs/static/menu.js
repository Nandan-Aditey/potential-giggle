window.addEventListener("scroll", () => {
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / docHeight) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
  });