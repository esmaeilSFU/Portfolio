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
startAutoScroll();
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

// Functionsss/////////////////////////////////////////////////////////////////////////////////
// Function to start auto-scrolling
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    const maxScrollLeft = cardsElement.scrollWidth - cardsElement.clientWidth;
    Btns.forEach((btn) => {
      if (btn.classList.contains("disabled")) return;
    });

    if (cardsElement.scrollLeft >= maxScrollLeft) {
      cardsElement.scrollLeft = 0; // Reset to the first card
    } else {
      cardsElement.scrollLeft += scrollAmount;
      //disable buttons
      Btns.forEach((btn) => {
        if (btn.classList.contains("disabled")) return;
        Btns.forEach((b) => b.classList.add("disabled"));
        setTimeout(() => {
          Btns.forEach((b) => b.classList.remove("disabled"));
        }, 1000);
      });
      //disable buttons
    }
  }, 8000);
}

// Function to stop auto-scrolling
function stopAutoScroll() {
  clearInterval(autoScrollInterval);
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
function maximizeImage() {
  document.addEventListener("DOMContentLoaded", () => {
    const cardsElement = document.querySelector(".cards");
    const cardsChildren = cardsElement ? cardsElement.children : [];

    const fixedImageContainer = document.createElement("div");
    fixedImageContainer.style.position = "fixed";
    fixedImageContainer.style.display = "flex"; // Use flex for centering
    fixedImageContainer.style.justifyContent = "center";
    fixedImageContainer.style.alignItems = "center";
    fixedImageContainer.style.top = "0";
    fixedImageContainer.style.left = "0";
    fixedImageContainer.style.width = "100vw";
    fixedImageContainer.style.height = "100vh";
    fixedImageContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    fixedImageContainer.style.zIndex = "9999";
    fixedImageContainer.style.cursor = "pointer";
    fixedImageContainer.style.display = "none";
    fixedImageContainer.style.objectFit = "contain";

    // Create an image element inside the fixed container
    const fixedImage = document.createElement("img");
    // fixedImage.style.width = `${window.innerWidth}px`; // Maintain aspect ratio
    fixedImage.style.height = `${window.innerHeight}px`; // Maintain aspect ratio
    // fixedImage.style.maxWidth = "100%"; // Limit to viewport width
    fixedImage.style.maxHeight = "100%"; // Limit to viewport height
    fixedImage.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.5)";
    fixedImageContainer.appendChild(fixedImage);

    // Append the container to the body
    document.body.appendChild(fixedImageContainer);

    Array.from(cardsChildren).forEach((a, i) => {
      const img = a.querySelector("img");
      if (img) {
        img.addEventListener("click", () => {
          if (fixedImageContainer.style.display === "none") {
            fixedImage.src = img.src;
            fixedImageContainer.style.display = "flex";
            stopAutoScroll(); // Stop auto-scrolling
          } else {
            fixedImageContainer.style.display = "none";
            startAutoScroll(); // Restart auto-scrolling
          }
        });
      }
    });

    // Close the fixed image container if clicked
    fixedImageContainer.addEventListener("click", () => {
      fixedImageContainer.style.display = "none";
      startAutoScroll(); // Restart auto-scrolling
    });
  });
}
