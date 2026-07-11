(function () {
  const PHOTO_COUNT = 34;
  const photos = Array.from({ length: PHOTO_COUNT }, (_, i) =>
    `images/File_${String(i).padStart(3, "0")}.png`
  );

  /* Slider */
  const sliderImg = document.getElementById("slider-img");
  const sliderCounter = document.getElementById("slider-counter");
  let sliderIndex = 0;

  function renderSlider() {
    sliderImg.src = photos[sliderIndex];
    sliderCounter.textContent = `${sliderIndex + 1} / ${photos.length}`;
  }

  function moveSlider(delta) {
    sliderIndex = (sliderIndex + delta + photos.length) % photos.length;
    renderSlider();
  }

  document.querySelector(".slider-prev").addEventListener("click", () => moveSlider(-1));
  document.querySelector(".slider-next").addEventListener("click", () => moveSlider(1));
  sliderImg.addEventListener("click", () => openLightbox(sliderIndex));
  renderSlider();

  /* Grid + expand toggle */
  const galleryEl = document.getElementById("gallery-grid");
  const viewAllBtn = document.getElementById("view-all-toggle");

  photos.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `7339 Alabama Ave photo ${index + 1}`;
    img.loading = "lazy";
    img.dataset.index = index;
    galleryEl.appendChild(img);
  });

  function updateToggleLabel() {
    const expanded = galleryEl.classList.contains("expanded");
    viewAllBtn.textContent = expanded ? "Hide Photos" : `View All ${photos.length} Photos`;
  }
  updateToggleLabel();

  viewAllBtn.addEventListener("click", () => {
    galleryEl.classList.toggle("expanded");
    updateToggleLabel();
    if (galleryEl.classList.contains("expanded")) {
      galleryEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

  galleryEl.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      openLightbox(Number(e.target.dataset.index));
    }
  });

  /* Lightbox */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCounter = document.getElementById("lightbox-counter");
  let currentIndex = 0;

  function renderLightbox() {
    lightboxImg.src = photos[currentIndex];
    lightboxCounter.textContent = `${currentIndex + 1} / ${photos.length}`;
  }

  function openLightbox(index) {
    currentIndex = index;
    renderLightbox();
    lightbox.classList.add("open");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightboxImg.src = "";
  }

  function showRelative(delta) {
    currentIndex = (currentIndex + delta + photos.length) % photos.length;
    renderLightbox();
  }

  document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  document.querySelector(".lightbox-prev").addEventListener("click", () => showRelative(-1));
  document.querySelector(".lightbox-next").addEventListener("click", () => showRelative(1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showRelative(-1);
    if (e.key === "ArrowRight") showRelative(1);
  });

  /* Back to top */
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 600);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* Contact form */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Sending...";
    status.style.color = "";
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        status.textContent = "Thanks! Your message has been sent.";
        status.style.color = "green";
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      status.textContent = "Sorry, something went wrong. Please try again.";
      status.style.color = "crimson";
    }
  });
})();
