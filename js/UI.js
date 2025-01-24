document.addEventListener("contextmenu", (event) => {
  // event.preventDefault(); // Uncomment if you want to prevent right-click context menu
});

//////////
const publicationIntroContent = document.getElementById(
  "publictionIntroContent"
);
publicationIntroContent.style.top = `${
  window.innerHeight / 2 - publicationIntroContent.offsetHeight / 2
}px`;
const worksIntro = document.getElementById("worksIntro");
worksIntro.style.top = `${
  window.innerHeight / 2 - worksIntro.offsetHeight / 2
}px`;

/////////

// Open links on click
let parakeetElement = document
  .getElementById("parakeet")
  .querySelector("button");
parakeetElement.addEventListener("click", (event) => {
  window.open("https://www.food4rhino.com/en/app/parakeet", "_blank");
});

let taranehElement = document.getElementById("taraneh").querySelector("button");
taranehElement.addEventListener("click", (event) => {
  window.open("TaraneSharghi/index.html", "_blank");
});

let eccovissElement = document
  .getElementById("eccoviss")
  .querySelector("button");
eccovissElement.addEventListener("click", (event) => {
  window.open("eccoviss/index.html", "_blank");
});

let dpredictElement = document
  .getElementById("D-Predict")
  .querySelector("button");
dpredictElement.addEventListener("click", (event) => {
  window.open("DPredict/index.html", "_blank");
});

let parakeetWebElement = document
  .getElementById("parakeetWA")
  .querySelector("button");
parakeetWebElement.addEventListener("click", (event) => {
  window.open("ParakeetWeb/index.html", "_blank");
});
let pardisanElement = document
  .getElementById("pardisan")
  .querySelector("button");
pardisanElement.addEventListener("click", (event) => {
  window.open("Pardisan/index.html", "_blank");
});
let kiaCamElement = document.getElementById("kiacam").querySelector("button");
kiaCamElement.addEventListener("click", (event) => {
  window.open("KiaCam/index.html", "_blank");
});

let imagePunchElement = document
  .getElementById("imagePunch")
  .querySelector("button");
imagePunchElement.addEventListener("click", (event) => {
  window.open("ImagePunch/index.html", "_blank");
});

// Create custom cursor elements

// Track mouse position

let crusorElement;
let currentLoc = [];

document.addEventListener("mousemove", (e) => {
  currentLoc = [`${e.pageX - 5}px`, `${e.pageY - window.scrollY - 5}px`];
  crusorElement.style.left = currentLoc[0];
  crusorElement.style.top = currentLoc[1];
});

//////////////////
///create navigartor
///////////////////////

const allCategories = document.getElementsByClassName("works");
const allCategoriesHeaders = document.getElementsByClassName("category");

let categoryOffsetYs = [];
for (let i = 0; i < allCategories.length; i++) {
  categoryOffsetYs.push(
    allCategories[i].getBoundingClientRect().top + window.scrollY
  );
}
const navigatorContainer = document.createElement("div");
navigatorContainer.id = "navigatorContainer";
allCategoriesDiv = document.getElementById("all-categories");
allCategoriesDiv.style.position = "relative";
allCategoriesDiv.appendChild(navigatorContainer);
navigatorContainer.style.position = "fixed";
navigatorContainer.style.top = "10%";
navigatorContainer.style.left = "0px";
navigatorContainer.style.height = "80%";
navigatorContainer.style.width = "100px";
navigatorContainer.style.zIndex = 500;
navigatorContainer.style.border = "3px solid gray";
navigatorContainer.style.borderWidth = "3px 3px 3px 0";
navigatorContainer.style.borderRadius = "0 20px 20px 0";
navigatorContainer.style.overflow = "hidden";
navigatorContainer.style.backgroundColor = "red";
navigatorContainer.style.display = "flex";
navigatorContainer.style.flexDirection = "column";
navigatorContainer.style.transform = "translate(-200px,0)";
navigatorContainer.style.transition = "transform 0.5s ease";
for (let i = 0; i < allCategories.length; i++) {
  const element = document.createElement("div");
  navigatorContainer.appendChild(element);
  const pTag = document.createElement("p");
  element.appendChild(pTag);
  pTag.innerText = allCategoriesHeaders[i].innerText;
  pTag.style.width = "80px";
  element.style.display = "flex";
  element.style.justifyContent = "center";
  element.style.alignItems = "center";
  element.style.fontSize = "0.7rem";
  element.style.boxSizing = "border-box";
  // element.style.textAlign = "center";
  element.style.textWrap = "break-word";
  let headerCMPStyle = window.getComputedStyle(allCategoriesHeaders[i]);
  element.style.color = headerCMPStyle.color;
  element.style.fontFamily = "Poppins";
  const computedStyle = window.getComputedStyle(allCategories[i].children[0]);
  const backgroundColor = computedStyle.borderBlockColor;
  element.style.backgroundColor = backgroundColor;
  element.style.flex = `${allCategories[i].children.length}`;
  element.addEventListener("click", () => {
    let categoryOffsetY =
      allCategories[i].getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: categoryOffsetY - 50,
      behavior: "smooth",
    });
  });
}

