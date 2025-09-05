document.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.getElementById("sliderTrack");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let cards = [];
  let currentIndex = 0;

  
  function renderSlides() {
  const visibleSlides = [];

  const maxOffset = cards.length >=  2 ? 2 : Math.floor((cards.length - 1) / 2);

  for (let i = -maxOffset; i <= maxOffset; i++) {
    let index = (currentIndex + i + cards.length) % cards.length;
    visibleSlides.push({
      ...cards[index],           
      isActive: i === 0
    });
  }

  sliderTrack.innerHTML = visibleSlides
    .map(
      (slide) => `
      <div class="slide ${slide.isActive ? "active" : ""}">
        <div class="card">
          <img src="${slide.image_path}" alt="${slide.FacilityName}"
          style = "width : 100%; height : 100%; border-radius : 55px;"/>
        </div>
      </div>`
    )
    .join("");

  updateSlideScale();
  

}

function renderSlideIndicators() {
  const indicatorsContainer = document.getElementById("slideIndicators");
  indicatorsContainer.innerHTML = "";

  const totalIndicators = cards.length;
  const maxVisibleDots = 5;

  // Determine the starting index for the visible dots window
  let start = Math.floor(currentIndex / maxVisibleDots) * maxVisibleDots;
  let end = Math.min(start + maxVisibleDots, totalIndicators);

 

  for (let i = start; i < end; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    dot.textContent = cards[i].FacilityID;
    if (i === currentIndex) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      currentIndex = i;
      renderSlides();
      renderSlideIndicators();
    });

  
    indicatorsContainer.appendChild(dot);
  }
}



  let isAnimating = false;

  function updateSlideScale() {
  const slides = document.querySelectorAll(".slide");
  const centerIndex = Math.floor(slides.length / 2); 

  slides.forEach((slide, index) => {
    const distance = Math.abs(index - centerIndex);
    
   
    const scale = 1 - 0.3 * distance;

    slide.style.transform = `scale(${scale})`;
    slide.style.zIndex = 10 - distance;
  });
}

 function slide(direction) {
  if (isAnimating) return;
  isAnimating = true;

  const slides = document.querySelectorAll(".slide");
  const centerIndex = Math.floor(slides.length / 2);


  slides.forEach((slide, index) => {
    const distance = index - centerIndex;

    const nextDistance =
      direction === "next" ? distance - 1 : distance + 1;

    const scale = 1 - 0.3 * Math.abs(nextDistance);
    const zIndex = 100 - Math.abs(nextDistance);

    slide.style.transition = "transform 0.5s ease";
    slide.style.transform = `translateX(${direction === "next" ? -280 : 280}px) scale(${scale})`;
    slide.style.zIndex = zIndex;
  });

 
  setTimeout(() => {
    sliderTrack.style.transition = "none";
    sliderTrack.style.transform = "translateX(0)";
    currentIndex =
      direction === "next"
        ? (currentIndex + 1) % cards.length
        : (currentIndex - 1 + cards.length) % cards.length;

      
    renderSlides();
    renderSlideIndicators();  
    isAnimating = false;
  }, 500);
}
  fetch("backend/get_facilities.php")
    .then(res => res.json())
    .then((data) => {
      cards = data;
      renderSlides();
      renderSlideIndicators(); // ← Add this
      updateSlideScale();
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

  renderSlides();
  
})