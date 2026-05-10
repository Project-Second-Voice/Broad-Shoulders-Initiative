const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function setMenu(open) {
  if (!navToggle || !navLinks) return;
  navLinks.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    setMenu(!navLinks.classList.contains("open"));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
}