//////////////slider ////////////////////
const slider = document.createElement("div");
slider.id = "slider";
navigatorContainer.appendChild(slider);
slider.style.position = "fixed";
slider.style.height = "5px";
slider.style.width = "100px";
slider.style.zIndex = 500;
slider.style.backgroundColor = "rgba(6, 6, 6,0.8)";
// slider.style.border = "1px solid black";
////////////////////////////////////
// const icon = document.createElement("i");
// icon.id = "home";
// icon.className = "fa fa-caret-left";
// icon.setAttribute("aria-hidden", "true");
// icon.style.fontSize = "1.8rem";
// icon.style.transform = "translate( 100px, -13px)";
// icon.style.color = "rgb(150, 150, 150)";
// slider.appendChild(icon);
//////////////////////////////////
document.addEventListener("scroll", () => {
  let FirstCategoryTopPos =
    allCategories[0].getBoundingClientRect().top + window.scrollY;
  let LastCategoryBotPos =
    allCategories[allCategories.length - 1].getBoundingClientRect().top +
    window.scrollY +
    allCategories[allCategories.length - 1].getBoundingClientRect().height;
  slider.style.top = `${remap(
    window.scrollY,
    FirstCategoryTopPos,
    LastCategoryBotPos,
    0,
    navigatorContainer.getBoundingClientRect().height
  )}px`;

  if (window.scrollY < FirstCategoryTopPos - 500) {
    navigatorContainer.style.transform = "translate(-200px,0)";
  } else if (
    window.scrollY > FirstCategoryTopPos - 500 &&
    window.scrollY < LastCategoryBotPos - 200
  ) {
    window.innerWidth > 1000
      ? (navigatorContainer.style.transform = "translate(0,0)")
      : (navigatorContainer.style.transform =
          "translate(calc(-100% + 10px),0)");
  } else if (window.scrollY > LastCategoryBotPos - 200) {
    navigatorContainer.style.transform = "translate(-200px,0)";
  }
});

function remap(value, sourceStart, sourceEnd, targetStart, targetEnd) {
  if (value <= sourceStart) return targetStart;
  if (value >= sourceEnd) return targetEnd;
  const t = (value - sourceStart) / (sourceEnd - sourceStart);
  return targetStart + t * (targetEnd - targetStart);
}
//

//////Services//////////////////////////////////////////////////////
const footerElement = document.getElementById("footer");
const getInTouch = document.getElementById("get-in-touch");
let ServiceContainer = document.getElementById("services-container");
ServiceContainer.style.width = `${
  document.getElementsByClassName("contact-me")[0].offsetWidth - 60
}px`;
ServiceContainer.style.height = `${
  window.innerHeight - footerElement.offsetHeight - getInTouch.offsetHeight - 60
}px`;
let currentLocation = [];
let winElement;
Array.from(ServiceContainer.getElementsByTagName("li")).forEach((a) => {
  winElement; // Declare tooltip variable for each <li>
  a.addEventListener("mouseenter", (e) => {
    // Prevent creating a new tooltip if one already exists
    if (winElement) return;

    // a.style.transform = "translate(500px,0px)";
    // Create tooltip element
    winElement = document.createElement("div");
    winElement.appendChild(a.cloneNode(true));
    winElement.setAttribute("id", "tooltip");
    winElement.style.fontFamily = "Poppins";
    winElement.style.listStyle = "none";
    winElement.style.position = "fixed";
    winElement.style.zIndex = "100";
    winElement.style.right = `${a.getBoundingClientRect().left + 10}px`;
    winElement.style.top = `${a.getBoundingClientRect().top}px`;
    winElement.style.width = `${getInTouch.offsetWidth / 2}px`;
    winElement.style.pointerEvents = "auto";
    winElement.style.opacity = 1;
    winElement.style.background = "rgba(80, 80, 80, 1)";
    winElement?.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 500,
      easing: "ease-in-out",
      fill: "forwards",
    });
    winElement.style.padding = "0px";
    winElement.style.border = "0.1px solid #ffffff52";

    winElement.style.boxShadow = "0 4px 20px rgb(49, 49, 49)";
    winElement.children[0].style.fontWeight = 100;
    winElement.style.borderRadius = "0 0 20px 20px";

    winElement.style.padding = "20px";
    winElement.children[0].children[0].style.cssText =
      "font-weight: 300; padding:0; margin:0; font-size:20px";
    winElement.children[0].children[1].style.cssText =
      "font-weight: 200; padding:0; color:rgb(180,180,180)";

    winElement.children[0].children[2].style.cssText =
      "border-radius:20px; color:white; text-decoration: none; font-size:0.8rem;";
    document.body.appendChild(winElement);
    a.style.cssText = " background: rgb(80,80,80); !important;";
    // a.children[0].style.color = "white";
    // Add mouseleave event to the tooltip itself
    winElement.addEventListener("mouseleave", () => {
      if (winElement) {
        winElement.remove();
        a.style.cssText =
          "  background-color: transparent; color: white; !important;";
        a.children[0].style.cssText =
          "  background-color: transparent; color: white; !important;";

        winElement = null; // Reset tooltip reference
      }
    });
  });

  a.addEventListener("mouseleave", (e) => {
    // Check if the mouse is moving into the tooltip
    if (winElement && e.relatedTarget && winElement.contains(e.relatedTarget)) {
      return; // Do nothing if moving into the tooltip
    }

    // Otherwise, remove the tooltip
    if (winElement) {
      winElement.remove();
      a.style.cssText = " background: transparent; color: white; !important;";
      a.children[0].style.cssText =
        "  background-color: transparent; color: white; !important;";
      winElement = null; // Reset tooltip reference
    }
  });
});

