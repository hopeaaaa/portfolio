const dots = document.querySelectorAll(".accordion__dot");
const prev = document.querySelectorAll(".accordion__gallery_prev");
const next = document.querySelectorAll(".accordion__gallery_next");
const images = document.querySelectorAll(".accordion__gallery_img");

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    images.forEach((img) => img.classList.remove("is-active"));
    dots.forEach((d) => d.classList.remove("is-active"));

    images[index].classList.add("is-active");
    dot.classList.add("is-active");
  });
});

prev.forEach((prev, index) => {
  prev.addEventListener("click", () => {
    images.forEach((img) => img.classList.remove("is-active"));
    prev.forEach((d) => d.classList.remove("is-active"));

    images[index].classList.add("is-active");
    prev.classList.add("is-active");
  });
});

document.querySelectorAll(".solutions__pause-btn").forEach((btn) => {
  const video = btn.closest(".solutions__video-wrapper").querySelector("video");

  btn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="3" y="2" width="4" height="12" rx="1" fill="currentColor"/>
        <rect x="9" y="2" width="4" height="12" rx="1" fill="currentColor"/>
      </svg>`;
    } else {
      video.pause();
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polygon points="4,2 13,8 4,14" fill="currentColor"/>
      </svg>`;
    }
  });
});
