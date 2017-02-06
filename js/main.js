
// Defaults
var camera, scene, renderer, controls;
var geometry, material, mesh;
var raycaster;

// Objects
var floor, cubes = [], fireworks = [];

// Fireworks variables
var height = 0;
var NUMBER_OF_FIREWORKS = 5;
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

  // Set up Scene
  scene = new THREE.Scene();

  // Set up Camera
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.y = -5;
  
  // Set up Light
  var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
  light.position.set( 0.5, 1, 0.75 );
  scene.add( light );
  
  // Set up Controls
  controls = new THREE.PointerLockControls( camera );
  scene.add( controls.getObject() );

  // Set up Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xffffff );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  selecting = false;

  // Set up terrain
  var terrain = new Terrain();
  scene.add (terrain.floor);

  // Set up fireworks
  fireworkGenerator = new Firework();
  fireworkGenerator.generateFireworks();
    
}

function animate() {
  requestAnimationFrame( animate );

  fireworkGenerator.moveFirework();

  renderer.render( scene, camera );
}