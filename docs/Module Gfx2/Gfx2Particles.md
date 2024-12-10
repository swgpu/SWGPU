# Gfx2Particles

The particles diffuser.
- inherit from: Gfx2Drawable
## Constructors
- **new Gfx2Particles**(options: Partial): Gfx2Particles   
   - **options**: Various options for configuring the behavior of the particles cloud.
## Methods
- **$createParticle**(): Particle   
Creates a particle with various properties such as position, velocity, size, opacity, acceleration, angle, and age.

- **draw**(): void   
The draw function.

- **getTexture**()   
Returns the particle texture.

- **setTexture**(texture): void   
Set the particle texture.
   - **texture**: The texture.

- **update**(ts: number): void   
The update function.
   - **ts**: The timestep.
