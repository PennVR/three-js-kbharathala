// Defaults
var camera, scene, renderer, controls, effect;

// River Variable
var river;

// Fireworks variables
var fireworkGenerator;

init();
animate();

function init() {

  var WIDTH = window.innerWidth, 
      HEIGHT = window.innerHeight;

  // Set up Scene
  scene = new THREE.Scene();

  // Set up Camera
  camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 15000);
  camera.position.y = -5;

  // Set up Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( WIDTH, HEIGHT );
  document.body.appendChild( renderer.domElement );
  selecting = false;

  // Set up Controls and Effect
  controls = new THREE.VRControls(camera);

  // If you want control over the mouse uncomment these lines. 
  // controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.enableZoom = false;

  effect = new THREE.VREffect(renderer);

  if ( WEBVR.isAvailable() === false ) {
    document.body.appendChild( WEBVR.getMessage() );
  }

  if (navigator.getVRDisplays) {
    navigator.getVRDisplays()
        .then(function(displays) {
            effect.setVRDisplay( displays[ 0 ] );
            controls.setVRDisplay( displays[ 0 ] );
        })
        .catch(function() {
            // no displays
        });
    document.body.appendChild(WEBVR.getButton(effect));
  }

  // Set up Terrain
  var terrain = new Terrain(scene);

  // Set up River
  river = new River(scene);

  // Set up Fireworks
  fireworkGenerator = new Firework(scene);

  // Set up Sky
  var imagePrefix = "textures/hills/hills-";
  var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
  var imageSuffix = ".jpg";

  var materials = [];

  directions.forEach(function (p) {
    var texture = new THREE.TextureLoader().load(imagePrefix + p + imageSuffix);
    materials.push(new THREE.MeshBasicMaterial({ map: texture }));
  });

  var skyGeometry = new THREE.BoxGeometry(7500, 7500, 7500);
  var skyMaterial = new THREE.MeshFaceMaterial(materials)
  var mesh = new THREE.Mesh( skyGeometry, skyMaterial);

  mesh.scale.set(-1, 1, 1);
  scene.add(mesh);

}

function animate() {
  effect.requestAnimationFrame( animate );
  render();
}

function render() {
  fireworkGenerator.launchFirework();
  fireworkGenerator.moveFireworks();

  river.updateRiver();

  controls.update();
  effect.render( scene, camera );
}