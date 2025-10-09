document.querySelectorAll(".casestudies__toggle").forEach((btn) => {
  const projectsId = btn.getAttribute("aria-controls");
  const projects = document.getElementById(projectsId);
  if (!projects) return; // safety

  // start closed (optional if CSS defaults closed)
  projects.classList.remove("is-open");
  btn.setAttribute("aria-expanded", "false");

  btn.addEventListener("click", () => {
    const isOpen = projects.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const transition = document.querySelector(".page-transition");
  setTimeout(() => {
    transition.remove(); // remove overlay after fade
  }, 1000);
});
