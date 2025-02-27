maximizeImage();

function maximizeImage() {
  document.addEventListener("DOMContentLoaded", () => {
    const cardsChildren = document.querySelectorAll(".img");
    // Create a fixed image container to display the maximized image
    const fixedImageContainer = document.createElement("div");
    fixedImageContainer.style.position = "fixed";
    fixedImageContainer.style.display = "flex";
    fixedImageContainer.style.justifyContent = "center";
    fixedImageContainer.style.alignItems = "center";
    fixedImageContainer.style.top = "50%";
    fixedImageContainer.style.left = "50%";
    fixedImageContainer.style.transform = "translate(-50%, -50%)";
    fixedImageContainer.style.zIndex = "9999";
    fixedImageContainer.style.display = "none";
    fixedImageContainer.style.width = "98vw";
    fixedImageContainer.style.height = "98vh";
    fixedImageContainer.style.backgroundColor = "rgba(48, 159, 224, 0.56)";
    fixedImageContainer.style.borderRadius = "10px";
    fixedImageContainer.style.textAlign = "center";
    fixedImageContainer.style.padding = "20px";
    // fixedImageContainer.style.cursor = "pointer";

    // Create an image element inside the fixed container
    const fixedImage = document.createElement("img");
    fixedImage.style.maxWidth = "100%";
    fixedImage.style.maxHeight = "100%";
    fixedImageContainer.appendChild(fixedImage);
    document.body.appendChild(fixedImageContainer);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    Array.from(cardsChildren).forEach((a) => {
      a.querySelector("img").addEventListener("mouseenter", () => {
        if (fixedImageContainer.style.display !== "flex") {
          crusorElement.style.transform = "scale(4)";
          crusorElement.innerText = " view ";
          crusorElement.style.color = "black";
          crusorElement.style.display = "flex";
          crusorElement.style.justifyContent = "center";
          crusorElement.style.alignItems = "center";
          crusorElement.style.border = "0px solid black";
          crusorElement.style.fontFamily = "Poppins";
          crusorElement.style.fontWeight = "300";
        }
      });

      a.querySelector("img").addEventListener("mouseleave", () => {
        if (fixedImageContainer.style.display !== "flex") {
          crusorElement.style.transform = "scale(1)";
          crusorElement.innerText = "";
        }
      });

      const img = a.querySelector("img");
      if (img) {
        img.addEventListener("click", () => {
          if (
            fixedImageContainer.style.display === "none" ||
            !fixedImageContainer.style.display
          ) {
            // Open Full-Screen Mode
            fixedImage.src = img.src;
            fixedImageContainer.style.display = "flex";

            // Keep cursor scaled up even if mouse moves away
            crusorElement.style.transform = "scale(4)";
            crusorElement.innerText = " close ";
            crusorElement.style.background = "rgb(0, 0, 0)";
            crusorElement.style.color = "#30a0e0";
            // Prevent cursor from scaling down when leaving the original image
            document.body.addEventListener("mousemove", keepCursorScaled);
          }
        });
      }
    });

    // Function to keep cursor at scale(4) when full-screen is active
    function keepCursorScaled() {
      if (fixedImageContainer.style.display === "flex") {
        crusorElement.style.transform = "scale(4)";
        crusorElement.innerText = " close ";
        crusorElement.style.background = "rgb(0, 0, 0)";
        crusorElement.style.color = "#30a0e0";
      }
    }

    // Close full-screen image when clicked
    fixedImageContainer.addEventListener("click", () => {
      fixedImageContainer.style.display = "none";
      crusorElement.style.transform = "scale(1)";
      crusorElement.innerText = "";
      crusorElement.style.backgroundColor = "#30a0e0";
      crusorElement.style.color = "black";
      // Remove event listener when full-screen is closed
      document.body.removeEventListener("mousemove", keepCursorScaled);
    });
    /////////////////////////////////////////////////////////////////////////////////////////////

    // Close the fixed image container if clicked
    fixedImageContainer.addEventListener("click", () => {
      fixedImageContainer.style.display = "none";
    });
  });
}

// Create custom cursor elements

let crusorElement;
let currentLoc = [];

document.addEventListener("mousemove", (e) => {
  currentLoc = [`${e.pageX - 5}px`, `${e.pageY - window.scrollY - 5}px`];
  crusorElement.style.left = currentLoc[0];
  crusorElement.style.top = currentLoc[1];
});

crusorElement = document.createElement("div");
crusorElement.setAttribute("id", "crusor");
crusorElement.style.position = "fixed";
crusorElement.style.zIndex = "20000";
crusorElement.style.pointerEvents = "none";
crusorElement.style.width = "10px";
crusorElement.style.height = "10px";
crusorElement.style.borderRadius = "50%";
crusorElement.style.border = "0px solid black";
crusorElement.style.backgroundColor = "#30a0e0";
crusorElement.style.boxShadow = "0 0 50px #30a0e0";
crusorElement.style.fontFamily = "Poppins";
crusorElement.style.fontSize = "3.5px";
crusorElement.style.lineHeight = "100px";
crusorElement.style.transition =
  "transform 0.5s ease, background-color 0.5s ease";
document.body.appendChild(crusorElement);

/////////////////////////////////////////////////////////////////

document.addEventListener("scroll", (e) => {
  let scroll = window.scrollY;
  const firstVideo = document.getElementById("first-video");
  firstVideo.style.opacity = remap(scroll, 0, 500, 1, 0);
});
function remap(value, sourceStart, sourceEnd, targetStart, targetEnd) {
  if (value <= sourceStart) return targetStart;
  if (value >= sourceEnd) return targetEnd;
  const t = (value - sourceStart) / (sourceEnd - sourceStart);
  return targetStart + t * (targetEnd - targetStart);
}

let allVideos = document.getElementsByTagName("video");
Array.from(allVideos).forEach((a) => {
  a.playbackRate = 1.5;
});