///create cursor////////////////////////////////////////
crusorElement = document.createElement("div");
crusorElement.setAttribute("id", "crusor");
crusorElement.style.position = "fixed";
crusorElement.style.zIndex = "1000";
crusorElement.style.boxSizing = "border-box";
crusorElement.style.pointerEvents = "none";
crusorElement.style.width = "10px";
crusorElement.style.height = "10px";
crusorElement.style.borderRadius = "50%";
crusorElement.style.border = "0.5px solid white";
crusorElement.style.backgroundColor = "rgba(195, 195, 195, 0.85)";
crusorElement.style.boxShadow = "0 0 2px #ffe3b3";
crusorElement.style.fontFamily = "Poppins";
crusorElement.style.transition =
  "transform 0.3s ease, backgroundColor 0.3s ease";
document.body.appendChild(crusorElement);

// Add mouseenter and mouseleave listeners only once
let aElements = document.getElementsByTagName("a");
let buttonElements = document.getElementsByTagName("button");
let allInteractiveElements = [
  ...aElements,
  ...buttonElements,
  ...navigatorContainer.children,
];

allInteractiveElements.forEach((a, i) => {
  a.addEventListener("mouseenter", () => {
    crusorElement.style.transform = "scale(2.5)";
  });
  a.addEventListener("mouseleave", () => {
    crusorElement.style.transform = "scale(1)";
  });
  const img = a.querySelector("img");
});

///////////////////////Scroll up button ////////////
const upwardArrowIcon = document.createElement("i");
upwardArrowIcon.id = "upArrow";
upwardArrowIcon.className = "fa fa-chevron-circle-up";
upwardArrowIcon.setAttribute("aria-hidden", "true");
upwardArrowIcon.style.fontSize = "1.8rem";
upwardArrowIcon.style.opacity = 0.25;
upwardArrowIcon.style.position = "fixed";
upwardArrowIcon.style.top = `${window.innerHeight - 40}px`;
upwardArrowIcon.style.left = `${window.innerWidth / 2}px`;
upwardArrowIcon.style.zIndex = "500";
document.body.appendChild(upwardArrowIcon);
upwardArrowIcon.addEventListener("mouseenter", () => {
  upwardArrowIcon.style.opacity = 0.6;
});
upwardArrowIcon.addEventListener("mouseleave", () => {
  upwardArrowIcon.style.opacity = 0.25;
});
upwardArrowIcon.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// let count = 50;
// let elementArray = [];
// for (let i = 0; i < count; i++) {
//   elementArray[i] = document.createElement("div");
//   elementArray[i].setAttribute("id", "crusor");
//   elementArray[i].style.width = "20px";
//   elementArray[i].style.height = "20px";
//   elementArray[i].style.position = "fixed";
//   elementArray[i].style.zIndex = "2000";
//   elementArray[i].style.backgroundColor = "yellow";
//   elementArray[i].style.borderRadius = "50%";
//   elementArray[i].style.boxShadow = "0 0 30px yellow";
//   document.body.appendChild(elementArray[i]);
// }

// Add event listeners for scaling the cursor on hover

// function updateCursor(allInteractiveElements) {
//   allInteractiveElements.forEach((element) => {
//     element.addEventListener("mouseenter", () => {
//       elementArray[0].style.scale = 5; // Scale the first cursor element
//     });
//     element.addEventListener("mouseleave", () => {
//       elementArray[0].style.scale = 1; // Reset the scale
//     });
//   });
// }
// if (window.scrollY < 1100) {
//   //defuser();
// } else if (window.scrollY >= 1100) {
//   //singleCursor()
// }
// // Update cursor positions and styles
// let defuser = function () {
//   crusorTrace.unshift(currentLoc);
//   if (crusorTrace.length > count) {
//     crusorTrace.pop();
//   }

//   crusorTrace.forEach((a, i) => {
//     let amp = ((count - i) / count) * 1;
//     elementArray[i].style.transform = `scale(${amp})`;
//     elementArray[i].style.opacity = 0.4;
//     elementArray[i].style.left = a[0];
//     elementArray[i].style.top = a[1];
//     // elementArray[i].style.display = "block";
//     elementArray[i].style.opacity = 0.4;
//     // elementArray[i].style.scale = 1;
//     // i <= 5
//     //   ? (elementArray[i].style.boxShadow = "0 0 50px white")
//     //   : (elementArray[i].style.boxShadow = "0 0 0px red");
//   });
// };

// Update cursor positions at a regular interval
// setInterval(defuser, 20);
// updateCursor(allInteractiveElements);
