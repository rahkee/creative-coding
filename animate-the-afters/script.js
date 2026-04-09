(function () {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const end = parseInt(el.getAttribute("data-count"), 10);
    if (!Number.isNaN(end)) {
      el.textContent = String(end);
    }
  });
})();
