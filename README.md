<p align="center">
    <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/banner-brand.png" alt="logo"/>
</p>

![Langage](https://img.shields.io/badge/Langage-Typescript-f39f37)
![NPM Version](https://img.shields.io/npm/v/warme-y2k)
![Size](https://badgen.net/bundlephobia/minzip/warme-y2k)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Compatibility](https://img.shields.io/badge/Compatibility-All%20Platforms-lightgrey)

[![](https://dcbadge.vercel.app/api/server/eT4wWAN4)](https://discord.gg/eT4wWAN4)

> [!NOTE]  
> Don't forget to check the wiki tutorials section, we coming soon with two tutorials for beginners !
 
**WARME Y2K** is a fully packed **2D/3D game engine** dedicated to **Y2K games** on the web !     
The first part of the name (W.A.R.M.E) is an acronym for **Web Against Regular Major Engines**, you can understand it like a tentative
to make a complete game engine for the web. The second part (Y.2.K) is the common acronym used to define the era covers **1998-2004** and define the technics limitation intentionally taken. These limitations are guarants of a human scaled tool and help a lot of to reduce the learning curve.

Some words about our philosophy:
- **Robustness:** We used only simple and efficient methods coming from the industrie for nearly two decades.     
- **Flexibility:** Create your own renderers. Handle render and update loops.    
- **Modularity:** We used modular architecture to keep things simple and separate.     
- **Modernity:** We used WebGPU API for a blazing fast rendering.
- **Lightweight:** The lib minzipped size is just 2.5KB.

You can check the documentation [here](http://warme-engine.com/).          
For a more concret overview on it, you can play examples [here](https://jay19240.github.io/) and check the demo source code [here](https://github.com/jay19240/WARME/tree/main/src/samples).    

## Table of content

* [Features](#features)
* [Tutorials](#tutorials)
* [Demos](#demos)
* [Getting Started](#getting-started)
* [How to integrate your 3D models ?](#how-to-integrate-your-3d-models)
* [Contributions](#contributions)
* [Contributors](#contributors)
* [Some parts taken for this work](#some-parts-taken-for-this-work)

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
    - Animated sprite (jas)
    - Isometric tilemap
    - Orthographic tilemap
    - Particles
    - Rendering filters

- 📐 **2D Physics**
    - Rapier2D

- 🧊 **3D**
    - Debug shapes
    - Static mesh (jsm and obj)
    - Animated mesh (jam)
    - Static sprite (jss)
    - Animated sprite (jas)
    - Billboarding
    - Cubemap skybox
    - Particules
    - Flares
    - Fog
    - Vertex colorization
    - Decals
    - Realtime shadow support
    - Multi-viewport
    - Camera orbit
    - Camera WASD
    - Post-processing support
    - Rendering filters

- 📐 **3D Physics**
    - Walkmesh (jwm)
    - Navigation mesh (jnm)
    - Ray-testing
    - Rapier3D

- 💥 **3D Material**
    - Complete Phong reflection model
    - Displacement texture map
    - Displacement texture scrolling
    - Diffuse map
    - Specular map
    - Emissive map
    - Normal map
    - Env map
    - Texture scrolling
    - Animated UV
    - Specular shininess
    - Emissive intensity
    - Normal intensity

- 🌞 **3D Light**
    - Directional light
    - Point lights (max : 64)

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

## Tutorials
<table>
  <tr>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/tutorial1.png" width="150px"/>
    </td>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/tutorial2.png" width="150px"/>
    </td>
  </tr>
  <tr>
    <td>
        <p>Tutorial 2D</p>
    </td>
    <td>
        <p>Tutorial 3D</p>
    </td>
  </tr>
</table>

## Demos
<table>
  <tr>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb1.png" width="150px"/>
    </td>
    <td align="center">
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb2.png" width="150px"/>
    </td>
   <td align="center">
       <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb3.png" width="150px"/>
   </td>
  </tr>
  <tr>
    <td> 
        <p>3D Viewer Multi-lights</p>
    </td>
    <td>
        <p>UI Menu</p>
    </td>
   <td>
       <p>3D Pre-rendered Scene</p>
   </td>
  </tr>
  <tr>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb4.png" width="150px"/>
    </td>
    <td align="center">
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb5.png" width="150px"/>
    </td>
   <td align="center">
       <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb6.png" width="150px"/>
   </td>
  </tr>
  <tr>
    <td> 
        <p>3D Isometric Scene</p>
    </td>
    <td>
        <p>Visual Novel</p>
    </td>
   <td>
       <p>2D Ortho Tiles</p>
   </td>
  </tr>
  <tr>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb7.png" width="150px"/>
    </td>
    <td align="center">
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb8.png" width="150px"/>
    </td>
   <td align="center">
       <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb9.png" width="150px"/>
   </td>
  </tr>
  <tr>
    <td>
        <p>Boarding Game</p>
    </td>
    <td>
        <p>Collectible Card Game</p>
    </td>
   <td>
       <p>3D FPS</p>
   </td>
  </tr>
  <tr>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb10.png" width="150px"/>
    </td>
    <td align="center">
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb11.png" width="150px"/>
    </td>
   <td align="center">
       <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb12.png" width="150px"/>
   </td>
  </tr>
  <tr>
    <td> 
        <p>3D RPG Battle</p>
    </td>
    <td>
        <p>3D Performance (10.000 Cubes)</p>
    </td>
   <td>
       <p>2D Fighting Game</p>
   </td>
  </tr>
  <tr>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb13.png" width="150px"/>
    </td>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb14.png" width="150px"/>
    </td>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb15.png" width="150px"/>
    </td>
  </tr>
  <tr>
    <td>
        <p>3D Particles</p>
    </td>
    <td>
        <p>3D Curve</p>
    </td>
    <td>
        <p>Triple Triad</p>
    </td>
  </tr>
  <tr>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb16.png" width="150px"/>
    </td>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb17.png" width="150px"/>
    </td>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/thumb18.png" width="150px"/>
    </td>
  </tr>
  <tr>
    <td>
        <p>2D Isometric Tiles</p>
    </td>
    <td>
        <p>3D Shadow Map</p>
    </td>
    <td>
        <p>2D Isometric Background</p>
    </td>
  </tr>
</table>

## Getting started 
A good start is to download [blank boilerplate](https://github.com/jay19240/WARME-Y2K-Boilerplate), it's a complete environment including vite, typescript and warme. Clone it and have fun !      
A second way is to start with the engine repository itself, in this case you can perfectly add a sample and work on it.     

Run with the following commands
```
# npm install
# npm run dev
```

## How to integrate your 3D models
The best way is to used the [Blender Exporter](https://github.com/jay19240/WARME-Engine/bin/WARME-Blender-Exporter.zip), otherwise you can used any software that export file in wavefront obj format like Blender, Crocotile, Elit3D or whatever.    

Important note: The Blender coordinate system and the engine don't match, see below the rule to translate.
Don't forget to apply these changes when you export your obj file.
```
blender => engine
----------------
x = -x
y = +z
z = +y
engine axis
----------------
forward = -z
up = +y
right = +x
```

## Contributions
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!    

1. Fork the Project
2. Create your Feature Branch (git checkout -b new_feature)
3. Commit your Changes (git commit -m 'Add new feature')
4. Push to the Branch (git push origin new_feature)
5. Open a Pull Request

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
- Human readable custom format for all graphics stuff
- [Rapier](https://rapier.rs/) for both 2D and 3D physics engine
- No glTF support, we don't want to support the rendering techniques used by this format (BSDF, Skinning, etc...)


## Roadmap (internal usage, only fr)
[INFO]
1. Cette roadmap peut changer (réduction ou ajout)
2. Elle est classé par ordre de priorité
3. Ont fait qu'une seule tache à la fois

[CORE TASKS]
1. Ecriture d'un tutorial sur la demo "pre-rendered" pour le mag "programmez" - (J4Y & Dazu)
2. Evolution du mip-mapping - (J4Y suit https://webgpufundamentals.org/webgpu/lessons/webgpu-textures.html)
3. R&D sur la possibilité de passer les formats propriétaire en binaire - (J4Y)
4. Ajout des spot-lights - (J4Y)

[DEMO TASKS]
1. Ajout la possibilité de sauter à la demo fps - (Imprévisible)
2. Ajout d'une arme + tir à la demo fps
3. Ajout d'enemis basiques
4. Améliorer le système de collisions - (J4Y)

[DEADLINES]
1. CORE_TASKS.1.2: 01 Juin
2. DEMO_TASKS.1.2.3.4: 01 Juin

## License 
WARME Y2K is released under the [MIT](https://opensource.org/licenses/MIT) license. 
