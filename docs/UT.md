[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [core/utils](../modules/core_utils.md) / UT

# Class: UT

[core/utils](../modules/core_utils.md).UT

## Table of contents

### Methods

- [CATMULL\_ROM\_GRADIENT\_VEC2](core_utils$UT.md#catmull_rom_gradient_vec2)
- [CATMULL\_ROM\_GRADIENT\_VEC3](core_utils$UT.md#catmull_rom_gradient_vec3)
- [CATMULL\_ROM\_VEC2](core_utils$UT.md#catmull_rom_vec2)
- [CATMULL\_ROM\_VEC3](core_utils$UT.md#catmull_rom_vec3)
- [CLAMP](core_utils$UT.md#clamp)
- [COLLIDE\_BOX\_TO\_BOX](core_utils$UT.md#collide_box_to_box)
- [COLLIDE\_CIRCLE](core_utils$UT.md#collide_circle)
- [COLLIDE\_CYLINDER](core_utils$UT.md#collide_cylinder)
- [COLLIDE\_LINE\_TO\_LINE](core_utils$UT.md#collide_line_to_line)
- [COLLIDE\_POINT\_TO\_BOX](core_utils$UT.md#collide_point_to_box)
- [COLLIDE\_POINT\_TO\_RECT](core_utils$UT.md#collide_point_to_rect)
- [COLLIDE\_RECT\_TO\_RECT](core_utils$UT.md#collide_rect_to_rect)
- [DEG\_TO\_RAD](core_utils$UT.md#deg_to_rad)
- [EASE\_IN\_OUT\_QUAD](core_utils$UT.md#ease_in_out_quad)
- [EASE\_IN\_QUAD](core_utils$UT.md#ease_in_quad)
- [EASE\_OUT\_QUAD](core_utils$UT.md#ease_out_quad)
- [EULER\_FROM\_MAT3](core_utils$UT.md#euler_from_mat3)
- [EULER\_FROM\_QUATERNION](core_utils$UT.md#euler_from_quaternion)
- [FAIL](core_utils$UT.md#fail)
- [GET\_RANDOM\_FLOAT](core_utils$UT.md#get_random_float)
- [GET\_RANDOM\_INT](core_utils$UT.md#get_random_int)
- [LERP](core_utils$UT.md#lerp)
- [LINEAR](core_utils$UT.md#linear)
- [LINEAR\_VEC2](core_utils$UT.md#linear_vec2)
- [LINEAR\_VEC3](core_utils$UT.md#linear_vec3)
- [MAT3\_COPY](core_utils$UT.md#mat3_copy)
- [MAT3\_CREATE](core_utils$UT.md#mat3_create)
- [MAT3\_FROM\_ROTATION\_QUATERNION](core_utils$UT.md#mat3_from_rotation_quaternion)
- [MAT3\_IDENTITY](core_utils$UT.md#mat3_identity)
- [MAT3\_INVERT](core_utils$UT.md#mat3_invert)
- [MAT3\_MULTIPLY](core_utils$UT.md#mat3_multiply)
- [MAT3\_MULTIPLY\_BY\_VEC3](core_utils$UT.md#mat3_multiply_by_vec3)
- [MAT3\_PROJECTION](core_utils$UT.md#mat3_projection)
- [MAT3\_ROTATE](core_utils$UT.md#mat3_rotate)
- [MAT3\_SCALE](core_utils$UT.md#mat3_scale)
- [MAT3\_TRANSLATE](core_utils$UT.md#mat3_translate)
- [MAT4\_COMPUTE](core_utils$UT.md#mat4_compute)
- [MAT4\_COPY](core_utils$UT.md#mat4_copy)
- [MAT4\_CREATE](core_utils$UT.md#mat4_create)
- [MAT4\_IDENTITY](core_utils$UT.md#mat4_identity)
- [MAT4\_INVERT](core_utils$UT.md#mat4_invert)
- [MAT4\_LOOKAT](core_utils$UT.md#mat4_lookat)
- [MAT4\_MULTIPLY](core_utils$UT.md#mat4_multiply)
- [MAT4\_MULTIPLY\_BY\_VEC4](core_utils$UT.md#mat4_multiply_by_vec4)
- [MAT4\_ORTHO](core_utils$UT.md#mat4_ortho)
- [MAT4\_ORTHOGRAPHIC](core_utils$UT.md#mat4_orthographic)
- [MAT4\_PERSPECTIVE](core_utils$UT.md#mat4_perspective)
- [MAT4\_ROTATE\_X](core_utils$UT.md#mat4_rotate_x)
- [MAT4\_ROTATE\_Y](core_utils$UT.md#mat4_rotate_y)
- [MAT4\_ROTATE\_Z](core_utils$UT.md#mat4_rotate_z)
- [MAT4\_SCALE](core_utils$UT.md#mat4_scale)
- [MAT4\_TRANSFORM](core_utils$UT.md#mat4_transform)
- [MAT4\_TRANSLATE](core_utils$UT.md#mat4_translate)
- [MAT4\_TRANSPOSE](core_utils$UT.md#mat4_transpose)
- [QUATERNION\_CREATE](core_utils$UT.md#quaternion_create)
- [QUATERNION\_FROM\_EULER](core_utils$UT.md#quaternion_from_euler)
- [RANDARRAY](core_utils$UT.md#randarray)
- [RANGE\_ARRAY](core_utils$UT.md#range_array)
- [RAY\_BOX](core_utils$UT.md#ray_box)
- [RAY\_PLAN](core_utils$UT.md#ray_plan)
- [RAY\_TRIANGLE](core_utils$UT.md#ray_triangle)
- [SHUFFLE](core_utils$UT.md#shuffle)
- [SPREAD](core_utils$UT.md#spread)
- [TO\_FIXED\_NUMBER](core_utils$UT.md#to_fixed_number)
- [TRI2\_POINT\_INSIDE](core_utils$UT.md#tri2_point_inside)
- [TRI3\_NORMAL](core_utils$UT.md#tri3_normal)
- [TRI3\_POINT\_ELEVATION](core_utils$UT.md#tri3_point_elevation)
- [TRI3\_POINT\_INSIDE](core_utils$UT.md#tri3_point_inside)
- [VEC1\_COPY](core_utils$UT.md#vec1_copy)
- [VEC2\_ADD](core_utils$UT.md#vec2_add)
- [VEC2\_ANGLE](core_utils$UT.md#vec2_angle)
- [VEC2\_ANGLE\_BETWEEN](core_utils$UT.md#vec2_angle_between)
- [VEC2\_COPY](core_utils$UT.md#vec2_copy)
- [VEC2\_CREATE](core_utils$UT.md#vec2_create)
- [VEC2\_CROSS](core_utils$UT.md#vec2_cross)
- [VEC2\_DISTANCE](core_utils$UT.md#vec2_distance)
- [VEC2\_DOT](core_utils$UT.md#vec2_dot)
- [VEC2\_ISEQUAL](core_utils$UT.md#vec2_isequal)
- [VEC2\_LENGTH](core_utils$UT.md#vec2_length)
- [VEC2\_MULTIPLY](core_utils$UT.md#vec2_multiply)
- [VEC2\_NORMALIZE](core_utils$UT.md#vec2_normalize)
- [VEC2\_OPPOSITE](core_utils$UT.md#vec2_opposite)
- [VEC2\_ORIENTATION](core_utils$UT.md#vec2_orientation)
- [VEC2\_PARSE](core_utils$UT.md#vec2_parse)
- [VEC2\_PROJECTION\_COS](core_utils$UT.md#vec2_projection_cos)
- [VEC2\_QUADRATIC\_BEZIER](core_utils$UT.md#vec2_quadratic_bezier)
- [VEC2\_SCALE](core_utils$UT.md#vec2_scale)
- [VEC2\_SPREAD](core_utils$UT.md#vec2_spread)
- [VEC2\_SUBSTRACT](core_utils$UT.md#vec2_substract)
- [VEC3\_ADD](core_utils$UT.md#vec3_add)
- [VEC3\_COPY](core_utils$UT.md#vec3_copy)
- [VEC3\_CREATE](core_utils$UT.md#vec3_create)
- [VEC3\_CROSS](core_utils$UT.md#vec3_cross)
- [VEC3\_DISTANCE](core_utils$UT.md#vec3_distance)
- [VEC3\_DOT](core_utils$UT.md#vec3_dot)
- [VEC3\_ISEQUAL](core_utils$UT.md#vec3_isequal)
- [VEC3\_LENGTH](core_utils$UT.md#vec3_length)
- [VEC3\_MULTIPLY](core_utils$UT.md#vec3_multiply)
- [VEC3\_NORMALIZE](core_utils$UT.md#vec3_normalize)
- [VEC3\_OPPOSITE](core_utils$UT.md#vec3_opposite)
- [VEC3\_PARSE](core_utils$UT.md#vec3_parse)
- [VEC3\_QUADRATIC\_BEZIER](core_utils$UT.md#vec3_quadratic_bezier)
- [VEC3\_SCALE](core_utils$UT.md#vec3_scale)
- [VEC3\_SPREAD](core_utils$UT.md#vec3_spread)
- [VEC3\_SUBSTRACT](core_utils$UT.md#vec3_substract)
- [VEC4\_COPY](core_utils$UT.md#vec4_copy)
- [VEC4\_CREATE](core_utils$UT.md#vec4_create)
- [VEC4\_PARSE](core_utils$UT.md#vec4_parse)
- [WAIT](core_utils$UT.md#wait)

### Properties

- [BIG\_EPSILON](core_utils$UT.md#big_epsilon)
- [DEG\_TO\_RAD\_RATIO](core_utils$UT.md#deg_to_rad_ratio)
- [EPSILON](core_utils$UT.md#epsilon)
- [VEC2\_DOWN](core_utils$UT.md#vec2_down)
- [VEC2\_LEFT](core_utils$UT.md#vec2_left)
- [VEC2\_RIGHT](core_utils$UT.md#vec2_right)
- [VEC2\_SIZE](core_utils$UT.md#vec2_size)
- [VEC2\_UP](core_utils$UT.md#vec2_up)
- [VEC2\_ZERO](core_utils$UT.md#vec2_zero)
- [VEC3\_BACKWARD](core_utils$UT.md#vec3_backward)
- [VEC3\_DOWN](core_utils$UT.md#vec3_down)
- [VEC3\_FORWARD](core_utils$UT.md#vec3_forward)
- [VEC3\_LEFT](core_utils$UT.md#vec3_left)
- [VEC3\_RIGHT](core_utils$UT.md#vec3_right)
- [VEC3\_SIZE](core_utils$UT.md#vec3_size)
- [VEC3\_UP](core_utils$UT.md#vec3_up)
- [VEC3\_ZERO](core_utils$UT.md#vec3_zero)

### Constructors

- [constructor](core_utils$UT.md#constructor)

## Methods

### CATMULL\_ROM\_GRADIENT\_VEC2

▸ `Static` **CATMULL_ROM_GRADIENT_VEC2**(`points`, `t`): `Float32Array` \| `Uint32Array` \| `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `points` | [`vec3`](../modules/core_global.md#vec3)[] |
| `t` | `number` |

#### Returns

`Float32Array` \| `Uint32Array` \| `number`[]

___

### CATMULL\_ROM\_GRADIENT\_VEC3

▸ `Static` **CATMULL_ROM_GRADIENT_VEC3**(`points`, `t`): `Float32Array` \| `Uint32Array` \| `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `points` | [`vec3`](../modules/core_global.md#vec3)[] |
| `t` | `number` |

#### Returns

`Float32Array` \| `Uint32Array` \| `number`[]

___

### CATMULL\_ROM\_VEC2

▸ `Static` **CATMULL_ROM_VEC2**(`points`, `t`): `number`[]

***********************************************************************

#### Parameters

| Name | Type |
| :------ | :------ |
| `points` | [`vec2`](../modules/core_global.md#vec2)[] |
| `t` | `number` |

#### Returns

`number`[]

___

### CATMULL\_ROM\_VEC3

▸ `Static` **CATMULL_ROM_VEC3**(`points`, `t`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `points` | [`vec3`](../modules/core_global.md#vec3)[] |
| `t` | `number` |

#### Returns

`number`[]

___

### CLAMP

▸ `Static` **CLAMP**(`value`, `min`, `max`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `min` | `number` |
| `max` | `number` |

#### Returns

`number`

___

### COLLIDE\_BOX\_TO\_BOX

▸ `Static` **COLLIDE_BOX_TO_BOX**(`min1`, `max1`, `min2`, `max2`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `min1` | [`vec3`](../modules/core_global.md#vec3) |
| `max1` | [`vec3`](../modules/core_global.md#vec3) |
| `min2` | [`vec3`](../modules/core_global.md#vec3) |
| `max2` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

`boolean`

___

### COLLIDE\_CIRCLE

▸ `Static` **COLLIDE_CIRCLE**(`c1`, `r1`, `c2`, `r2`, `outVelocity?`): `boolean`

***********************************************************************

#### Parameters

| Name | Type |
| :------ | :------ |
| `c1` | [`vec2`](../modules/core_global.md#vec2) |
| `r1` | `number` |
| `c2` | [`vec2`](../modules/core_global.md#vec2) |
| `r2` | `number` |
| `outVelocity` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

`boolean`

___

### COLLIDE\_CYLINDER

▸ `Static` **COLLIDE_CYLINDER**(`c1`, `r1`, `h1`, `c2`, `r2`, `h2`, `outVelocity?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `c1` | [`vec3`](../modules/core_global.md#vec3) |
| `r1` | `number` |
| `h1` | `number` |
| `c2` | [`vec3`](../modules/core_global.md#vec3) |
| `r2` | `number` |
| `h2` | `number` |
| `outVelocity` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

`boolean`

___

### COLLIDE\_LINE\_TO\_LINE

▸ `Static` **COLLIDE_LINE_TO_LINE**(`p1`, `q1`, `p2`, `q2`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p1` | [`vec2`](../modules/core_global.md#vec2) |
| `q1` | [`vec2`](../modules/core_global.md#vec2) |
| `p2` | [`vec2`](../modules/core_global.md#vec2) |
| `q2` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

`boolean`

___

### COLLIDE\_POINT\_TO\_BOX

▸ `Static` **COLLIDE_POINT_TO_BOX**(`p`, `min`, `max`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`vec3`](../modules/core_global.md#vec3) |
| `min` | [`vec3`](../modules/core_global.md#vec3) |
| `max` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

`boolean`

___

### COLLIDE\_POINT\_TO\_RECT

▸ `Static` **COLLIDE_POINT_TO_RECT**(`p`, `min`, `max`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`vec2`](../modules/core_global.md#vec2) |
| `min` | [`vec2`](../modules/core_global.md#vec2) |
| `max` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

`boolean`

___

### COLLIDE\_RECT\_TO\_RECT

▸ `Static` **COLLIDE_RECT_TO_RECT**(`min1`, `max1`, `min2`, `max2`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `min1` | [`vec2`](../modules/core_global.md#vec2) |
| `max1` | [`vec2`](../modules/core_global.md#vec2) |
| `min2` | [`vec2`](../modules/core_global.md#vec2) |
| `max2` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

`boolean`

___

### DEG\_TO\_RAD

▸ `Static` **DEG_TO_RAD**(`deg`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deg` | `number` |

#### Returns

`number`

___

### EASE\_IN\_OUT\_QUAD

▸ `Static` **EASE_IN_OUT_QUAD**(`t`, `b`, `e`, `d?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `t` | `number` | `undefined` |
| `b` | `number` | `undefined` |
| `e` | `number` | `undefined` |
| `d` | `number` | `1` |

#### Returns

`number`

___

### EASE\_IN\_QUAD

▸ `Static` **EASE_IN_QUAD**(`t`, `b`, `e`, `d?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `t` | `number` | `undefined` |
| `b` | `number` | `undefined` |
| `e` | `number` | `undefined` |
| `d` | `number` | `1` |

#### Returns

`number`

___

### EASE\_OUT\_QUAD

▸ `Static` **EASE_OUT_QUAD**(`t`, `b`, `e`, `d?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `t` | `number` | `undefined` |
| `b` | `number` | `undefined` |
| `e` | `number` | `undefined` |
| `d` | `number` | `1` |

#### Returns

`number`

___

### EULER\_FROM\_MAT3

▸ `Static` **EULER_FROM_MAT3**(`matrix`, `out?`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | [`mat3`](../modules/core_global.md#mat3) |
| `out` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### EULER\_FROM\_QUATERNION

▸ `Static` **EULER_FROM_QUATERNION**(`quaternion`, `out?`): [`vec3`](../modules/core_global.md#vec3)

***********************************************************************

#### Parameters

| Name | Type |
| :------ | :------ |
| `quaternion` | [`vec4`](../modules/core_global.md#vec4) |
| `out` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### FAIL

▸ `Static` **FAIL**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

___

### GET\_RANDOM\_FLOAT

▸ `Static` **GET_RANDOM_FLOAT**(`min`, `max`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | `number` |
| `max` | `number` |

#### Returns

`number`

___

### GET\_RANDOM\_INT

▸ `Static` **GET_RANDOM_INT**(`min`, `max`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | `number` |
| `max` | `number` |

#### Returns

`number`

___

### LERP

▸ `Static` **LERP**(`a`, `b`, `t`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `number` |
| `b` | `number` |
| `t` | `number` |

#### Returns

`number`

___

### LINEAR

▸ `Static` **LINEAR**(`t`, `b`, `e`, `d?`): `number`

***********************************************************************

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `t` | `number` | `undefined` |
| `b` | `number` | `undefined` |
| `e` | `number` | `undefined` |
| `d` | `number` | `1` |

#### Returns

`number`

___

### LINEAR\_VEC2

▸ `Static` **LINEAR_VEC2**(`t`, `b`, `e`, `d?`): [`vec2`](../modules/core_global.md#vec2)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `t` | `number` | `undefined` |
| `b` | [`vec2`](../modules/core_global.md#vec2) | `undefined` |
| `e` | [`vec2`](../modules/core_global.md#vec2) | `undefined` |
| `d` | `number` | `1` |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

___

### LINEAR\_VEC3

▸ `Static` **LINEAR_VEC3**(`t`, `b`, `e`, `d?`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `t` | `number` | `undefined` |
| `b` | [`vec3`](../modules/core_global.md#vec3) | `undefined` |
| `e` | [`vec3`](../modules/core_global.md#vec3) | `undefined` |
| `d` | `number` | `1` |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### MAT3\_COPY

▸ `Static` **MAT3_COPY**(`src`, `out`): [`mat3`](../modules/core_global.md#mat3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | [`mat3`](../modules/core_global.md#mat3) |
| `out` | [`mat3`](../modules/core_global.md#mat3) |

#### Returns

[`mat3`](../modules/core_global.md#mat3)

___

### MAT3\_CREATE

▸ `Static` **MAT3_CREATE**(): `Float32Array`

***********************************************************************

#### Returns

`Float32Array`

___

### MAT3\_FROM\_ROTATION\_QUATERNION

▸ `Static` **MAT3_FROM_ROTATION_QUATERNION**(`quaternion`, `out?`): [`mat3`](../modules/core_global.md#mat3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `quaternion` | [`vec4`](../modules/core_global.md#vec4) |
| `out` | [`mat3`](../modules/core_global.md#mat3) |

#### Returns

[`mat3`](../modules/core_global.md#mat3)

___

### MAT3\_IDENTITY

▸ `Static` **MAT3_IDENTITY**(`out?`): [`mat3`](../modules/core_global.md#mat3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `out` | [`mat3`](../modules/core_global.md#mat3) |

#### Returns

[`mat3`](../modules/core_global.md#mat3)

___

### MAT3\_INVERT

▸ `Static` **MAT3_INVERT**(`a`, `out?`): [`mat3`](../modules/core_global.md#mat3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`mat3`](../modules/core_global.md#mat3) |
| `out` | [`mat3`](../modules/core_global.md#mat3) |

#### Returns

[`mat3`](../modules/core_global.md#mat3)

___

### MAT3\_MULTIPLY

▸ `Static` **MAT3_MULTIPLY**(`a`, `b`, `out?`): [`mat3`](../modules/core_global.md#mat3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`mat3`](../modules/core_global.md#mat3) |
| `b` | [`mat3`](../modules/core_global.md#mat3) |
| `out` | [`mat3`](../modules/core_global.md#mat3) |

#### Returns

[`mat3`](../modules/core_global.md#mat3)

___

### MAT3\_MULTIPLY\_BY\_VEC3

▸ `Static` **MAT3_MULTIPLY_BY_VEC3**(`a`, `v`, `out?`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`mat3`](../modules/core_global.md#mat3) |
| `v` | [`vec3`](../modules/core_global.md#vec3) |
| `out` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### MAT3\_PROJECTION

▸ `Static` **MAT3_PROJECTION**(`w`, `h`, `out?`): [`mat3`](../modules/core_global.md#mat3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `w` | `number` |
| `h` | `number` |
| `out` | [`mat3`](../modules/core_global.md#mat3) |

#### Returns

[`mat3`](../modules/core_global.md#mat3)

___

### MAT3\_ROTATE

▸ `Static` **MAT3_ROTATE**(`a`, `out?`): [`mat3`](../modules/core_global.md#mat3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `number` |
| `out` | [`mat3`](../modules/core_global.md#mat3) |

#### Returns

[`mat3`](../modules/core_global.md#mat3)

___

### MAT3\_SCALE

▸ `Static` **MAT3_SCALE**(`x`, `y`, `out?`): [`mat3`](../modules/core_global.md#mat3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `out` | [`mat3`](../modules/core_global.md#mat3) |

#### Returns

[`mat3`](../modules/core_global.md#mat3)

___

### MAT3\_TRANSLATE

▸ `Static` **MAT3_TRANSLATE**(`x`, `y`, `out?`): [`mat3`](../modules/core_global.md#mat3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `out` | [`mat3`](../modules/core_global.md#mat3) |

#### Returns

[`mat3`](../modules/core_global.md#mat3)

___

### MAT4\_COMPUTE

▸ `Static` **MAT4_COMPUTE**(`...matrices`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...matrices` | [`mat4`](../modules/core_global.md#mat4)[] |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_COPY

▸ `Static` **MAT4_COPY**(`src`, `out`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | [`mat4`](../modules/core_global.md#mat4) |
| `out` | [`mat4`](../modules/core_global.md#mat4) |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_CREATE

▸ `Static` **MAT4_CREATE**(): `Float32Array`

***********************************************************************

#### Returns

`Float32Array`

___

### MAT4\_IDENTITY

▸ `Static` **MAT4_IDENTITY**(`out?`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `out` | [`mat4`](../modules/core_global.md#mat4) |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_INVERT

▸ `Static` **MAT4_INVERT**(`a`, `out?`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`mat4`](../modules/core_global.md#mat4) |
| `out` | [`mat4`](../modules/core_global.md#mat4) |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_LOOKAT

▸ `Static` **MAT4_LOOKAT**(`position`, `target`, `vertical?`, `out?`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `position` | [`vec3`](../modules/core_global.md#vec3) | `undefined` |
| `target` | [`vec3`](../modules/core_global.md#vec3) | `undefined` |
| `vertical` | [`vec3`](../modules/core_global.md#vec3) | `UT.VEC3_UP` |
| `out` | [`mat4`](../modules/core_global.md#mat4) | `undefined` |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_MULTIPLY

▸ `Static` **MAT4_MULTIPLY**(`a`, `b`, `out?`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`mat4`](../modules/core_global.md#mat4) |
| `b` | [`mat4`](../modules/core_global.md#mat4) |
| `out` | [`mat4`](../modules/core_global.md#mat4) |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_MULTIPLY\_BY\_VEC4

▸ `Static` **MAT4_MULTIPLY_BY_VEC4**(`a`, `v`, `out?`): [`vec4`](../modules/core_global.md#vec4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`mat4`](../modules/core_global.md#mat4) |
| `v` | [`vec4`](../modules/core_global.md#vec4) |
| `out` | [`vec4`](../modules/core_global.md#vec4) |

#### Returns

[`vec4`](../modules/core_global.md#vec4)

___

### MAT4\_ORTHO

▸ `Static` **MAT4_ORTHO**(`left`, `right`, `bottom`, `top`, `near`, `far`, `out?`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `left` | `number` |
| `right` | `number` |
| `bottom` | `number` |
| `top` | `number` |
| `near` | `number` |
| `far` | `number` |
| `out` | [`mat4`](../modules/core_global.md#mat4) |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_ORTHOGRAPHIC

▸ `Static` **MAT4_ORTHOGRAPHIC**(`width`, `height`, `depth`, `out?`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |
| `depth` | `number` |
| `out` | [`mat4`](../modules/core_global.md#mat4) |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_PERSPECTIVE

▸ `Static` **MAT4_PERSPECTIVE**(`fov`, `ar`, `near`, `far`, `out?`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fov` | `number` |
| `ar` | `number` |
| `near` | `number` |
| `far` | `number` |
| `out` | [`mat4`](../modules/core_global.md#mat4) |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_ROTATE\_X

▸ `Static` **MAT4_ROTATE_X**(`a`, `out?`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `number` |
| `out` | [`mat4`](../modules/core_global.md#mat4) |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_ROTATE\_Y

▸ `Static` **MAT4_ROTATE_Y**(`a`, `out?`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `number` |
| `out` | [`mat4`](../modules/core_global.md#mat4) |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_ROTATE\_Z

▸ `Static` **MAT4_ROTATE_Z**(`a`, `out?`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `number` |
| `out` | [`mat4`](../modules/core_global.md#mat4) |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_SCALE

▸ `Static` **MAT4_SCALE**(`x`, `y`, `z`, `out?`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |
| `out` | [`mat4`](../modules/core_global.md#mat4) |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_TRANSFORM

▸ `Static` **MAT4_TRANSFORM**(`position`, `rotation`, `scale`, `out?`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`vec3`](../modules/core_global.md#vec3) |
| `rotation` | [`vec3`](../modules/core_global.md#vec3) |
| `scale` | [`vec3`](../modules/core_global.md#vec3) |
| `out` | [`mat4`](../modules/core_global.md#mat4) |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_TRANSLATE

▸ `Static` **MAT4_TRANSLATE**(`x`, `y`, `z`, `out?`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |
| `out` | [`mat4`](../modules/core_global.md#mat4) |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### MAT4\_TRANSPOSE

▸ `Static` **MAT4_TRANSPOSE**(`a`, `out?`): [`mat4`](../modules/core_global.md#mat4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`mat4`](../modules/core_global.md#mat4) |
| `out` | [`mat4`](../modules/core_global.md#mat4) |

#### Returns

[`mat4`](../modules/core_global.md#mat4)

___

### QUATERNION\_CREATE

▸ `Static` **QUATERNION_CREATE**(`x?`, `y?`, `z?`, `w?`): `Float32Array`

***********************************************************************

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `0` |
| `y` | `number` | `0` |
| `z` | `number` | `0` |
| `w` | `number` | `1` |

#### Returns

`Float32Array`

___

### QUATERNION\_FROM\_EULER

▸ `Static` **QUATERNION_FROM_EULER**(`euler`, `order`, `out?`): [`vec4`](../modules/core_global.md#vec4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `euler` | [`vec3`](../modules/core_global.md#vec3) |
| `order` | ``"XYZ"`` \| ``"XZY"`` \| ``"YXZ"`` \| ``"YZX"`` \| ``"ZXY"`` \| ``"ZYX"`` |
| `out` | [`vec4`](../modules/core_global.md#vec4) |

#### Returns

[`vec4`](../modules/core_global.md#vec4)

___

### RANDARRAY

▸ `Static` **RANDARRAY**(`min`, `max`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | `number` |
| `max` | `number` |

#### Returns

`number`[]

___

### RANGE\_ARRAY

▸ `Static` **RANGE_ARRAY**(`start`, `stop`, `step?`): `number`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `start` | `number` | `undefined` |
| `stop` | `number` | `undefined` |
| `step` | `number` | `0` |

#### Returns

`number`[]

___

### RAY\_BOX

▸ `Static` **RAY_BOX**(`origin`, `dir`, `min`, `max`, `outIntersectPoint?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | [`vec3`](../modules/core_global.md#vec3) |
| `dir` | [`vec3`](../modules/core_global.md#vec3) |
| `min` | [`vec3`](../modules/core_global.md#vec3) |
| `max` | [`vec3`](../modules/core_global.md#vec3) |
| `outIntersectPoint` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

`boolean`

___

### RAY\_PLAN

▸ `Static` **RAY_PLAN**(`origin`, `dir`, `a`, `n`, `culling`, `outIntersectPoint?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | [`vec3`](../modules/core_global.md#vec3) |
| `dir` | [`vec3`](../modules/core_global.md#vec3) |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `n` | [`vec3`](../modules/core_global.md#vec3) |
| `culling` | `boolean` |
| `outIntersectPoint` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

`boolean`

___

### RAY\_TRIANGLE

▸ `Static` **RAY_TRIANGLE**(`origin`, `dir`, `a`, `b`, `c`, `culling?`, `outIntersectPoint?`): `boolean`

***********************************************************************

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `origin` | [`vec3`](../modules/core_global.md#vec3) | `undefined` |
| `dir` | [`vec3`](../modules/core_global.md#vec3) | `undefined` |
| `a` | [`vec3`](../modules/core_global.md#vec3) | `undefined` |
| `b` | [`vec3`](../modules/core_global.md#vec3) | `undefined` |
| `c` | [`vec3`](../modules/core_global.md#vec3) | `undefined` |
| `culling` | `boolean` | `false` |
| `outIntersectPoint` | [`vec3`](../modules/core_global.md#vec3) | `undefined` |

#### Returns

`boolean`

___

### SHUFFLE

▸ `Static` **SHUFFLE**(`arr`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `any`[] |

#### Returns

`any`[]

___

### SPREAD

▸ `Static` **SPREAD**(`base`, `spread`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `base` | `number` |
| `spread` | `number` |

#### Returns

`number`

___

### TO\_FIXED\_NUMBER

▸ `Static` **TO_FIXED_NUMBER**(`num`, `digits`, `base?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `num` | `number` | `undefined` |
| `digits` | `number` | `undefined` |
| `base` | `number` | `10` |

#### Returns

`number`

___

### TRI2\_POINT\_INSIDE

▸ `Static` **TRI2_POINT_INSIDE**(`p`, `a`, `b`, `c`): `number`

***********************************************************************

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`vec2`](../modules/core_global.md#vec2) |
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `b` | [`vec2`](../modules/core_global.md#vec2) |
| `c` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

`number`

___

### TRI3\_NORMAL

▸ `Static` **TRI3_NORMAL**(`a`, `b`, `c`, `out?`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `b` | [`vec3`](../modules/core_global.md#vec3) |
| `c` | [`vec3`](../modules/core_global.md#vec3) |
| `out` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### TRI3\_POINT\_ELEVATION

▸ `Static` **TRI3_POINT_ELEVATION**(`p`, `a`, `b`, `c`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`vec2`](../modules/core_global.md#vec2) |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `b` | [`vec3`](../modules/core_global.md#vec3) |
| `c` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

`number`

___

### TRI3\_POINT\_INSIDE

▸ `Static` **TRI3_POINT_INSIDE**(`p`, `a`, `b`, `c`, `n?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`vec3`](../modules/core_global.md#vec3) |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `b` | [`vec3`](../modules/core_global.md#vec3) |
| `c` | [`vec3`](../modules/core_global.md#vec3) |
| `n?` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

`boolean`

___

### VEC1\_COPY

▸ `Static` **VEC1_COPY**(`src`, `out?`): [`vec1`](../modules/core_global.md#vec1)

***********************************************************************

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `number` |
| `out` | [`vec1`](../modules/core_global.md#vec1) |

#### Returns

[`vec1`](../modules/core_global.md#vec1)

___

### VEC2\_ADD

▸ `Static` **VEC2_ADD**(`a`, `b`, `out?`): [`vec2`](../modules/core_global.md#vec2)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `b` | [`vec2`](../modules/core_global.md#vec2) |
| `out` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

___

### VEC2\_ANGLE

▸ `Static` **VEC2_ANGLE**(`a`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

`number`

___

### VEC2\_ANGLE\_BETWEEN

▸ `Static` **VEC2_ANGLE_BETWEEN**(`a`, `b`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `b` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

`number`

___

### VEC2\_COPY

▸ `Static` **VEC2_COPY**(`src`, `out?`): [`vec2`](../modules/core_global.md#vec2)

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | [`vec2`](../modules/core_global.md#vec2) |
| `out` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

___

### VEC2\_CREATE

▸ `Static` **VEC2_CREATE**(`x?`, `y?`): `Float32Array`

***********************************************************************

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `0` |
| `y` | `number` | `0` |

#### Returns

`Float32Array`

___

### VEC2\_CROSS

▸ `Static` **VEC2_CROSS**(`a`, `b`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `b` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

`number`

___

### VEC2\_DISTANCE

▸ `Static` **VEC2_DISTANCE**(`a`, `b`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `b` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

`number`

___

### VEC2\_DOT

▸ `Static` **VEC2_DOT**(`a`, `b`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `b` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

`number`

___

### VEC2\_ISEQUAL

▸ `Static` **VEC2_ISEQUAL**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `b` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

`boolean`

___

### VEC2\_LENGTH

▸ `Static` **VEC2_LENGTH**(`a`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

`number`

___

### VEC2\_MULTIPLY

▸ `Static` **VEC2_MULTIPLY**(`a`, `b`, `out?`): [`vec2`](../modules/core_global.md#vec2)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `b` | [`vec2`](../modules/core_global.md#vec2) |
| `out` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

___

### VEC2\_NORMALIZE

▸ `Static` **VEC2_NORMALIZE**(`a`, `out?`): [`vec2`](../modules/core_global.md#vec2)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `out` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

___

### VEC2\_OPPOSITE

▸ `Static` **VEC2_OPPOSITE**(`a`, `out?`): [`vec2`](../modules/core_global.md#vec2)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `out` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

___

### VEC2\_ORIENTATION

▸ `Static` **VEC2_ORIENTATION**(`p`, `q`, `r`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`vec2`](../modules/core_global.md#vec2) |
| `q` | [`vec2`](../modules/core_global.md#vec2) |
| `r` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

`number`

___

### VEC2\_PARSE

▸ `Static` **VEC2_PARSE**(`str`, `separator?`, `out?`): [`vec2`](../modules/core_global.md#vec2)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `str` | `string` | `undefined` |
| `separator` | `string` | `' '` |
| `out` | [`vec2`](../modules/core_global.md#vec2) | `undefined` |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

___

### VEC2\_PROJECTION\_COS

▸ `Static` **VEC2_PROJECTION_COS**(`a`, `b`, `out?`): [`vec2`](../modules/core_global.md#vec2)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `b` | [`vec2`](../modules/core_global.md#vec2) |
| `out` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

___

### VEC2\_QUADRATIC\_BEZIER

▸ `Static` **VEC2_QUADRATIC_BEZIER**(`p0`, `p1`, `p2`, `t`, `out?`): [`vec2`](../modules/core_global.md#vec2)

#### Parameters

| Name | Type |
| :------ | :------ |
| `p0` | [`vec2`](../modules/core_global.md#vec2) |
| `p1` | [`vec2`](../modules/core_global.md#vec2) |
| `p2` | [`vec2`](../modules/core_global.md#vec2) |
| `t` | `number` |
| `out` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

___

### VEC2\_SCALE

▸ `Static` **VEC2_SCALE**(`a`, `scale`, `out?`): [`vec2`](../modules/core_global.md#vec2)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `scale` | `number` |
| `out` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

___

### VEC2\_SPREAD

▸ `Static` **VEC2_SPREAD**(`base`, `spread`): [`vec2`](../modules/core_global.md#vec2)

#### Parameters

| Name | Type |
| :------ | :------ |
| `base` | [`vec2`](../modules/core_global.md#vec2) |
| `spread` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

___

### VEC2\_SUBSTRACT

▸ `Static` **VEC2_SUBSTRACT**(`a`, `b`, `out?`): [`vec2`](../modules/core_global.md#vec2)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `b` | [`vec2`](../modules/core_global.md#vec2) |
| `out` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

___

### VEC3\_ADD

▸ `Static` **VEC3_ADD**(`a`, `b`, `out?`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `b` | [`vec3`](../modules/core_global.md#vec3) |
| `out` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_COPY

▸ `Static` **VEC3_COPY**(`src`, `out?`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | [`vec3`](../modules/core_global.md#vec3) |
| `out` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_CREATE

▸ `Static` **VEC3_CREATE**(`x?`, `y?`, `z?`): `Float32Array`

***********************************************************************

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `0` |
| `y` | `number` | `0` |
| `z` | `number` | `0` |

#### Returns

`Float32Array`

___

### VEC3\_CROSS

▸ `Static` **VEC3_CROSS**(`a`, `b`, `out?`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `b` | [`vec3`](../modules/core_global.md#vec3) |
| `out` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_DISTANCE

▸ `Static` **VEC3_DISTANCE**(`a`, `b`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `b` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

`number`

___

### VEC3\_DOT

▸ `Static` **VEC3_DOT**(`a`, `b`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `b` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

`number`

___

### VEC3\_ISEQUAL

▸ `Static` **VEC3_ISEQUAL**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `b` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

`boolean`

___

### VEC3\_LENGTH

▸ `Static` **VEC3_LENGTH**(`a`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

`number`

___

### VEC3\_MULTIPLY

▸ `Static` **VEC3_MULTIPLY**(`a`, `b`, `out?`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `b` | [`vec3`](../modules/core_global.md#vec3) |
| `out` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_NORMALIZE

▸ `Static` **VEC3_NORMALIZE**(`a`, `out?`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `out` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_OPPOSITE

▸ `Static` **VEC3_OPPOSITE**(`a`, `out?`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `out` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_PARSE

▸ `Static` **VEC3_PARSE**(`str`, `separator?`, `out?`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `str` | `string` | `undefined` |
| `separator` | `string` | `' '` |
| `out` | [`vec3`](../modules/core_global.md#vec3) | `undefined` |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_QUADRATIC\_BEZIER

▸ `Static` **VEC3_QUADRATIC_BEZIER**(`p0`, `p1`, `p2`, `t`, `out?`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `p0` | [`vec3`](../modules/core_global.md#vec3) |
| `p1` | [`vec3`](../modules/core_global.md#vec3) |
| `p2` | [`vec3`](../modules/core_global.md#vec3) |
| `t` | `number` |
| `out` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_SCALE

▸ `Static` **VEC3_SCALE**(`a`, `scale`, `out?`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `scale` | `number` |
| `out` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_SPREAD

▸ `Static` **VEC3_SPREAD**(`base`, `spread`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `base` | [`vec3`](../modules/core_global.md#vec3) |
| `spread` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_SUBSTRACT

▸ `Static` **VEC3_SUBSTRACT**(`a`, `b`, `out?`): [`vec3`](../modules/core_global.md#vec3)

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `b` | [`vec3`](../modules/core_global.md#vec3) |
| `out` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

___

### VEC4\_COPY

▸ `Static` **VEC4_COPY**(`src`, `out?`): [`vec4`](../modules/core_global.md#vec4)

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | [`vec4`](../modules/core_global.md#vec4) |
| `out` | [`vec4`](../modules/core_global.md#vec4) |

#### Returns

[`vec4`](../modules/core_global.md#vec4)

___

### VEC4\_CREATE

▸ `Static` **VEC4_CREATE**(`x?`, `y?`, `z?`, `w?`): `Float32Array`

***********************************************************************

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `0` |
| `y` | `number` | `0` |
| `z` | `number` | `0` |
| `w` | `number` | `0` |

#### Returns

`Float32Array`

___

### VEC4\_PARSE

▸ `Static` **VEC4_PARSE**(`str`, `separator?`, `out?`): [`vec4`](../modules/core_global.md#vec4)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `str` | `string` | `undefined` |
| `separator` | `string` | `' '` |
| `out` | [`vec4`](../modules/core_global.md#vec4) | `undefined` |

#### Returns

[`vec4`](../modules/core_global.md#vec4)

___

### WAIT

▸ `Static` **WAIT**(`ms`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |

#### Returns

`Promise`<`any`\>

## Properties

### BIG\_EPSILON

▪ `Static` **BIG\_EPSILON**: `number` = `0.0001`

___

### DEG\_TO\_RAD\_RATIO

▪ `Static` **DEG\_TO\_RAD\_RATIO**: `number`

___

### EPSILON

▪ `Static` **EPSILON**: `number` = `0.0000001`

___

### VEC2\_DOWN

▪ `Static` **VEC2\_DOWN**: [`vec2`](../modules/core_global.md#vec2)

___

### VEC2\_LEFT

▪ `Static` **VEC2\_LEFT**: [`vec2`](../modules/core_global.md#vec2)

___

### VEC2\_RIGHT

▪ `Static` **VEC2\_RIGHT**: [`vec2`](../modules/core_global.md#vec2)

___

### VEC2\_SIZE

▪ `Static` **VEC2\_SIZE**: `number` = `8`

___

### VEC2\_UP

▪ `Static` **VEC2\_UP**: [`vec2`](../modules/core_global.md#vec2)

___

### VEC2\_ZERO

▪ `Static` **VEC2\_ZERO**: [`vec2`](../modules/core_global.md#vec2)

___

### VEC3\_BACKWARD

▪ `Static` **VEC3\_BACKWARD**: [`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_DOWN

▪ `Static` **VEC3\_DOWN**: [`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_FORWARD

▪ `Static` **VEC3\_FORWARD**: [`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_LEFT

▪ `Static` **VEC3\_LEFT**: [`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_RIGHT

▪ `Static` **VEC3\_RIGHT**: [`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_SIZE

▪ `Static` **VEC3\_SIZE**: `number` = `12`

___

### VEC3\_UP

▪ `Static` **VEC3\_UP**: [`vec3`](../modules/core_global.md#vec3)

___

### VEC3\_ZERO

▪ `Static` **VEC3\_ZERO**: [`vec3`](../modules/core_global.md#vec3)

## Constructors

### constructor

• **new UT**()
