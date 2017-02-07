// Defaults
var camera, scene, renderer, controls;

// Fireworks variables
var fireworkGenerator;

// Extras
var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );

// http://www.html5rocks.com/en/tutorials/pointerlock/intro/
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
if ( havePointerLock ) {
  var element = document.body;
  var pointerlockchange = function ( event ) {
    if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
      controls.enabled = true;
      blocker.style.display = 'none';
    } else {
      controls.enabled = false;
      blocker.style.display = '-webkit-box';
      blocker.style.display = '-moz-box';
      blocker.style.display = 'box';
      instructions.style.display = '';
    }
  };
  var pointerlockerror = function ( event ) {
    instructions.style.display = '';
  };
  // Hook pointer lock state change events
  document.addEventListener( 'pointerlockchange', pointerlockchange, false );
  document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
  document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
  document.addEventListener( 'pointerlockerror', pointerlockerror, false );
  document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
  document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
  instructions.style.display = 'none';
  
  // Ask the browser to lock the pointer
  element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
  element.requestPointerLock();
  instructions.addEventListener( 'click', function ( event ) {
    instructions.style.display = 'none';
    // Ask the browser to lock the pointer
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
    element.requestPointerLock();
  }, false );
} else {
  instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
}

init();
animate();

function init() {

  var WIDTH = window.innerWidth, 
      HEIGHT = window.innerHeight;

  // Set up Scene
  scene = new THREE.Scene();

  // Set up Camera
  camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 1, 1000 );
  camera.position.y = -5;
  
  // Set up Controls
  controls = new THREE.PointerLockControls( camera );
  scene.add( controls.getObject() );

  // Set up Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0x87cefa );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( WIDTH, HEIGHT );
  document.body.appendChild( renderer.domElement );
  selecting = false;

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
  requestAnimationFrame( animate );
  fireworkGenerator.launchFirework();
  fireworkGenerator.moveFireworks();
  renderer.render( scene, camera );
}