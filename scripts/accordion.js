document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".accordion__item");

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion__trigger");
    const content = item.querySelector(".accordion__content");

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("accordion__item--active");

      if (isOpen) {
        item.classList.remove("accordion__item--active");
        content.style.maxHeight = null;
        trigger.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("accordion__item--active");
        content.style.maxHeight = content.scrollHeight + "px";
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
});
