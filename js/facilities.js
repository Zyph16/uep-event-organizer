document.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.getElementById("sliderTrack");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let cards = [];
  let currentIndex = 0;

  
  function renderSlides() {
  const visibleSlides = [];

  const maxOffset = cards.length >= 5 ? 2 : Math.floor((cards.length - 1) / 2);

  for (let i = -maxOffset; i <= maxOffset; i++) {
    let index = (currentIndex + i + cards.length) % cards.length;
    visibleSlides.push({
      ...cards[index],            // <- Use spread to avoid needing `.content`
      isActive: i === 0
    });
  }

  sliderTrack.innerHTML = visibleSlides
    .map(
      (slide) => `
      <div class="slide ${slide.isActive ? "active" : ""}">
        <div class="card">
          <img src="${slide.image_path}" alt="${slide.FacilityName}"
          style = "width : 100%; height : 100%; border-radius : 30px;"/>
        </div>
      </div>`
    )
    .join("");

  updateSlideScale(); // Keep the scale effect applied
  

}


  // Animate to the left or right
  let isAnimating = false;

  function updateSlideScale() {
  const slides = document.querySelectorAll(".slide");
  const centerIndex = Math.floor(slides.length / 2); // middle of visible area

  slides.forEach((slide, index) => {
    const distance = Math.abs(index - centerIndex);
    
    // Scale and opacity falloff based on distance from center
    const scale = 1 - 0.3 * distance; // shrink 20% per step away
    const opacity = 1 - 0.3 * distance;

    slide.style.transform = `scale(${scale})`;
    slide.style.opacity = opacity;
    slide.style.zIndex = 10 - distance; // Ensure center is on top
  });
}

 function slide(direction) {
  if (isAnimating) return;
  isAnimating = true;

  const slides = document.querySelectorAll(".slide");
  const centerIndex = Math.floor(slides.length / 2);

  // Prepare animation
  slides.forEach((slide, index) => {
    const distance = index - centerIndex;

    // Predict next distance after slide
    const nextDistance =
      direction === "next" ? distance - 1 : distance + 1;

    const scale = 1 - 0.3 * Math.abs(nextDistance);
    const opacity = 1 - 0.3 * Math.abs(nextDistance);
    const zIndex = 100 - Math.abs(nextDistance);

    slide.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    slide.style.transform = `translateX(${direction === "next" ? -280 : 280}px) scale(${scale})`;
    slide.style.opacity = opacity;
    slide.style.zIndex = zIndex;
  });

  // Wait for animation, then re-render
  setTimeout(() => {
    sliderTrack.style.transition = "none";
    sliderTrack.style.transform = "translateX(0)";
    currentIndex =
      direction === "next"
        ? (currentIndex + 1) % cards.length
        : (currentIndex - 1 + cards.length) % cards.length;

    renderSlides(); // redraw new center
    isAnimating = false;
  }, 500);
}
  fetch("backend/get_facilities.php")
    .then(res => res.json())
    .then((data) => {
      cards = data;
      renderSlides();
    })
  .catch((err) => console.error("Error Loading images:", err));
  
  const maxOffset = cards.length >= 5 ? 2 : Math.floor((cards.length - 1) / 2);

  for (let i = -maxOffset; i <= maxOffset; i++) {
    let index = (currentIndex + i + cards.length) % cards.length;
    visibleSlides.push({
      content: cards[index],
      isActive: i === 0,
    });
  }


  prevBtn.addEventListener("click", () => slide("prev"));
  nextBtn.addEventListener("click", () => slide("next"));

  renderSlides(); // Initial render
})