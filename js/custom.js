// project Function to open modal and display clicked image
function openModal(imagePath) {
  var modalImage = document.getElementById('fullImage');
  modalImage.src = imagePath;
}

// const texts = ["Life products as they should be!"];
// let currentIndex = 0;
// const textElement = document.getElementById("dynamic-text");

// // Function to update the text and reset animation
// function updateText() {
//   textElement.textContent = texts[currentIndex];
//   textElement.classList.remove('slide-animation');
//   void textElement.offsetWidth;
//   textElement.classList.add('slide-animation');
//   currentIndex = (currentIndex + 1) % texts.length;
// }
// // Change text every 10 seconds
// setInterval(updateText, 9000); // Adjust interval based on your animation timing


// after before start
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const before = document.querySelector(".before");
  const container = document.querySelector(".before-after-container");

  let isDragging = false;

  const updateSlider = (x) => {
    const rect = container.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(x - rect.left, rect.width));
    const percentage = (offsetX / rect.width) * 100;

    before.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    slider.style.left = `${percentage}%`;
  };

  // Handle drag events
  slider.addEventListener("mousedown", () => (isDragging = true));
  document.addEventListener("mousemove", (e) => isDragging && updateSlider(e.clientX));
  document.addEventListener("mouseup", () => (isDragging = false));

  // Handle button click events
  const showBeforeButton = document.getElementById("show-before");
  const showAfterButton = document.getElementById("show-after");

  showBeforeButton.addEventListener("click", () => {
    before.style.clipPath = `inset(0 0% 0 0)`;
    slider.style.left = `0%`;
  });

  showAfterButton.addEventListener("click", () => {
    before.style.clipPath = `inset(0 100% 0 0)`;
    slider.style.left = `100%`;
  });
});
// after before end
