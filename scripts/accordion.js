document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".accordion__item");

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion__trigger");
    const content = item.querySelector(".accordion__content");

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("accordion__item--active");

      // Close all
      items.forEach((otherItem) => {
        const otherContent = otherItem.querySelector(".accordion__content");
        const otherTrigger = otherItem.querySelector(".accordion__trigger");

        otherItem.classList.remove("accordion__item--active");
        otherContent.style.maxHeight = null;
        otherTrigger.setAttribute("aria-expanded", "false");
      });

      // Open current if it wasn't already open
      if (!isOpen) {
        item.classList.add("accordion__item--active");
        content.style.maxHeight = content.scrollHeight + "px";
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
});

/* document.querySelectorAll(".accordion__trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".accordion__item");
    const content = item.querySelector(".accordion__content");
    const isOpen = item.classList.toggle("accordion__item--active");

    trigger.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = null;
    }
  });
}); */

/* document.querySelectorAll(".casestudies__toggle").forEach((btn) => {
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
 */
