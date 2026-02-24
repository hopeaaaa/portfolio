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
