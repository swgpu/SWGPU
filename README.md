# WARME Engine (Web Against Regular Majors Engines)
<p align="center">
    <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/banner.png" alt="logo"/>
</p>

![Drag Racing](https://img.shields.io/badge/lang-typescript-f39f37) ![Drag Racing](https://img.shields.io/badge/version-1.0.3-blue)

> [!NOTE]  
> Don't forget to check the wiki tutorials section, we coming soon with two tutorials for beginners !
 
**WARME Engine** is the first fully packed **2D/3D** game engine dedicated to **Y2K games** on the web !     
Some words about our philosophy:
- **Simplicity:** We used only simple and efficient methods coming from the industrie for nearly two decades.     
- **Flexibility:** Create your own renderers. Handle render and update loops.    
- **Modularity:** We used modular architecture to keep things simple and separate.     
- **Modernity:** We used the WebGPU rendering API.

You can check the documentation [here](http://warme-engine.com/).          
For a more concret overview on it, you can play examples [here](https://jay19240.github.io/) and check the demo source code [here](https://github.com/jay19240/WARME/tree/main/src/samples).    

## General features
- 🧱 **Core**
    - Maths
    - Tweening
    - Events
    - Curves
    - Quaternions
    
- 👾 **2D**
    - Static sprite
    - Animated sprite
    - Isometric tilemap
    - Orthographic tilemap
    - Particles system
    - Rendering filters

- 🧊 **3D**
    - Debug shapes
    - Static mesh (jsm, obj wavefront)
    - Animated mesh (jam)
    - Static sprite
    - Animated sprite
    - Billboarding
    - Cubemap skybox
    - Multi-viewport
    - Camera orbit
    - Camera WASD
    - Particules
    - Flares
    - Fog
    - Vertex colorization
    - Decals
    - Shadow map
    - Mesh pooling
    - Rendering filters
    - Post-processing effects
    - PSX effects

- 📐 **3D Physics**
    - Walkmesh
    - Navigation mesh
    - Ray-testing

- 💥 **3D Material**
    - Phong reflection model
    - Displacement texture mapping
    - Displacement texture scrolling
    - Normal mapping
    - Env mapping
    - Specularity mapping
    - Texture scrolling
    - Animated UV

- 🌞 **3D Light**
    - Directional light
    - Point lights (max : 16)

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
    - Load script from json file.
    - Register async command function and call-it from script file
    - Manual jump to part of script

- 🔊 **Sound**
    - Handle sounds by groups
    - Play multiple sounds at same time

- 🌳 **Tree**
    - 2D binary space partition
    - 3D binary space partition

- 🎨 **UI**
    - Component architecture to keep project clean and scalable
    - Handle focus/unfocus between components
    - Fade in/out
    - Some basics built-in components

- 🌆 **DNA**
    - ECS architecture implementation (optionnal)
    - State handler

## Demos
<table>
  <tr>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb1.png" width="150px"/>
    </td>
    <td align="center">
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb2.png" width="150px"/>
    </td>
   <td align="center">
       <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb3.png" width="150px"/>
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
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb4.png" width="150px"/>
    </td>
    <td align="center">
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb5.png" width="150px"/>
    </td>
   <td align="center">
       <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb6.png" width="150px"/>
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
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb7.png" width="150px"/>
    </td>
    <td align="center">
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb8.png" width="150px"/>
    </td>
   <td align="center">
       <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb9.png" width="150px"/>
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
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb10.png" width="150px"/>
    </td>
    <td align="center">
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb11.png" width="150px"/>
    </td>
   <td align="center">
       <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb12.png" width="150px"/>
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
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb13.png" width="150px"/>
    </td>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb14.png" width="150px"/>
    </td>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb15.png" width="150px"/>
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
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb16.png" width="150px"/>
    </td>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb17.png" width="150px"/>
    </td>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb18.png" width="150px"/>
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
        <p>Rendering filters</p>
    </td>
  </tr>
  <tr>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb19.png" width="150px"/>
    </td>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb-coming-soon.png" width="150px"/>
    </td>
    <td align="center"> 
        <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/imgs/thumb-coming-soon.png" width="150px"/>
    </td>
  </tr>
  <tr>
    <td>
        <p>2D Isometric Background</p>
    </td>
    <td>
        <p>Tutorial 2D</p>
    </td>
    <td>
        <p>Tutorial 3D</p>
    </td>
  </tr>
</table>

## Getting started
You need to install [nodejs](https://nodejs.org/en/download/). 
Once installation is done, you can clone the repository or use npx
to build our first WARME project.     

```
// create your awesome game project
# npx create-warme your_project_name

// now, you can start with
# npm run dev
```

## How to integrate your 3D models ?
You can used any software that export file in wavefront obj format like Blender, Crocotile, Elit3D or whatever.
You can also simply used the [WARME Blender Exporter](https://github.com/jay19240/WARME-Blender-Exporter).
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
1. Crisxzu - Contribute to the Wiki and typedoc converter.
2. zuda - Contribute to Triple Triad demo.
3. luciedefraiteur - Contribute to the fog.
4. thetinyspark - Contribute to the binary space partition.

## Some parts taken for this work
- Use DOM for UI elements
- Use CanvasRenderingContext2D for 2D stuffs
- Use human readable custom format for all graphics stuff
- No glTF support, we don't want to support the rendering techniques used by this format (BSDF, Skinning, etc...)
- No realistic physics engine, we assume if you need one there is many pretty lib for that like ammo.js, plank.js or canon.js

## License 
WARME engine is released under the [MIT](https://opensource.org/licenses/MIT) license. 
