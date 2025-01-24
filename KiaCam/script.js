maximizeImage();

function maximizeImage() {
  document.addEventListener("DOMContentLoaded", () => {
    // const cardsElement = document.querySelectorAll(".img");
    const cardsChildren = document.querySelectorAll(".img");

    console.log(cardsChildren);
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
    fixedImageContainer.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
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

    Array.from(cardsChildren).forEach((a, i) => {
      a.addEventListener("mouseenter", () => {
        crusorElement.style.transform = "scale(4)";
        crusorElement.innerText = "view";
        crusorElement.style.color = "black";
        crusorElement.style.display = "flex";
        crusorElement.style.justifyContent = "center";
        crusorElement.style.alignItems = "center";
        crusorElement.style.border = "0px solid black";
        crusorElement.style.fontFamily = "Poppins";
        crusorElement.style.fontWeight = "300";
      });
      a.addEventListener("mouseleave", () => {
        crusorElement.style.transform = "scale(1)";
        crusorElement.style.border = "none";
        crusorElement.innerText = "";
        crusorElement.style.border = "0px solid black"; // Add a border
      });
      const img = a.querySelector("img");
      if (img) {
        img.addEventListener("click", () => {
          if (fixedImageContainer.style.display === "none") {
            fixedImage.src = img.src;
            fixedImageContainer.style.display = "flex";
          } else {
            fixedImageContainer.style.display = "none";
          }
        });
      }
    });

    // Close the fixed image container if clicked
    fixedImageContainer.addEventListener("click", () => {
      fixedImageContainer.style.display = "none";
    });
  });
}

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
  a.playbackRate = 3;
});

// Create custom cursor elements

let crusorElement;
let currentLoc = [];

document.addEventListener("mousemove", (e) => {
  currentLoc = [`${e.pageX - 7.5}px`, `${e.pageY - window.scrollY - 7.5}px`];
  crusorElement.style.left = currentLoc[0];
  crusorElement.style.top = currentLoc[1];
});

crusorElement = document.createElement("div");
crusorElement.setAttribute("id", "crusor");
crusorElement.style.position = "fixed";
crusorElement.style.zIndex = "200";
crusorElement.style.pointerEvents = "none";
crusorElement.style.width = "15px";
crusorElement.style.height = "15px";
crusorElement.style.borderRadius = "50%";
crusorElement.style.border = "0px solid black";
crusorElement.style.backgroundColor = "rgba(72, 255, 240, 0.95)";
crusorElement.style.boxShadow = "0 0 50px rgb(72, 255, 240)";
crusorElement.style.fontFamily = "Poppins";
crusorElement.style.fontSize = "5.5px";
crusorElement.style.transition =
  "transform 0.5s ease, background-color 0.5s ease";
document.body.appendChild(crusorElement);
