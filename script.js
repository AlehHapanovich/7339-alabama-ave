(function () {
  const PHOTO_COUNT = 34;
  const photos = Array.from({ length: PHOTO_COUNT }, (_, i) =>
    `images/File_${String(i).padStart(3, "0")}.png`
  );

  const galleryEl = document.getElementById("gallery");
  photos.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `7339 Alabama Ave photo ${index + 1}`;
    img.loading = "lazy";
    img.dataset.index = index;
    galleryEl.appendChild(img);
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = photos[currentIndex];
    lightbox.classList.add("open");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightboxImg.src = "";
  }

  function showRelative(delta) {
    currentIndex = (currentIndex + delta + photos.length) % photos.length;
    lightboxImg.src = photos[currentIndex];
  }

  galleryEl.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      openLightbox(Number(e.target.dataset.index));
    }
  });

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
