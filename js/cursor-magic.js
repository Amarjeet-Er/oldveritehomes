// // Create the custom cursor element
// var cursor = document.createElement('div');
// cursor.classList.add('cursor');
// document.body.appendChild(cursor);

// var mouse = { x: 0, y: 0 }; // Current mouse position
// var pos = { x: 0, y: 0 }; // Smoothed cursor position
// var ratio = 0.1; // Cursor follow ratio

// // Track mouse position
// document.addEventListener('mousemove', function (e) {
//     mouse.x = e.clientX;
//     mouse.y = e.clientY;
// });

// // Update the cursor position
// function updatePosition() {
//     pos.x += (mouse.x - pos.x) * ratio;
//     pos.y += (mouse.y - pos.y) * ratio;

//     cursor.style.left = pos.x - cursor.offsetWidth / 2 + 'px';
//     cursor.style.top = pos.y - cursor.offsetHeight / 2 + 'px';
// }

// // Continuously update the cursor position
// function animateCursor() {
//     updatePosition();
//     requestAnimationFrame(animateCursor);
// }

// // Start the animation loop
// animateCursor();


// pdf view start

document.addEventListener("DOMContentLoaded", function () {
    var openPdfBtn = document.getElementById("openPdfBtn");
    if (!openPdfBtn) {
        console.error("Button not found");
        return;
    }

    openPdfBtn.addEventListener("click", function () {
        var url = "https://oldveritehomes.vercel.app/img/Catalogue.pdf";
        var container = document.getElementById("pdfContainer");
        var loader = document.getElementById("pdfLoader");

        container.innerHTML = ""; // Clear previous content
        loader.style.display = "block"; // Show loader

        // Use inline worker for iOS compatibility
        var pdfjsWorkerSrc = URL.createObjectURL(new Blob([`
        importScripts('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js');
    `], { type: "application/javascript" }));

        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc;

        pdfjsLib.getDocument(url).promise.then(function (pdf) {
            console.log("PDF loaded, total pages:", pdf.numPages);

            function renderPage(pageNum) {
                pdf.getPage(pageNum).then(function (page) {
                    var scale = window.innerWidth > 768 ? 1.5 : 1.2; // Reduce scale for iOS memory limits
                    var viewport = page.getViewport({ scale: scale });

                    var canvas = document.createElement("canvas");
                    canvas.classList.add("mb-3");
                    container.appendChild(canvas);

                    var context = canvas.getContext("2d");

                    var outputScale = window.devicePixelRatio || 1;
                    canvas.width = Math.floor(viewport.width * outputScale);
                    canvas.height = Math.floor(viewport.height * outputScale);
                    canvas.style.width = Math.floor(viewport.width) + "px";
                    canvas.style.height = Math.floor(viewport.height) + "px";

                    context.scale(outputScale, outputScale);
                    context.imageSmoothingEnabled = true;
                    context.imageSmoothingQuality = "high";

                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };

                    page.render(renderContext).promise.then(function () {
                        console.log("Page " + pageNum + " rendered");

                        if (pageNum < pdf.numPages) {
                            renderPage(pageNum + 1);
                        } else {
                            loader.style.display = "none"; // Hide loader after rendering all pages
                        }
                    }).catch(function (err) {
                        console.error("Rendering error:", err);
                        loader.innerHTML = "<p class='text-danger'>Error rendering page.</p>";
                    });
                });
            }

            renderPage(1);

        }).catch(function (error) {
            console.error("Error loading PDF:", error);
            loader.innerHTML = "<p class='text-danger'>Failed to load PDF.</p>";
        });
    });
});
// pdf view end