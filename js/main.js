(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll(".has-sub > a").forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (window.matchMedia("(max-width: 980px)").matches) {
        event.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });

  function setupSlider(root, slideSelector, prevSelector, nextSelector, dotSelector) {
    if (!root) return;
    var slides = Array.prototype.slice.call(root.querySelectorAll(slideSelector));
    if (!slides.length) return;
    var dots = dotSelector ? Array.prototype.slice.call(root.querySelectorAll(dotSelector)) : [];
    var index = 0;
    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
    }
    var prev = root.querySelector(prevSelector);
    var next = root.querySelector(nextSelector);
    if (prev) prev.addEventListener("click", function () { show(index - 1); });
    if (next) next.addEventListener("click", function () { show(index + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { show(i); });
    });
    if (root.hasAttribute("data-autoplay")) {
      setInterval(function () { show(index + 1); }, 7000);
    }
  }

  setupSlider(document.querySelector("[data-hero]"), ".slide", ".prev", ".next", ".hero-dots button");
  setupSlider(document.querySelector("[data-quotes]"), ".quote", ".prev", ".next");

  document.querySelectorAll("form[data-mock]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var note = form.querySelector(".form-note");
      if (note) note.classList.add("is-visible");
      form.reset();
    });
  });

  document.querySelectorAll("[data-play]").forEach(function (play) {
    play.addEventListener("click", function () {
      var note = document.querySelector(".video-note");
      if (note) note.style.display = "block";
    });
  });

  var toTop = document.querySelector(".to-top");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
