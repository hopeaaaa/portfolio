// ─── Lightbox ─────────────────────────────────────────────────────────────────
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox__close");

document.querySelectorAll(".final-design__co-img").forEach((img) => {
  img.addEventListener("click", function () {
    if (lightbox) lightbox.style.display = "flex";
    if (lightboxImg) lightboxImg.src = this.src;
  });
});

if (closeBtn) {
  closeBtn.addEventListener("click", function () {
    lightbox.style.display = "none";
  });
}

if (lightbox) {
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) lightbox.style.display = "none";
  });
}

// ─── Back to top ──────────────────────────────────────────────────────────────
const mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  if (!mybutton) return;
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
