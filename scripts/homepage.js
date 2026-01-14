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
    threshold: 0.15,
    rootMargin: "0px 0px -10% 0px",
  }
);

cards.forEach((card) => observer.observe(card));
