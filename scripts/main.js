let mybutton = document.getElementById("myBtn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox__close");
const accordionTriggers = document.querySelectorAll(".accordion__trigger");

document.querySelectorAll(".accordion__trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.parentElement;
    item.classList.toggle("accordion__item--active");
  });
});

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

/* document.addEventListener("DOMContentLoaded", () => {
  const transition = document.querySelector(".page-transition");
  setTimeout(() => {
    transition.remove();
  }, 1000);
}); */
