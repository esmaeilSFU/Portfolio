function movingLinesPattern1(
  x = width / 20,
  y = height / 20,
  n = 0.1,
  radius = 1,
  color,
  opacity,
  mouse = false
) {
  x = width / x;
  y = height / y;
  let fColor = `rgba(${hexToRgb(color).r},${hexToRgb(color).g},${
    hexToRgb(color).b
  },${opacity})`; // explode the color to its conponents and then to be used for making RGBA color because the input color didn't have alpha value
  stroke(fColor);
  strokeWeight(1);
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      push();
      let length;
      if (mouse) {
        //Mouse Interaction
        let d = dist(mouseX, mouseY, i * (width / x), j * (height / y)); /// finding the distance of mouse to each line's starting point
        length = map(d, 0, 500, 0, 1); /// remaping the distance to be used for line Length
      } else {
        length = 1;
      }
      translate(i * (width / x), j * (height / y));
      rotate(sin((i + n) * 0.52) + cos((j + n) * 0.5));
      fill("black");
      ellipse(150 * Math.cos(n * 0.2), Math.cos(n * 0.2), radius * length);
      pop();
    }
  }
  // n += 0.2;
}

function movingLinesPattern2(
  x = width / 20,
  y = height / 20,
  counter = 0.1,
  n = 0.1,
  strokeW = 1,
  color,
  opacity,
  mouse = false
) {
  x = width / x;
  y = height / y;
  background(0);

  let fColor = `rgba(${hexToRgb(color).r},${hexToRgb(color).g},${
    hexToRgb(color).b
  },${parseFloat(opacity) + 0.2})`; // explode the color to its conponents and then to be used for making RGBA color because the input color didn't have alpha value
  stroke(fColor);
  strokeWeight(strokeW + 0.5);
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      push();
      let length;
      if (mouse) {
        //Mouse Interaction
        let d = dist(mouseX, mouseY, i * (width / x), j * (height / y)); /// finding the distance of mouse to each line's starting point
        length = map(d, 0, 500, 0, 100); /// remaping the distance to be used for line Length
      } else {
        length = 150;
      }
      console.log(n);
      translate(i * (width / x), j * (height / y));
      rotate(sin((i + counter) * n) + cos((j + counter) * n));
      line(0, 0, length, 0);
      pop();
    }
  }
}
function movingLinesPattern3(
  x = 20,
  y = 20,
  n = 0,
  strokeW = 1,
  color,
  opacity,
  mouse = false
) {
  x = width / x;
  y = height / y;
  background(0);
  let fColor = `rgba(${hexToRgb(color).r},${hexToRgb(color).g},${
    hexToRgb(color).b
  },${opacity})`; // explode the color to its conponents and then to be used for making RGBA color because the input color didn't have alpha value
  stroke(fColor);
  strokeWeight(strokeW);
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      push();
      let length;
      if (mouse) {
        //Mouse Interaction
        let d = dist(mouseX, mouseY, i * (width / x), j * (height / y)); /// finding the distance of mouse to each line's starting point
        length = map(d, 0, 500, -10, 200); /// remaping the distance to be used for line Length
      } else {
        length = 1000;
      }
      translate(i * (width / x), j * (height / y));
      rotate(cos(i * j + n * 0.01) * PI);

      line(0, 0, length, 0);
      pop();
    }
  }
}
