<p align="center">
    <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/swgpu.png" width="450px" alt="logo"/>
</p>

<p align="center">
    <a href="https://warme-engine.com/">Documentation</a> - <a href="https://jay19240.github.io/">Demos</a> - <a href="https://warme-engine.com/?Screenshots">Screenshots</a> - <a href="https://discord.gg/9PcFvg5f7P">Join our discord !</a>
</p>

![Langage](https://img.shields.io/badge/Langage-Typescript-f39f37)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Compatibility](https://img.shields.io/badge/Compatibility-All%20Platforms-lightgrey)

**SWGPU** is a simple **2D/3D game library** written in **TypeScript** and powered by the latest web APIs.
It offers an easy and complete way to create classic games in a non-opinionated but recommanded coding style.
From the start, we chose to embrace the future with pure **WebGPU** 3D rendering engine as the name suggests. Check what stack we've choices for this work:
| API       | Domain     | Description                                                                                                                |
|:---------:|:----------:|:---------------------------------------------------------------------------------------------------------------------------|
| WebGPU    | 3D         | A modern 3D graphics API designed to provide high-performance rendering and compute capabilities directly in web browsers. |
| Canvas2D  | 2D         | A 2D graphics API designed to provide shapes, text, and images drawing.                                                    |
| CSS3      | UI         | The best way to build powerful and hightly maintenable user-interface.                                                     |
| Web Audio | Sound      | An Audio API for playing sounds.                                                                                           |
| Rapier3D  | 3D Physics | The fastest 3D physics engine for the web.                                                                                 |
| Rapier2D  | 2D Physics | The fastest 2D physics engine for the web.                                                                                 |

## Table of content
* [Getting started](#getting-started)
* [Compatible tools](#compatible-tools)
* [Features](#features)
* [Examples](#examples)
* [Contributors](#contributors)
* [Some parts taken for this work](#some-parts-taken-for-this-work)
* [Changelog](#changelog)

## Getting started
Clone and install the starter-kit from this repository:      
```
# git clone https://github.com/jay19240/SWGPU-StarterKit.git
# cd SWGPU-StarterKit
# npm install
# npm run dev
```
Edit the ''src/game_screen'' and start writing your game.
Go to http://localhost:5173.

## Compatible tools
| Aseprite                                                                                              | Tilekit | Blender |
|:-----------------------------------------------------------------------------------------------------:|:-------:|:--------|
| ![](https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/tools-0.png "Aseprite") | ![](https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/tools-1.png "Tilekit") | ![](https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/tools-2.png "Blender") |

## Features
- 🧱 **Core**
    - Maths
    - Tweening
    - Events
    - Curves
    - Quaternions
    - Object pooling
    
- 👾 **2D**
    - Static sprite (jss)
    - Animated sprite (jas, aseprite)
    - Isometric animated tilemap (jtm, tilekit)
    - Orthographic animated tilemap (jtm)
    - Particles
    - Rendering filters
    - Motion lines (jlm)

- 📐 **2D Physics**
    - BoundingRect
    - Tilemap box collider
    - Rapier2D

- 🧊 **3D**
    - Binary format (bsm, bam, bwm, bnm, blm)
    - Debug shapes
    - Static mesh (jsm and obj)
    - Animated mesh (jam)
    - Static sprite (jss)
    - Animated sprite (jas, aseprite)
    - Motion lines (jlm)
    - Billboarding
    - Cubemap skybox
    - Particules
    - Flares
    - Fog
    - Vertex colorization
    - Decals
    - Shadow mapping
    - Shadow volume
    - Multi-viewport
    - Camera orbit
    - Camera WASD
    - Auto mipmap
    - Post rendering (gbuffers: depth/normal/ids)
    - Rendering filters
    - Customizable shaders
 
- 📐 **3D Physics**
    - BoundingBox
    - BoundingCylinder
    - Walkmesh (jwm)
    - Hitmesh (jnm)
    - Ray-testing
    - Rapier3D

- 💥 **3D Material**
    - Phong reflection model
    - Displacement texture map
    - Displacement texture scrolling
    - Diffuse map
    - Specular map
    - Emissive map
    - Normal map
    - Env map
    - Toon map
    - Texture scrolling
    - Animated UV
    - Specular shininess
    - Emissive intensity
    - Normal intensity
    - Facing blending

- 🌞 **3D Light**
    - Directional light
    - Point lights (max : 64)
    - Spot lights (max: 16)

- 🖼️ **3D Post-processing**
    - Outline
    - Hardware dithering
    - Pixelation
    - Color depth limiting

- 🎮 **Input**
    - Action mapping
    - Gamepad, keyboard and mouse support

- 🧠 **AI**
    - A* for 2D/3D with graph and grid
    - Djikstra graph (grf)
    - Min-max with alpha-beta pruning

- 📺 **Screen**
    - Navigate between different view of your game
    - Resources pre-loading

- 📜 **Scripts**
    - Load script from json file
    - Register async command function and call-it from json file
    - Manual jump to part of the script
    - Command primitives like: WAITPAD, GOTO, GOTO_IF, EXEC_IF, VAR_SET, VAR_ADD, VAR_SUB, DELAY

- 🔊 **Sound**
    - Handle sounds by groups
    - Play multiple sounds at same time

- 🌳 **Tree**
    - 2D binary space partition
    - 3D binary space partition

- 🎨 **UI**
    - Focus/unfocus widgets
    - Fade in/out
    - Widget architecture

- 🖍️ **UI Widgets**
    - Dialog + choices
    - Dialog only
    - Print long text
    - Description list
    - Virtual keyboard
    - Slider
    - Menu base
    - Menu list view
    - Menu text
    - Prompt
    - Sprite
    - Text

- 🌆 **DNA**
    - ECS architecture implementation

## Examples
This framework come with 16 common game templates and 9 utils templates.     
Each one is thinking to represent a common game style like platformer, fighting, fps or rpg.     
Template are written in typescript/javascript and build to be clean and extensible.

List of templates that you can test [here](https://jay19240.github.io/):
- 3D Pre-rendered
- 3D Isometric
- 2D Visual Novel
- 2D Tilemap
- 2D Tilemap (with pathfinding)
- 2D Checker (extendable)
- 2D Trading Carding Game
- 3D FPS
- 3D Turn-based RPG
- 2D Fight
- 2D Triple Triad
- 2D Tilemap Isometric
- 2D Background Isometric
- 2D Shoot'em up
- 3D Third Person Camera
- 2D Platformer

List of examples:
- 3D Curve
- 3D Particles
- 3D Performance Test
- 3D Rapier
- 3D Shadow Map
- UI Menu
- 3D Viewer
- 3D Menu Ring
- 3D Pack

## Contributors
1. Crisxzu - Contribute to the Wiki, typedoc converter and Triple Triad demo.
2. zuda - Contribute to Triple Triad demo.
3. luciedefraiteur - Contribute to the fog.
4. thetinyspark - Contribute to the binary space partition.
5. Impre-visible - Contribute to 2D tutorial.
6. Alina Morinokanata - Create the logo.

## Some parts taken for this work
- DOM for UI elements
- CanvasRenderingContext2D for 2D stuffs
- [Rapier](https://rapier.rs/) for both 2D and 3D physics engine
- No glTF support, we don't want to support the rendering techniques used by this format (BSDF, Skinning, etc...)

## Changelog
```
- [Ver. 1.6.0] Aseprite support added.
- [Ver. 1.6.0] Tilekit support added.
- [Ver. 1.5.0]  Pack archivage added.
- [Ver. 1.5.0]  New mesh shader hook added.
- [Ver. 1.5.0]  Engine manager added.
- [Ver. 1.5.0]  ECS Components check optimized with the use of Set.
- [Ver. 1.5.0]  ECS query is added.
- [Ver. 1.5.0]  ECS nice sugar methods is added.
- [Ver. 1.5.0]  Fix offset factor on all sprite classes.
- [Ver. 1.5.0]  Tile collision method added to Gfx2TileMap.
- [Ver. 1.5.0]  Platformer template added.
- [Ver. 1.2.0]  Binary format for 3D files added.
- [Ver. 1.1.14] Tilemap SpriteFusion format added.
- [Ver. 1.1.13] Cylinder collision class added.
- [Ver. 1.1.12] Fix and optimize jnm.
- [Ver. 1.1.10] Some added to fps demo.
- [Ver. 1.1.7]  Mipmap added.
- [Ver. 1.1.5]  Export as npm module added.
- [Ver. 1.1.1]  Outline post-process effect added.
- [Ver. 1.1.1]  Normals, id and depth rendering buffer added.
- [Ver. 1.1.1]  Object pooling added.
- [Ver. 1.1.0]  Move physics to dedicated folder and redesign JNM.
- [Ver. 1.1.0]  Rapier has been added.
- [Ver. 1.0.3]  Playstation one post-process effect has been added.
- [Ver. 1.0.3]  Post-processing effects has been added.
- [Ver. 1.0.3]  Camera WASD has been added.
- [Ver. 1.0.3]  Camera orbit has been added.
```

## License 
SWGPU is released under the [MIT](https://opensource.org/licenses/MIT) license. 
