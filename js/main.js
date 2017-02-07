// Defaults
var camera, scene, renderer, controls, effect;

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
  camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 1, 2000 );
  camera.position.y = -5;

  // Set up Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0x87cefa );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( WIDTH, HEIGHT );
  document.body.appendChild( renderer.domElement );
  selecting = false;

  // Set up Controls and Effect
  controls = new THREE.VRControls( camera );
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

  // Set up Sun 
  var sunTexture = new THREE.TextureLoader().load('./textures/sun.png');
  var sunMaterial = new THREE.SpriteMaterial( {map: sunTexture, color: 0xffffff } );
  var sun = new THREE.Sprite(sunMaterial);
  [sun.position.x, sun.position.y, sun.position.z] = [5, 8, -5];
  scene.add (sun);

  // Set up fireworks
  fireworkGenerator = new Firework(scene);
}

function animate() {
  effect.requestAnimationFrame( animate );
  render();
}

function render() {
  fireworkGenerator.launchFirework();
  fireworkGenerator.moveFireworks();
  controls.update();
  effect.render( scene, camera );
}