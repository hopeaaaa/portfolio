const dots = document.querySelectorAll(".dot");
const images = document.querySelectorAll(".finaldesign__gallery_img");

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    images.forEach((img) => img.classList.remove("is-active"));
    dots.forEach((d) => d.classList.remove("is-active"));

    images[index].classList.add("is-active");
    dot.classList.add("is-active");
  });
});

function activateTool(tool) {
  document.querySelectorAll(".tools__tab").forEach((tab) => {
    tab.setAttribute("aria-selected", "false");
  });
  document.querySelectorAll(".tools__panel").forEach((panel) => {
    panel.hidden = true;
  });
  document.getElementById("tab-" + tool).setAttribute("aria-selected", "true");
  document.getElementById("panel-" + tool).hidden = false;
}

document.addEventListener("DOMContentLoaded", () => {
  activateTool("career");
});
