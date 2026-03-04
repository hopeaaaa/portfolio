document.addEventListener("DOMContentLoaded", () => {
  // ---- Case studies rise on load ----
  setTimeout(() => {
    const section = document.querySelector(".casestudies");
    if (section) {
      section.classList.add("casestudies--loaded");
    }
  }, 4000);
});

const cards = document.querySelectorAll(".casestudies__preview");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  {
    threshold: 0.05,
    rootMargin: "0px 0px -10% 0px",
  },
);

cards.forEach((card) => observer.observe(card));
