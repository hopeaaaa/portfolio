document.addEventListener("DOMContentLoaded", () => {
  const allCases = document.querySelectorAll(".casestudies__preview-link");

  allCases.forEach((card) => observer.observe(card));

  // ---- Case studies rise on load ----
  setTimeout(() => {
    const section = document.querySelector(".casestudies");
    if (section) {
      section.classList.add("casestudies--loaded");
    }
  }, 4000);
});
