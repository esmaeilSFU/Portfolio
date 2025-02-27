import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { vertexShader, fragmentShader } from "./starShader.js";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function updateVectorCloser(v2, v1, step, threshold = 0.001) {
  const distance = v1.distanceTo(v2);
  if (distance < threshold) {
    return v1.clone();
  }
  const scaledStep = Math.min(step, distance * 0.1);
  const direction = v1.clone().sub(v2).normalize();
  v2.add(direction.multiplyScalar(scaledStep));
  return v2;
}

function remap(value, sourceStart, sourceEnd, targetStart, targetEnd) {
  if (value <= sourceStart) return targetStart;
  if (value >= sourceEnd) return targetEnd;
  const t = (value - sourceStart) / (sourceEnd - sourceStart);
  return targetStart + t * (targetEnd - targetStart);
}

class sceneObj {
  constructor(containerID, cameraPosition, targetPosition) {
    this.cameraPosition = cameraPosition;
    this.targetPosition = targetPosition;
    this.container = document.getElementById(containerID);
    this.scene = new THREE.Scene();
    this.controls = null;
    this.fov = 40;
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.worldPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 9),
      new THREE.MeshBasicMaterial({
        wireframe: true,
      })
    ).rotateX(Math.PI * -0.5);
    this.scene.add(this.worldPlane);
    this.worldPlane.visible = false;

    this.setupRenderer();
    this.setupControls();
    this.onWindowResize();
    this.setupCamera();
    this.addMouseListener();
  }

  setupCamera() {
    this.camera.position.set(
      this.cameraPosition[0],
      this.cameraPosition[1],
      this.cameraPosition[2]
    );
    this.camera.lookAt(
      new THREE.Vector3(
        this.targetPosition[0],
        this.targetPosition[1],
        this.targetPosition[2]
      )
    );
    this.camera.up = new THREE.Vector3(-0.9, -0.2, -0.5);
  }

  setupRenderer() {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.position = "absolute";
    this.renderer.domElement.style.left = "0";
    this.renderer.domElement.style.zIndex = "1";
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(
      this.targetPosition[0],
      this.targetPosition[1],
      this.targetPosition[2]
    );
    this.controls.enableDamping = false;
    this.controls.dampingFactor = 0;
    this.controls.maxDistance = 1000;
  }

  addMouseListener() {
    window.addEventListener("mousemove", (e) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects([this.worldPlane]);
      if (intersects[0]) {
        this.pointer.intersectionPoint = intersects[0].point;
      } else {
        this.pointer.intersectionPoint = null;
      }
    });
  }

  onWindoeScroll(fovValue = 40) {
    this.camera.fov = fovValue;
    this.camera.updateProjectionMatrix(); // Ensure changes take effect
  }

  onWindowResize() {
    window.addEventListener("resize", () => {
      this.camera.aspect =
        this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
    });
  }
}
let attractor = new THREE.Vector3(0, 0, 0);
class galaxyParticles {
  constructor(
    scene,
    particleCount = 1000,
    color = "#FFFF99",
    minRadius = 0.5,
    maxRadius = 1,
    minParticleSize = 0.1,
    maxParticleSize = 0.3,
    timeFrame = 0.3,
    angle = 0,
    height = 0.2
  ) {
    this.scene = scene;
    this.particleCount = particleCount;
    this.color = color;
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    this.timeFrame = timeFrame;
    this.angle = angle;
    this.height = height;
    this.minParticleSize = minParticleSize;
    this.maxParticleSize = maxParticleSize;

    this.particleGeo = new THREE.PlaneGeometry(1, 1);
    this.geo = new THREE.InstancedBufferGeometry();
    this.pos = new Float32Array(this.particleCount * 3);
    this.particleMat = new THREE.ShaderMaterial({
      uniforms: {
        uMouse: { value: new THREE.Vector3(0, 0, 0) },
        uHeight: { value: this.height },
        effectDis: { value: 0.75 },
        minSize: { value: this.minParticleSize },
        maxSize: { value: this.maxParticleSize },
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
        uColor: { value: new THREE.Color(this.color) },
        uTexture: {
          value: new THREE.TextureLoader().load("../assets/particle0.png"),
        },
        opacity: { value: 1 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      depthTest: false,
      transparent: true,
    });
  }

  createGalaxy() {
    this.geo.setAttribute(
      "position",
      this.particleGeo.getAttribute("position")
    );
    this.geo.instanceCount = this.particleCount;
    this.geo.index = this.particleGeo.index;

    for (let i = 0; i < this.particleCount; i++) {
      let angle = Math.random() * Math.PI * 2;
      let x =
        Math.sin(angle) * getRandomArbitrary(this.minRadius, this.maxRadius);
      let y = 0.2 * (Math.random() - 0.5);
      let z =
        Math.cos(angle) * getRandomArbitrary(this.minRadius, this.maxRadius);

      this.pos.set([x, y, z], i * 3);
    }

    this.geo.setAttribute(
      "pos",
      new THREE.InstancedBufferAttribute(this.pos, 3, false)
    );

    let points = new THREE.Mesh(this.geo, this.particleMat);
    this.scene.add(points);
  }

  updateTime(pointer) {
    this.particleMat.uniforms.time.value += this.timeFrame;
    ///////////////return attractor to origin
    if (!pointer.intersectionPoint) {
      attractor.copy(
        updateVectorCloser(attractor, new THREE.Vector3(0, 0, 0), 0.02, 0.001)
      );
    } else {
      attractor.copy(pointer.intersectionPoint);
    }
    this.particleMat.uniforms.uMouse.value = attractor;
  }
}

let scene1 = new sceneObj("intro", [7.5, 6.5, 6.8], [0, -1.5, -0.1]);

let particle1 = new galaxyParticles(
  scene1.scene,
  10000,
  "rgb(243, 234, 211)",
  0.2,
  3.9,
  0.05,
  0.28,
  0.02,
  -0.4,
  1.1
);
particle1.createGalaxy();

window.addEventListener("scroll", (e) => {
  let scroll = window.scrollY;
  const holderElement = document.getElementById("holder");
  let worksIntro = document.getElementById("worksIntro");
  const introElement = document.getElementById("intro-list");
  if (scroll < holderElement.offsetHeight) {
    let fovValue = remap(scroll, 0, 1000, 40, 5);
    scene1.onWindoeScroll(fovValue);
    introElement.style.opacity = remap(scroll, 0, 800, 1, 0);
    worksIntro.style.opacity = remap(
      scroll,
      window.innerHeight / 2 + worksIntro.offsetHeight / 2,
      holderElement.offsetHeight -
        window.innerHeight / 2 -
        worksIntro.offsetHeight,
      0,
      1
    );
    worksIntro.style.scale = remap(
      scroll,
      window.innerHeight / 2 + worksIntro.offsetHeight / 2,
      holderElement.offsetHeight -
        window.innerHeight / 2 -
        worksIntro.offsetHeight,
      0.2,
      1
    );
    worksIntro.style.background = `rgb(0, 0, 0, ${remap(
      scroll,
      window.innerHeight + 50,
      window.innerHeight + 200,
      0,
      1
    )})`;

    const alpha = remap(scroll, 0, 800, 1, 0); //
    particle1.particleMat.uniforms.opacity.value = alpha;
  }
  const publicationIntro = document.getElementById("publictionIntro");
  const rect = publicationIntro.getBoundingClientRect();
  let distanceFromTop = rect.top;
  publicationIntro.style.opacity = remap(
    -distanceFromTop,
    window.innerHeight * -0.5 - rect.height * 0,
    100,
    0,
    1
  );
  publicationIntro.style.scale = remap(
    -distanceFromTop,
    window.innerHeight * -0.5 - rect.height * 0,
    100,
    0.5,
    1
  );
});

///////////////////ending animation////////////
let scene2 = new sceneObj("ending-animation", [9, 0, 5], [0, 0, 0]);

let particle2 = new galaxyParticles(
  scene2.scene,
  10000,
  "rgb(128, 165, 205)",
  0.1,
  10,
  0.01,
  0.3,
  0.003,
  0,
  2
);
particle2.createGalaxy();

function animate() {
  particle1.updateTime(scene1.pointer);
  scene1.controls.update();
  scene1.renderer.render(scene1.scene, scene1.camera);

  ////////////////////////
  particle2.updateTime(scene2.pointer);
  scene2.controls.update();
  scene2.renderer.render(scene2.scene, scene2.camera);

  requestAnimationFrame(animate);
}
animate();
