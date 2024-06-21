<p align="center">
    <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/banner-brand-mini.png" alt="logo"/>
</p>

<p align="center">
    <a href="https://warme-engine.com/">Documentation</a> - <a href="https://demo.warme-engine.com/">Demos</a> - <a href="https://warme-engine.com/?Screenshots">Screenshots</a> - <a href="https://discord.gg/9PcFvg5f7P">Join our discord !</a>
</p>

> [!NOTE]
> This project is finally stable, only minor changes in the futur.

![Langage](https://img.shields.io/badge/Langage-Typescript-f39f37)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Compatibility](https://img.shields.io/badge/Compatibility-All%20Platforms-lightgrey)

**WarmeY2K** is a fully free **2D/3D** game engine dedicated to **indie games** !      
It provide an easy way to build web based "old-school" games like the **PS1/PS2/XBOX** era in a modern **Typescript & HTML5, CSS3** environement. The core engine is freely available as a [npm package](https://www.npmjs.com/package/warme-y2k) or starter-kit. You can also have full access to the [documentation](http://warme-engine.com/).

Some words about our philosophy:
- **Robustness:** We used only simple and efficient methods coming from the industrie for nearly two decades.     
- **Flexibility:** Create your own renderers. Handle render and update loops in a state-less way.    
- **Modularity:** We used modular architecture to keep things simple and separate.     
- **Performance:** We used WebGPU API for a blazing fast rendering.
- **Lightweight:** The lib minzipped size is just 73 kB (1Mb with Rapier2D & Rapier3D).

For a more concret overview on it, you can play [examples](http://demo.warme-engine.com/).

## Table of content

* [Features](#features)
* [Contributions](#contributions)
* [Contributors](#contributors)
* [Some parts taken for this work](#some-parts-taken-for-this-work)
* [Changelog](#changelog)
* [Roadmap](#roadmap)

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
    - Isometric tilemap (jtm)
    - Orthographic tilemap (jtm)
    - Particles
    - Rendering filters
    - Motion lines (jlm)

- 📐 **2D Physics**
    - BoundingRect
    - Rapier2D

- 🧊 **3D**
    - Binary format (bsm, bam, bwm, bnm, blm)
    - Debug shapes
    - Static mesh (jsm and obj)
    - Animated mesh (jam)
    - Static sprite (jss)
    - Animated sprite (jas)
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
    - Shader customizable
 
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
- [Rapier](https://rapier.rs/) for both 2D and 3D physics engine
- No glTF support, we don't want to support the rendering techniques used by this format (BSDF, Skinning, etc...)
- Compatible Blender for 3D with our addon
- Compatible SpriteFusion for 2D

## Changelog
```
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
WARME Y2K is released under the [MIT](https://opensource.org/licenses/MIT) license. 
