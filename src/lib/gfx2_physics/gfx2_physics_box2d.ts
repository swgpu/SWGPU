import Box2DFactory from 'box2d-wasm/dist/es/Box2D.simd';

const Gfx2Box2D = await Box2DFactory({
  locateFile: (url, scriptDirectory) => '/wasms/box2d.wasm'
});

export { Gfx2Box2D };