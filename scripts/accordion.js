const accordionTriggers = document.querySelectorAll(".accordion__trigger");

document.querySelectorAll(".accordion__trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.parentElement;
    item.classList.toggle("accordion__item--active");
  });
});

document.querySelectorAll(".accordion__trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const isExpanded = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!isExpanded));
    const content = trigger.parentElement.querySelector(".accordion__content");
    content.classList.toggle("accordion__content--open");
  });
});

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const content = trigger.nextElementSibling;
    const icon = trigger.querySelector(".accordion__icon");

    trigger.classList.toggle("active");
    content.classList.toggle("open");

    accordionTriggers.forEach((other) => {
      if (other !== trigger) {
        other.classList.remove("active");
        other.nextElementSibling.classList.remove("open");
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
