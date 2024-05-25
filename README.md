<p align="center">
    <img src="https://raw.githubusercontent.com/jay19240/jay19240.github.io/main/others/imgs/brand.png" width="300px alt="logo"/>
</p>

<p align="center">
    <a href="https://warme-engine.com/">Documentation</a> - <a href="https://demo.warme-engine.com/">Demos</a> - <a href="https://warme-engine.com/?Screenshots">Screenshots</a> - <a href="https://discord.gg/9PcFvg5f7P">Join our discord !</a>
</p>

> [!TIP]
> High luminosity is recommanded with scanlines filter (set enabled as default).

![Langage](https://img.shields.io/badge/Langage-Typescript-f39f37)
![NPM Version](https://img.shields.io/npm/v/warme-y2k)
![LibSize](https://img.shields.io/badge/LibSize-73KB-blue)
![Size](https://img.shields.io/badge/DepSize-1MB-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Compatibility](https://img.shields.io/badge/Compatibility-All%20Platforms-lightgrey)

**WarmeY2K** is a fully packed **2D/3D game engine** dedicated to **Y2K games** on the web !     
The first part of the name (W.A.R.M.E) is an acronym for **Web Against Regular Major Engines**, you can understand it like a tentative
to make a complete game engine for the web. The second part (Y.2.K) is the common acronym used to define the era covers **1998-2004** and define the technics limitation intentionally taken. These limitations are guarants of a human scaled tool and help a lot of to reduce the learning curve.

Some words about our philosophy:
- **Robustness:** We used only simple and efficient methods coming from the industrie for nearly two decades.     
- **Flexibility:** Create your own renderers. Handle render and update loops in a state-less way.    
- **Modularity:** We used modular architecture to keep things simple and separate.     
- **Performance:** We used WebGPU API for a blazing fast rendering.
- **Lightweight:** The lib minzipped size is just 73 kB (1Mb with Rapier2D & Rapier3D).

You can check the documentation [here](http://warme-engine.com/).          
For a more concret overview on it, you can play examples [here](http://demo.warme-engine.com/) and check the demo source code [here](https://github.com/jay19240/WARME/tree/main/src/samples).    

## Table of content

* [Features](#features)
* [Getting Started - The engine way](#getting-started---the-engine-way)
* [Getting Started - The boilerplate way](#getting-started---the-boilerplate-way)
* [Table of file formats](#table-of-file-formats)
* [Table of mesh ids](#table-of-mesh-ids)
* [Shader extension](#shader-extension)
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
    - Post-process rendering (gbuffers: depth/normal/ids)
    - Rendering filters
 
- 📐 **3D Physics**
    - BoundingBox
    - BoundingCylinder
    - Walkmesh (jwm)
    - Navigation mesh (jnm)
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

## Getting started - The engine way
A good start if you want make experimentation with samples and tutorials.
```
# git clone https://github.com/jay19240/WarmeY2K.git
# cd WarmeY2K
# npm install
# npm run dev
```

## Getting started - The boilerplate way
The perfect solution for serious project.     
It's included a complete environment including vite, typescript and the engine as dependency.
```
# git clone https://github.com/jay19240/WarmeY2K-Boilerplate.git
# cd WarmeY2K-Boilerplate
# npm install
# npm run dev
```

## Table of file formats
We've done a [Blender Exporter](https://github.com/jay19240/WarmeY2K/tree/main/bin#:~:text=WARME%2DBlender%2DExporter.zip) which is used to export your models as JSON-like or Binary format.

| Type            | JSON | Binary |
| --------------- | ---- | ------ |
| Animated mesh   | JAM  | BAM    |
| Static mesh     | JSM  | BSM    |
| Lines           | JLM  | BLM    |
| Point light     | JPL  |        |
| Trigger         | JTR  |        |
| Shadow volume   | JSV  | BSV    |
| Walkmesh        | JWM  | BWM    |
| Navmesh         | JNM  | BNM    |
| Animated sprite | JAS  |        |
| Static sprite   | JSS  |        |
| Tilemap         | JTM  |        |
| Script          | JSC  |        |

## Table of mesh ids
If you want enable *Color limit*, *Dithering* and *Shadow vol* you can sum all these values and set `2 + 4 + 16 = 22` to the channel `a`.
| Usage        | r  | g  | b  | a  |
| ------------ | -- | -- | -- | -- |
| Identifier   | n  |    |    |    |
| Decals group |    | n  |    |    |
| Light group  |    |    | n  |    |
| Pixelation   |    |    |    | 1  |
| Color limit  |    |    |    | 2  |
| Dithering    |    |    |    | 4  |
| Outline      |    |    |    | 8  |
| Shadow vol   |    |    |    | 16 |

## Shader extension
Set your shader extension in your .env with the following variables :
| Name          | Description                                 |
| ------------- | ------------------------------------------- |
| MESH_VERT_EXT | Append a string to the mesh vertex shader   |
| MESH_FRAG_EXT | Append a string to the mesh fragment shader |

You can check variables you can work with just below.      
If you need add some extra variables, take a look at material custom params.
| Vert Variables | Scope   | Type           | Description                                   |
| -------------  | ------- | -------------- | --------------------------------------------- |
| LVP_MATRIX     | Uniform | mat4x4         | Light view projection (shadow-map)            |
| MESH_INFOS     | Uniform | MeshInfos      | Contains matrices and mesh identifier         |
| MAT_PARAMS     | Uniform | MaterialParams | List of float material parameters             |
| MAT_PARAMS     | Uniform | MaterialParams | List of float material parameters             |
| MAT_PARAMS     | Uniform | MaterialParams | List of float material parameters             |
| out            | var     | VertexOutput   | The vertex shader output                      |
| posFromLight   | var     | vec4           | Vertex position from light source (shadow-map |

| Frag Variables           | Scope   | Type           | Description                                   |
| ------------------------ | ------- | -------------- | --------------------------------------------- |
| MESH_INFOS               | Uniform | MeshInfos      | Contains matrices and mesh identifier         |
| CAMERA_POS               | Uniform | vec3           | Camera position                               |
| DIR_LIGHT                | Uniform | DirLight       | Directionnal light informations               |
| FOG                      | Uniform | Fog            | Fog informations                              |
| POINT_LIGHT_COUNT        | Uniform | int            | Number of point lights                        |
| POINT_LIGHTS             | Uniform | PointLight[]   | Point light list                              |
| DECAL_COUNT              | Uniform | int            | Number of decals                              |
| DECALS                   | Uniform | Decal[]        | Decal list                                    |
| DECAL_ATLAS_TEXTURE      | Uniform | Texture        | Decals texture                                |
| DECAL_ATLAS_TEXTURE      | Uniform | Texture        | Decals texture                                |
| SHADOW_MAP_TEXTURE       | Uniform | Texture        | Shadow map texture                            |
| MAT_COLORS               | Uniform | MaterialColors | Material colors (ambiant, diffuse, etc...)    |
| MAT_PARAMS               | Uniform | MaterialParams | Material parameters for some settings         |
| MAT_UVS                  | Uniform | MaterialUvs    | Material uv scrolling                         |
| MAT_TOON_LIGHT_DIR       | Uniform | vec3           | Material toon light direction                 |
| MAT_TEXTURE              | Uniform | Texture        | Color texture                                 |
| MAT_DISPLACEMENT_TEXTURE | Uniform | Texture        | Displacement texture - displace color texture |
| MAT_DIFFUSE_TEXTURE      | Uniform | Texture        | Diffuse color texture                         |
| MAT_DIFFUSE_TEXTURE      | Uniform | Texture        | Diffuse color texture                         |
| MAT_SPECULAR_TEXTURE     | Uniform | Texture        | Specular texture (color and specularity)      |
| MAT_EMISSIVE_TEXTURE     | Uniform | Texture        | Emissive color texture                        |
| MAT_NORM_TEXTURE         | Uniform | Texture        | Normal map texture                            |
| MAT_ENV_MAP_TEXTURE      | Uniform | Texture        | Env map texture                               |
| MAT_TOON_TEXTURE         | Uniform | Texture        | Toon details texture                          |
| MAT_TOON_TEXTURE         | Uniform | Texture        | Toon details texture                          |
| outputColor              | var     | vec4           | The fragment shader output color              |
| normal                   | var     | vec3           | The normalized normal                         |
| texel                    | var     | vec4           | The current texture pixel - after decals      |
| textureUV                | var     | vec2           | The current texture uv - after scrolling      |
| shadow                   | var     | float          | The shadow factor                             |

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

## Roadmap
```
[INFO]
1. This roadmap can changed.
2. Ordered by priority
3. Task done one by one

[CORE TASKS]
1. Add sun flares (as external demo, for wipeout-like project)
3. Add spot-light

[DEADLINES]
a. CORE_TASKS.1.2: 01 Juin
```

## License 
WARME Y2K is released under the [MIT](https://opensource.org/licenses/MIT) license. 
