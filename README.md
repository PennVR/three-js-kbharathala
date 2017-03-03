# Summer Celebration
### Krishna Bharathala

Passive VR Experience to watch fireworks on a procedurally generated terrain.

## Github Pages
This project is hosted live at: pennvr.github.io/three-js-kbharathala

## Source Files

```
├── js
│   ├── Controls
|   |   ├── OrbitControls.js
|   │   └── VRControls.js
│   ├── Effects
|   │   └── VREffect.js
│   ├── ThreeJS
|   │   └── three.min.js
│   ├── VR
|   │   └── WebVR.js
│   ├── firework.js
│   ├── main.js
│   ├── noise.js
|   ├── river.js
│   └── terrain.js
├── textures
│   ├── grass
|   ├── hills
│   └── water
├── index.html
└── README.md
```

## How to Build/Run
Type “npm install http-server -g” in your terminal, then run "http-server" in the index.html directory.
You can also view this at pennvr.github.io/three-js-kbharathala

## How did I make this?

* I started with a base project here: https://github.com/PennVR/PennVR-Head-Gazer to create the shell of my program, this includes getting the source files for many of the three js libraries.
* I modified the floor from the project, by implementing a Perlin Noise function (js/noise.js) to deform the terrain on the y-axis. 
* I added a river by adding a new geometry on top of the floor and animating it according to the JavaScript Date Object.
* I added a skybox with images of hills.
* I added fireworks by create a sphere and animating it's movement into the sky. On explosion it creates more spheres around it which shoot outwards. Firework generation is random in all the following features: Launch time, Color, Explosion Time, Explosion Length

## Motion Sickness
Because there is little movement, I experienced no motion sickness. Because of the way I implemented fireworks, sometimes there is some lag, which may be uneasy.

## Hardest part of the assignment
I really struggled on set-up. Once I was able to get into the swing of things and coding, I felt that I was able to proceed quickly. However, just getting set-up with figuring out how to create a terrain, and how to create a sprite that did what I wanted it to do was difficult. What I found particularly frustrating was that I felt that I was copying code from other people (examples on webvr) instead of digging through the documentation myself to figure out what methods I have access to and can call. For example, trying to find a good example of PointMaterial was quite difficult. 

## What do I wish I had done differently
The biggest thing is my implementation of fireworks. I definitely made my life a lot harder by manually creating each of the particles, as opposed to using PointMaterial or PointCloud. I had tried to use these, but asn't met with much success. I also think my generation of particles slowed things down, which may have led to the jittering at times on my computer. (Have not experienced this on the SIG Lab computers).

## What do I wish you had done differently
After I had the Head Gazer Example, it was much easier to get started. So I thought that was incredibly helpful. I would have also liked a little bit of guidance on what was expected out of this project. I spent much of the first week working with getting the camera to move with me so that I could simulate the boat down the river motion. However, all of this ended up getting scrapped when I realized that 1. I was not nearly good enough yet to get this done, 2. The motion is handled by the Oculus and WebVR.
