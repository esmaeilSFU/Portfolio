let cardsElement,
  containerElement,
  cardsChildren,
  firstElementWidth,
  Btns,
  scrollAmount,
  btnContainerElement,
  buttons,
  leftArrow,
  rightArrow,
  autoScrollInterval; // Variable to store the interval ID
init();
maximizeImage();
// startAutoScroll();
Array.from(btnContainerElement.children).forEach((a, i) => {
  a.addEventListener("click", () => {
    cardsElement.scrollLeft = scrollAmount * i;
  });
});
// / Start auto-scrolling after initialization

/////////////

cardsElement.addEventListener("scroll", (e) => {
  transformation(cardsChildren);
  checkScrollPosition();
  updateBtnColor();
});

transformation(cardsChildren);
Btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("disabled")) return;
    Btns.forEach((b) => b.classList.add("disabled"));
    ////
    cardsElement.scrollLeft += btn.id === "left" ? -scrollAmount : scrollAmount;
    //// checkScrollPosition();
    setTimeout(() => {
      Btns.forEach((b) => b.classList.remove("disabled"));
    }, 1000);

    if (cardsElement.scrollLeft >= maxScrollLeft - scrollAmount) {
      setTimeout(() => {
        cardsElement.scrollLeft = 0; // Reset to the first card
      }, 200);
    }
  });
});
window.addEventListener("resize", (e) => {
  update();
});

//////function////////
function init() {
  cardsElement = document.querySelector(".cards");
  containerElement = document.getElementById("container");
  cardsChildren = document.getElementsByClassName("card");
  Btns = document.querySelectorAll("#container i");
  leftArrow = document.getElementById("left");
  rightArrow = document.getElementById("right");
  leftArrow.style.display = "none";
  firstElementWidth = cardsChildren[0].getBoundingClientRect().width;
  scrollAmount = firstElementWidth + 0;
  cardsElement.scrollLeft = 0;
  updatePadding(cardsChildren[0], cardsElement);

  let offset =
    window.innerWidth > 450 ? `${cardsChildren[0].offsetLeft - 25}px` : "0";
  leftArrow.style.left = offset;
  rightArrow.style.right = offset;

  addBtnElements();
  updateBtnColor();
}

