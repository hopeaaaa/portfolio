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

(function () {
  const TARGETS = [5, 3, 3];
  const LOOP = true;
  const LOOP_GAP = 2500;

  let tids = [];

  function clearAll() {
    tids.forEach(clearTimeout);
    tids = [];
  }
  function after(ms, fn) {
    const id = setTimeout(fn, ms);
    tids.push(id);
  }

  function reset() {
    for (let i = 0; i < 3; i++) {
      const card = document.getElementById("c" + i);
      const bar = document.getElementById("b" + i);
      card.style.transition = "none";
      bar.style.transition = "none";
      card.classList.remove("in");
      bar.style.width = "0%";
      document.getElementById("n" + i).textContent = "0";
      requestAnimationFrame(() => {
        card.style.transition = "";
        bar.style.transition = "";
      });
    }
    const banner = document.getElementById("flag");
    banner.style.transition = "none";
    banner.classList.remove("in");
    requestAnimationFrame(() => {
      banner.style.transition = "";
    });
    ["fi0", "fs0", "fi1", "fs1", "fi2"].forEach((id) =>
      document.getElementById(id).classList.remove("in"),
    );
  }

  function countUp(elId, target, duration) {
    const el = document.getElementById(elId);
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function play() {
    reset();
    [0, 1, 2].forEach((i) => {
      after(100 + i * 180, () => {
        document.getElementById("c" + i).classList.add("in");
        after(200, () => {
          document.getElementById("b" + i).style.width = "100%";
          countUp("n" + i, TARGETS[i], 550);
        });
      });
    });
    after(900, () => {
      document.getElementById("flag").classList.add("in");
      ["fi0", "fs0", "fi1", "fs1", "fi2"].forEach((id, j) => {
        after(200 + j * 240, () =>
          document.getElementById(id).classList.add("in"),
        );
      });
    });
    if (LOOP) {
      const total = 900 + 200 + 4 * 240 + 400;
      after(total + LOOP_GAP, play);
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          play();
        } else {
          clearAll();
          reset();
        }
      });
    },
    { threshold: 0.3 },
  );

  observer.observe(document.getElementById("summary-widget"));
})();

(function () {
  // ── define your regions here as percentages of each image ──
  // x, y = top-left corner; w, h = width/height (all 0–1)
  // zoom = how much to zoom in on that region
  const STEPS = [
    {
      label: "Patient Header",
      a: { x: 0, y: 0.3, w: 1, h: 0.12 },
      b: { x: 0, y: 0.28, w: 1, h: 0.2 },
      zoom: 1.8,
    },
    {
      label: "Modules Sidebar",
      a: { x: 0.12, y: 0.17, w: 0.43, h: 0.8 },
      b: { x: 0.12, y: 0.17, w: 0.43, h: 0.8 },
      zoom: 1.6,
    },
    {
      label: "Status Filters",
      a: { x: 0.08, y: 0.4, w: 0.96, h: 0.14 },
      b: { x: 0.12, y: 0.4, w: 0.9, h: 0.83 },
      zoom: 2.2,
    },
    {
      label: "Issue List",
      a: { x: 0.22, y: 0.25, w: 0.76, h: 0.55 },
      b: { x: 0.27, y: 0.42, w: 0.65, h: 0.49 },
      zoom: 1.2,
    },
  ];

  const HOLD = 2200;
  const OVERVIEW = 1200;

  let current = -1;
  let paused = false;
  let tid = null;

  const stepsRow = document.getElementById("steps-row");

  STEPS.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "step-dot";
    dot.addEventListener("click", () => {
      clearTimeout(tid);
      goTo(i);
    });
    stepsRow.appendChild(dot);
  });

  function getDots() {
    return stepsRow.querySelectorAll(".step-dot");
  }

  function applyHighlight(innerId, hlId, imgId, rect, zoom) {
    const inner = document.getElementById(innerId);
    const hl = document.getElementById(hlId);
    const img = document.getElementById(imgId);
    const W = inner.offsetWidth;
    const H = inner.offsetHeight;

    const top = rect.y * H;
    const left = rect.x * W;
    const width = rect.w * W;
    const height = rect.h * H;

    hl.style.top = top + "px";
    hl.style.left = left + "px";
    hl.style.width = width + "px";
    hl.style.height = height + "px";
    hl.classList.add("visible");

    const cx = left + width / 2;
    const cy = top + height / 2;
    const tx = W / 2 - cx * zoom;
    const ty = H / 2 - cy * zoom;
    img.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom})`;
  }

  function resetView(innerId, hlId, imgId) {
    document.getElementById(imgId).style.transform = "";
    document.getElementById(hlId).classList.remove("visible");
  }

  function goTo(idx) {
    current = idx;
    getDots().forEach((d, i) => d.classList.toggle("active", i === idx));

    const step = STEPS[idx];
    document.getElementById("stage-label").textContent = step.label;

    applyHighlight("inner-a", "hl-a", "img-a", step.a, step.zoom);
    applyHighlight("inner-b", "hl-b", "img-b", step.b, step.zoom);

    if (!paused) {
      tid = setTimeout(() => {
        const next = (idx + 1) % STEPS.length;
        next === 0 ? goOverview() : goTo(next);
      }, HOLD);
    }
  }

  function goOverview() {
    document.getElementById("stage-label").textContent = "Overview";
    getDots().forEach((d) => d.classList.remove("active"));
    resetView("inner-a", "hl-a", "img-a");
    resetView("inner-b", "hl-b", "img-b");
    if (!paused) {
      tid = setTimeout(() => goTo(0), OVERVIEW);
    }
  }

  const pauseSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
  const playSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;

  document.getElementById("pbtn").addEventListener("click", () => {
    paused = !paused;
    document.getElementById("pbtn").innerHTML = paused ? playSVG : pauseSVG;
    document
      .getElementById("pbtn")
      .setAttribute(
        "aria-label",
        paused ? "Resume animation" : "Pause animation",
      );
    if (!paused) {
      clearTimeout(tid);
      goTo(current === -1 ? 0 : current);
    } else {
      clearTimeout(tid);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!paused && current === -1) setTimeout(() => goTo(0), 400);
        } else {
          clearTimeout(tid);
          goOverview();
          current = -1;
        }
      });
    },
    { threshold: 0.3 },
  );
  observer.observe(document.getElementById("proto-comparison"));
})();
