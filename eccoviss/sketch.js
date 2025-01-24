////Defining Variables
let music1,
  music2,
  music3,
  music4,
  music5,
  music6,
  currentMusicLink = "music/1-Five4One_-_Music_(Extended_Mix)_-_Five4One.mp3",
  currentMusic,
  sliderVolume,
  sliderrate,
  btnPlayPause,
  btnStop,
  btnConvolver,
  bbtnConvolverStopper,
  btnReverb,
  amp,
  fft1,
  parameter1,
  cConvolver,
  sampleRate,
  patternType = 0,
  music = 0,
  p1 = 0,
  p2,
  volumeSldCurrent = 1,
  rateSldCurrent = 1,
  p1SldCurrent = 30,
  p2SldCurrent = 30,
  p3SldCurrent = 0.2,
  counter = 0;
let divWidth = document.getElementById("canvas").offsetWidth;
let divHeight = document.getElementById("canvas").clientHeight;

//////////////////////Pre-Loading Musics
function preload() {
  music1 = loadSound("music/1-Five4One_-_Music_(Extended_Mix)_-_Five4One.mp3");
  ///1-"Five4One - Music (Extended Mix)" by Five4One is licensed under CC BY 3.0.
  ///web site: https://openverse.org/audio/99ec9af2-3787-4935-83b9-79c86594e38f?q=music
  music2 = loadSound(
    "music/2-SAVAPROD-Musical_Brain(Original_Music)_-_SAVAPROD(Dubstep).mp3"
  );
  ///2-"SAVAPROD-Musical Brain(Original Music)" by SAVAPROD(Dubstep) is licensed under CC BY 3.0.
  ///web site: https://openverse.org/audio/b7caf850-fbc6-4347-8754-aca5b839991d?q=music
  music3 = loadSound("music/3-House_Music_-_Chriss_Izovitch.mp3");
  ///3-"House Music" by Chriss Izovitch is licensed under CC BY 3.0.
  ///web site: https://openverse.org/audio/f8daf41a-c059-486d-8d06-089357be8f9b?q=music
  currentMusic = music1;
}

function setup() {
  var canvas = createCanvas(divWidth, divHeight); //creating Canvas based on the Div size
  canvas.parent("canvas"); // Putting canvas on the parent Div
  background(0);

  ///music selection button
  document.getElementById("m1").onclick = function () {
    ///it plays music 1
    currentMusic.stop();
    currentMusic = music1;
    currentMusicLink = "music/01.wav";
    currentMusic.loop();
  };
  document.getElementById("m2").onclick = function () {
    ///it plays music 2
    currentMusic.stop();
    currentMusic = music2;
    currentMusicLink = "music/02.wav";
    currentMusic.loop();
  };
  document.getElementById("m3").onclick = function () {
    ///it plays music 3
    currentMusic.stop();
    currentMusic = music3;
    currentMusicLink = "music/03.wav";
    currentMusic.loop();
  };

  ////Visualization Panel buttons
  document.getElementById("v1").onclick = function () {
    ///it Actives Visualization 1
    patternType = 0;
  };
  document.getElementById("v2").onclick = function () {
    ///it Actives Visualization 2
    patternType = 1;
  };
  document.getElementById("v3").onclick = function () {
    ///it Actives Visualization 3
    patternType = 2;
  };
  document.getElementById("visualBtns").onclick = function () {
    background(0);
  };

  ////Gets buttons from HTML and do something it they are clicked
  document.getElementById("playPauseBtn").onclick = togglePlayPause;
  document.getElementById("stopBtn").onclick = toggleStop;
  document.getElementById("CnvlvrBtn").onclick = toggleVerb;
  document.getElementById("stopCnvlvrBtn").onclick = toggleStopper;

  //Taking sliders' value from Html to use for music change and Visualization
  let sliderVl = document.getElementById("volumeSlider"); /// Getting slider value of music valume
  sliderVl.addEventListener("input", (a) => {
    volumeSldCurrent = parseFloat(a.target.value);
  });
  let sliderRt = document.getElementById("rateSlider"); /// Getting slider value of speed rate
  sliderRt.addEventListener("input", (b) => {
    rateSldCurrent = parseFloat(b.target.value);
  });

  let sliderP1 = document.getElementById("p1"); /// Getting slider value of Parameter 1
  sliderP1.addEventListener("input", (a) => {
    p1SldCurrent = parseFloat(a.target.value);
  });
  let sliderP2 = document.getElementById("p2"); /// Getting slider value of Parameter 2
  sliderP2.addEventListener("input", (a) => {
    p2SldCurrent = parseFloat(a.target.value);
  });
  let sliderP3 = document.getElementById("p3"); /// Getting slider value of opacity
  sliderP3.addEventListener("input", (a) => {
    p3SldCurrent = parseFloat(a.target.value);
  });

  ///Analyzing musics to get their information like amplitude and fft
  amp = new p5.Amplitude();
  fft1 = new p5.FFT();
  sampleRate = getAudioContext().sampleRate;
}

function draw() {
  counter++;
  /// changeing the name of parameters in HTML based on changes in JS
  changeMusicString();
  changeVisualString();
  changeParamsString();
  ///
  let mouseBool = document.getElementById("mouse").checked; ///getiing check box value
  currentMusic.setVolume(volumeSldCurrent); // seting the music volume based on the slider value
  currentMusic.rate(rateSldCurrent); // setting the speed value based on the spped slider value
  //////////////////////Period: parameter /// I haven't used these music parameters but can be used for other purposes.
  fill("rgba(255,0,255,0.6)");
  let spectrum = fft1.analyze();
  let peakIndex = findPeakIndex(spectrum);
  let frequency = map(peakIndex, 0, spectrum.length, 0, sampleRate / 2);

  ///////////////////////////////// Running patterns if the related buttons are selected
  let color = document.getElementById("colorpicker").value;
  let opacity = document.getElementById("p3").value;
  let slider1 = document.getElementById("p1").value;
  let slider2 = document.getElementById("p2").value;
  if (currentMusic.isPlaying()) {
    if (patternType == 0) {
      ///if music is playing then show visualizations
      fill("yellow");
      p1 += map(amp.getLevel(), 0, volumeSldCurrent, 0, 1); // remaping parameters of music to be used by visualization technique
      p2 = map(peakIndex, 0, spectrum.length, 10, 1000); // remaping parameters of music to be used by visualization technique
      movingLinesPattern1(
        slider1,
        slider2,
        p1,
        p2,
        color,
        parseFloat(opacity) + 0.3,
        mouseBool
      );
    } else if (patternType == 1) {
      p1 = map(amp.getLevel(), 0, volumeSldCurrent, 0.1, 0.2); // remaping parameters of music to be used by visualization technique
      p2 = map(peakIndex, 0, spectrum.length, 0, 50); // remaping parameters of music to be used by visualization technique
      movingLinesPattern2(
        slider1,
        slider2,
        counter * 0.3,
        p1,
        p2,
        color,
        opacity,
        mouseBool
      );
    } else if (patternType == 2) {
      p1 += map(amp.getLevel(), 0, volumeSldCurrent, 0, 10); // remaping parameters of music to be used by visualization technique
      p2 = map(peakIndex, 0, spectrum.length, 0.2, 80); // remaping parameters of music to be used by visualization technique
      movingLinesPattern3(slider1, slider2, p1, p2, color, opacity, mouseBool);
    }
  }
}
