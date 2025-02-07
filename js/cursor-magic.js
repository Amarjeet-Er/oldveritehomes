// Create the custom cursor element
var cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

var mouse = { x: 0, y: 0 }; // Current mouse position
var pos = { x: 0, y: 0 }; // Smoothed cursor position
var ratio = 0.1; // Cursor follow ratio

// Track mouse position
document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Update the cursor position
function updatePosition() {
    pos.x += (mouse.x - pos.x) * ratio;
    pos.y += (mouse.y - pos.y) * ratio;

    cursor.style.left = pos.x - cursor.offsetWidth / 2 + 'px';
    cursor.style.top = pos.y - cursor.offsetHeight / 2 + 'px';
}

// Continuously update the cursor position
function animateCursor() {
    updatePosition();
    requestAnimationFrame(animateCursor);
}

// Start the animation loop
animateCursor();
