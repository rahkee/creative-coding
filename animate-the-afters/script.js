(function () {
  const card = document.getElementById("course-card");
  const replayBtn = document.getElementById("replay-btn");
  const icon = replayBtn.querySelector("i");

  const countSpans = card.querySelectorAll("[data-count]");
  const targets = Array.from(countSpans).map((el) => ({
    el,
    end: parseInt(el.getAttribute("data-count"), 10),
  }));

  let countFrame = null;

  function cancelCount() {
    if (countFrame !== null) {
      cancelAnimationFrame(countFrame);
      countFrame = null;
    }
  }

  function runCountUp(durationMs) {
    cancelCount();
    const start = performance.now();

    targets.forEach(({ el, end }) => {
      el.textContent = "0";
    });

    function tick(now) {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 5);
      targets.forEach(({ el, end }) => {
        el.textContent = String(Math.round(eased * end));
      });
      if (t < 1) {
        countFrame = requestAnimationFrame(tick);
      } else {
        targets.forEach(({ el, end }) => {
          el.textContent = String(end);
        });
        countFrame = null;
      }
    }

    countFrame = requestAnimationFrame(tick);
  }

  function playAnimation(replay) {
    cancelCount();

    if (replay) {
      card.classList.remove("active");
      void card.offsetWidth;
    }
    card.classList.add("active");

    icon.classList.remove("spinning");
    void icon.offsetWidth;
    icon.classList.add("spinning");

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReduced) {
      runCountUp(900);
    } else {
      targets.forEach(({ el, end }) => {
        el.textContent = String(end);
      });
    }
  }

  replayBtn.addEventListener("click", () => playAnimation(true));

  function start() {
    playAnimation(false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
