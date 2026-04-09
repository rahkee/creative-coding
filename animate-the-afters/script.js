(function () {
  const card = document.getElementById("course-card");
  const replayBtn = document.getElementById("replay-btn");

  function addActive() {
    card.classList.add("active");
  }

  function removeActive() {
    card.classList.remove("active");
  }

  function toggleActive() {
    if (card.classList.contains("active")) {
      removeActive();
    } else {
      addActive();
    }
  }

  document.querySelectorAll("[data-count]").forEach((el) => {
    const end = parseInt(el.getAttribute("data-count"), 10);
    if (!Number.isNaN(end)) {
      el.textContent = String(end);
    }
  });

  if (replayBtn) {
    replayBtn.addEventListener("click", () => toggleActive());
  }

  function start() {
    addActive();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
