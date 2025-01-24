//function to find the peak points of a music wave
function findPeakIndex(spectrum) {
  let peakIndex = 0;
  for (let i = 1; i < spectrum.length; i++) {
    if (spectrum[i] > spectrum[peakIndex]) {
      peakIndex = i;
    }
  }
  return peakIndex;
}

//function to play or pause the music
function togglePlayPause() {
  if (!currentMusic.isPlaying()) {
    currentMusic.connect();
    currentMusic.loop();
  } else {
    currentMusic.pause();
  }
}
//function to stop the music
function toggleStop() {
  currentMusic.stop();
  cConvolver.disconnect();
  if (!currentMusic.isPlaying()) {
  }
}

//function to apply some effects on the music
function toggleVerb() {
  cConvolver = createConvolver("01.wav");
  currentMusic.play();
  currentMusic.disconnect();
  cConvolver.process(currentMusic, 1, 1, false);
}
//function to stop the effects of the music
function toggleStopper() {
  cConvolver.disconnect();
  currentMusic.stop();
}

//get a random integer between min and max
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Converting Hex color to RGB color
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

//some functions to change the HTML elements
function changeMusicString() {
  let musicNumber = currentMusic.file.split("/")[1].split("-")[0];
  let a = document.getElementById("musicSelectionTxt");
  a.textContent = "Music Selection : " + musicNumber;
}

function changeVisualString() {
  let a = document.getElementById("VisualizationTpesTxt");
  a.textContent = "Visualization type : " + (patternType + 1);
}
function changeParamsString() {
  let a = document.getElementById("p1Txt");
  a.textContent = "X distance : " + p1SldCurrent;
  a = document.getElementById("p2Txt");
  a.textContent = "Y distance : " + p2SldCurrent;
  a = document.getElementById("p3Txt");
  a.textContent = "Opacity : " + p3SldCurrent;
  a = document.getElementById("vlTxt");
  a.textContent = "Volume : " + volumeSldCurrent;
  a = document.getElementById("rtTxt");
  a.textContent = "Speed : " + rateSldCurrent;
}
