let mybutton = document.getElementById("myBtn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox__close");

///Lightbox
document.querySelectorAll(".final-design__co-img").forEach((img) => {
  img.addEventListener("click", function () {
    lightbox.style.display = "flex";
    lightboxImg.src = this.src;
  });
});

closeBtn.addEventListener("click", function () {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

///Back to top
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
