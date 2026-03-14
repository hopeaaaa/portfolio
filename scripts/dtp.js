document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider-input");
  const topWrap = document.querySelector(".slider-img-wrap--top");
  const divider = document.querySelector(".slider-divider");
  const panels = document.querySelectorAll(".slider-text__panel");

  slider.addEventListener("input", () => {
    const value = slider.value;

    // clip instead of resize — keeps image same size
    topWrap.style.clipPath = `inset(0 ${100 - value}% 0 0)`;

    // move divider
    divider.style.left = value + "%";

    // swap text
    if (value < 50) {
      panels[0].classList.add("visible");
      panels[1].classList.remove("visible");
    } else {
      panels[1].classList.add("visible");
      panels[0].classList.remove("visible");
    }
  });
});