function update() {
  updatePadding(cardsChildren[0], cardsElement);
  leftArrow.style.display = "none";
  scrollAmount = firstElementWidth + 0;
  cardsElement.scrollLeft = 0;
  updateBtnElements();
  updateBtnColor();
  updateArrowPositions();
  scrollAmount = firstElementWidth + 0;
}
function updateArrowPositions() {
  const leftArrow = document.getElementById("left");
  const rightArrow = document.getElementById("right");
  const offset = window.innerWidth > 450 ? cardsChildren[0].offsetLeft - 25 : 0;

  leftArrow.style.left = `${offset}px`;
  rightArrow.style.right = `${offset}px`;
}
function updateBtnColor() {
  Array.from(btnContainerElement.children).forEach((a, i) => {
    if (Math.abs(cardsElement.scrollLeft - scrollAmount * i) < 5) {
      a.style.border = "5px double rgb(255,255,255,1)";
      a.style.height = "14px";
      a.style.width = "14px";
      cardsChildren[i].style.zIndex = 2;
    } else {
      a.style.border = "2px solid rgb(255,255,255,0.4)";
      a.style.height = "9px";
      a.style.width = "9px";
      cardsChildren[i].style.zIndex = 1;
    }
  });
}
////////////////////////////
function addBtnElements() {
  btnContainerElement = document.createElement("ul");
  btnContainerElement.style.width = `${
    cardsElement.children.length * (10 + 10)
  }px`;
  btnContainerElement.style.height = "10px";
  btnContainerElement.style.top = `${window.innerHeight - 50}px`;
  btnContainerElement.style.left = `${
    window.innerWidth / 2 - (cardsElement.children.length * (10 + 10)) / 2
  }px`;
  btnContainerElement.style.position = "fixed";
  btnContainerElement.style.background = "transparent";
  btnContainerElement.style.display = "flex";
  btnContainerElement.style.justifyContent = "space-between";
  btnContainerElement.style.height = "20px";
  btnContainerElement.style.alignItems = "center";
  btnContainerElement.style.padding = "0";
  btnContainerElement.style.margin = "0";
  document.getElementById("container").appendChild(btnContainerElement);
  Array.from(cardsElement.children).forEach((el, i) => {
    const li = document.createElement("li");
    li.style.cssText = `
        list-style: none;
        height: 10px;
        width: 10px;
        border: 2px solid white;
        border-radius: 50%;
        background: transparent;
        cursor: pointer;
      `;
    btnContainerElement.appendChild(li);
  });
}
function updateBtnElements() {
  btnContainerElement.style.width = `${
    cardsElement.children.length * (10 + 10)
  }px`;
  btnContainerElement.style.height = "10px";
  btnContainerElement.style.top = `${
    cardsElement.children[0].offsetTop +
    cardsElement.children[0].offsetHeight +
    10
  }px`;
  btnContainerElement.style.left = `${
    window.innerWidth / 2 - (cardsElement.children.length * (10 + 10)) / 2
  }px`;
}
/////////////////////
function updatePadding(firstCard, scrollingElement) {
  const centerX = window.innerWidth / 2;
  const rect = firstCard.getBoundingClientRect().width / 2;
  scrollingElement.style.padding = `0 ${centerX - rect}px`;
}
function remap(value, sourceStart, sourceEnd, targetStart, targetEnd) {
  if (value <= sourceStart) return targetStart;
  if (value >= sourceEnd) return targetEnd;
  const t = (value - sourceStart) / (sourceEnd - sourceStart);
  return targetStart + t * (targetEnd - targetStart);
}
function transformation(cardsChildren) {
  const centerX = window.innerWidth / 2;
  const scrollOffset = cardsElement.scrollLeft;

  Array.from(cardsChildren).forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    const itemCenterX = rect.left + scrollOffset + rect.width / 2;
    const distanceX = itemCenterX - (centerX + scrollOffset);
    const elementScrollAmount = scrollAmount * i;

    const scale = remap(
      Math.abs(elementScrollAmount - scrollOffset),
      0,
      200,
      1.2,
      0.5
    );
    const rotate = remap(
      elementScrollAmount - scrollOffset,
      -300,
      300,
      100,
      -100
    );

    el.style.transform = `scale(${scale}) rotateY(${rotate}deg)`;
  });
}
// Function to check scroll position and hide/show buttons
function checkScrollPosition() {
  const maxScrollLeft = cardsElement.scrollWidth - cardsElement.clientWidth;
  document.getElementById("left").style.display =
    cardsElement.scrollLeft <= 10 ? "none" : "block";
  document.getElementById("right").style.display =
    cardsElement.scrollLeft >= maxScrollLeft - 10 ? "none" : "block";
}
////////////////////////////////////////////////

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
    fixedImageContainer.style.backgroundColor = "rgba(161, 128, 74, 0.5)";
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
            crusorElement.style.color = "#ffc872";
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
        crusorElement.style.color = "#ffc872";
      }
    }

    // Close full-screen image when clicked
    fixedImageContainer.addEventListener("click", () => {
      fixedImageContainer.style.display = "none";
      crusorElement.style.transform = "scale(1)";
      crusorElement.innerText = "";
      crusorElement.style.backgroundColor = "#ffc872";
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
crusorElement.style.backgroundColor = "#ffc872";
crusorElement.style.boxShadow = "0 0 50px #ffc872";
crusorElement.style.fontFamily = "Poppins";
crusorElement.style.fontSize = "3.5px";
crusorElement.style.lineHeight = "100px";
crusorElement.style.transition =
  "transform 0.5s ease, background-color 0.5s ease";
document.body.appendChild(crusorElement);
