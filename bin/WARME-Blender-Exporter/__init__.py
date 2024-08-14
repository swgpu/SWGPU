bl_info = {
  "name": "WarmeY2K Engine Exporter",
  "author": "matidfk#2272",
  "version": (1, 0, 0),
  "blender": (4, 2, 0),
  "location": "View3D > Properties > WarmeY2K Engine Export",
  "description": "Export to a custom WarmeY2K format",
  "category": "Import-Export"
}

# Imports
import bpy
import shutil
import subprocess
import json
import mathutils
import struct
import sys
import os
import bmesh
import zipfile
from bpy.types import Operator, PropertyGroup, Panel
from bpy.props import StringProperty, IntProperty, FloatProperty, BoolProperty, FloatVectorProperty, PointerProperty
from bpy_extras.io_utils import ExportHelper
from math import pi
from pathlib import Path

INFINITY = sys.float_info.max
MATERIAL_FILE_PROPS = ["texture", "displacement_map", "diffuse_map", "specular_map", "emissive_map", "normal_map", "env_map", "toon_map"]

# JAM export operator
class WARME_OT_export_jam(bpy.types.Operator):
  """Export to a JAM format""" 
  bl_idname = "object.export_jam"
  bl_label = "Export to JAM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      jam_export_json(object, bpy.path.abspath(context.scene.render.filepath), object.name)
      mat_export_json(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# BAM export operator
class WARME_OT_export_bam(bpy.types.Operator):
  """Export to a BAM format""" 
  bl_idname = "object.export_bam"
  bl_label = "Export to BAM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      jam_export_binary(object, bpy.path.abspath(context.scene.render.filepath), object.name)
      mat_export_json(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# JSM export operator
class WARME_OT_export_jsm(bpy.types.Operator):
  """Export to a JSM format""" 
  bl_idname = "object.export_jsm"
  bl_label = "Export to JSM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      jsm_export_json(object, bpy.path.abspath(context.scene.render.filepath), object.name)
      mat_export_json(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# BSM export operator
class WARME_OT_export_bsm(bpy.types.Operator):
  """Export to a BSM format""" 
  bl_idname = "object.export_bsm"
  bl_label = "Export to BSM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      jsm_export_binary(object, bpy.path.abspath(context.scene.render.filepath), object.name)
      mat_export_json(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# JWM export operator
class WARME_OT_export_jwm(bpy.types.Operator):
  """Export to a JWM format""" 
  bl_idname = "object.export_jwm"
  bl_label = "Export to JWM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      jwm_export_json(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# BWM export operator
class WARME_OT_export_bwm(bpy.types.Operator):
  """Export to a BWM format""" 
  bl_idname = "object.export_bwm"
  bl_label = "Export to BWM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      jwm_export_binary(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# JNM export operator
class WARME_OT_export_jnm(bpy.types.Operator):
  """Export to a JNM format""" 
  bl_idname = "object.export_jnm"
  bl_label = "Export to JNM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      jnm_export_json(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# BNM export operator
class WARME_OT_export_bnm(bpy.types.Operator):
  """Export to a BNM format""" 
  bl_idname = "object.export_bnm"
  bl_label = "Export to BNM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      jnm_export_binary(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# JLM export operator
class WARME_OT_export_jlm(bpy.types.Operator):
  """Export to a JLM format""" 
  bl_idname = "object.export_jlm"
  bl_label = "Export to JLM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      jlm_export_json(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# BLM export operator
class WARME_OT_export_blm(bpy.types.Operator):
  """Export to a BLM format""" 
  bl_idname = "object.export_blm"
  bl_label = "Export to BLM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      jlm_export_binary(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# JSV export operator
class WARME_OT_export_jsv(bpy.types.Operator):
  """Export to a JSV format""" 
  bl_idname = "object.export_jsv"
  bl_label = "Export to JSV"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      jsv_export_json(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# BSV export operator
class WARME_OT_export_bsv(bpy.types.Operator):
  """Export to a BSV format""" 
  bl_idname = "object.export_bsv"
  bl_label = "Export to BSV"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      jsv_export_binary(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# JLT export operator
class WARME_OT_export_jlt(bpy.types.Operator):
  """Export to JLT format""" 
  bl_idname = "object.export_jlt"
  bl_label = "Export to JLT"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      jlt_export_json(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# GRF export operator
class WARME_OT_export_grf(bpy.types.Operator):
  """Export to GRF format""" 
  bl_idname = "object.export_grf"
  bl_label = "Export to GRF"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      grf_export_json(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# ANY export operator
class WARME_OT_export_any(bpy.types.Operator):
  """Export to ANY format""" 
  bl_idname = "object.export_any"
  bl_label = "Export to ANY"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      any_export_json(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# MAT export operator
class WARME_OT_export_mat(bpy.types.Operator):
  """Export to MAT format""" 
  bl_idname = "object.export_mat"
  bl_label = "Export to MAT"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    for object in bpy.context.selected_objects:
      mat_export_json(object, bpy.path.abspath(context.scene.render.filepath), object.name)
    #endfor
    return {"FINISHED"}


# Pack operator
class WARME_OT_pack(bpy.types.Operator):
  """Pack""" 
  bl_idname = "object.pack"
  bl_label = "Pack"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    pack(bpy.path.abspath(context.scene.render.filepath))
    return {"FINISHED"}


# Add an animation data block operator
class WARME_OT_add_animation(bpy.types.Operator):
  """Add animation""" 
  bl_idname = "object.add_animation"
  bl_label = "Add an animation to the current objects list"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}
  
  def execute(self, context):
    temp = context.object.jam_animations[-1].end_frame if len(context.object.jam_animations) > 0 else 0
    item = context.object.jam_animations.add()
    item.start_frame = temp
    item.end_frame = temp
    return {"FINISHED"}


# Remove an animation data block operator
class WARME_OT_remove_animation(bpy.types.Operator):
  """Remove last animation""" 
  bl_idname = "object.remove_animation"
  bl_label = "Remove last animation from the current objects list"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    context.object.jam_animations.remove(len(bpy.context.object.jam_animations) - 1)
    return {"FINISHED"}


# Blender class to allow saving jam_animations to objects as a data block
class JamAnimation(bpy.types.PropertyGroup):
  name: bpy.props.StringProperty(name="Name")
  start_frame: bpy.props.IntProperty(name="Start frame")
  end_frame: bpy.props.IntProperty(name="End frame")
  frame_duration: bpy.props.IntProperty(name="Frame Duration")


# Copy camera matrix operator
class WARME_OT_copy_camera_matrix(bpy.types.Operator):
  """Copy camera matrix""" 
  bl_idname = "object.copy_camera_matrix"
  bl_label = "Copy camera matrix to clipboard"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    cam = bpy.data.objects["Camera"]
    matrix = cam.matrix_world.to_4x4().transposed()
    tmp = matrix[0][1]; matrix[0][1] = matrix[0][2]; matrix[0][2] = tmp;
    tmp = matrix[1][1]; matrix[1][1] = matrix[1][2]; matrix[1][2] = tmp;
    tmp = matrix[2][1]; matrix[2][1] = matrix[2][2]; matrix[2][2] = tmp;
    tmp = matrix[3][1]; matrix[3][1] = matrix[3][2]; matrix[3][2] = tmp;
    matrix[0][0] = matrix[0][0] * -1;
    matrix[1][0] = matrix[1][0] * -1;
    matrix[2][0] = matrix[2][0] * -1;
    matrix[3][0] = matrix[3][0] * -1;
    self.report({'INFO'}, f"{matrix[0][0]}, {matrix[0][1]}, {matrix[0][2]}, {matrix[0][3]}, {matrix[1][0]}, {matrix[1][1]}, {matrix[1][2]}, {matrix[1][3]}, {matrix[2][0]}, {matrix[2][1]}, {matrix[2][2]}, {matrix[2][3]}, {matrix[3][0]}, {matrix[3][1]}, {matrix[3][2]}, {matrix[3][3]}")
    return {"FINISHED"}


# Copy object position operator
class WARME_OT_copy_object_position(bpy.types.Operator):
  """Copy object position""" 
  bl_idname = "object.copy_object_position"
  bl_label = "Copy object position to clipboard"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    # Fetch selected object
    pos = bpy.context.object.matrix_world.to_translation();
    self.report({'INFO'}, f"{-pos.x}, {pos.z}, {pos.y}") # converter x => -x; y => +z; z => +y;
    return {'FINISHED'}


# Copy object rotation operator
class WARME_OT_copy_object_rotation(bpy.types.Operator):
  """Copy object rotation""" 
  bl_idname = "object.copy_object_rotation"
  bl_label = "Copy object rotation to clipboard"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    # Fetch selected object
    rot = bpy.context.object.matrix_world.to_euler('YXZ');
    self.report({'INFO'}, f"{rot.x}, {-rot.z}, {rot.y}")
    return {"FINISHED"}


# UI Export
class WARME_PT_options(bpy.types.Panel):
  bl_idname = "WARME_PT_options"
  bl_label = "WARME Engine Exporter"
  bl_space_type = 'VIEW_3D'
  bl_region_type = 'UI'
  bl_category = "WarmeY2K Exporter"
  bl_context = "objectmode"
    
  def draw(self, context):
    layout = self.layout.column()

    line1 = layout.row()
    line1.operator("object.export_jwm")
    line1.operator("object.export_bwm")
    layout.separator()
    
    line2 = layout.row()
    line2.operator("object.export_jnm")
    line2.operator("object.export_bnm")
    layout.separator()

    line3 = layout.row()
    line3.operator("object.export_jsm")
    line3.operator("object.export_bsm")
    layout.separator()

    line4 = layout.row()
    line4.operator("object.export_jam")
    line4.operator("object.export_bam")
    layout.separator()

    line5 = layout.row()
    line5.operator("object.export_jlm")
    line5.operator("object.export_blm")
    layout.separator()        

    line6 = layout.row()
    line6.operator("object.export_jsv")
    line6.operator("object.export_bsv")
    layout.separator()  

    line6 = layout.row()
    line6.operator("object.export_jlt")
    line6.operator("object.export_grf")
    layout.separator()

    line7 = layout.row()
    line7.operator("object.export_any")
    line7.operator("object.export_mat")
    layout.separator()

    layout.operator("object.pack")
    layout.separator()  

    # Row for each animation
    for i, anim in enumerate(context.object.jam_animations):
      layout = self.layout.row()
      layout.prop(context.object.jam_animations[i], "name")
      layout.prop(context.object.jam_animations[i], "start_frame")
      layout.prop(context.object.jam_animations[i], "end_frame")
      layout.prop(context.object.jam_animations[i], "frame_duration")
    #endfor

    layout = self.layout.column()
    layout.separator()
    layout.operator("object.add_animation")
    layout.operator("object.remove_animation")
    layout.separator()
    layout.operator("object.copy_camera_matrix")
    layout.operator("object.copy_object_position")
    layout.operator("object.copy_object_rotation")


# Add an animation data block operator
class WARME_OT_material_add_animation(bpy.types.Operator):
  """Add animation""" 
  bl_idname = "object.material_add_animation"
  bl_label = "Add uv animation"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    item = context.object.material_animations.add()
    return {"FINISHED"}


# Remove an animation data block operator
class WARME_OT_material_remove_animation(bpy.types.Operator):
  """Remove last animation""" 
  bl_idname = "object.material_remove_animation"
  bl_label = "Remove last uv animation"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    context.object.material_animations.remove(len(bpy.context.object.material_animations) - 1)
    return {"FINISHED"}


# UI Material
class WARME_PT_material(bpy.types.Panel):
  bl_idname = "WARME_PT_material"
  bl_label = "WARME Engine Material"
  bl_space_type = 'VIEW_3D'
  bl_region_type = 'UI'
  bl_category = "WarmeY2K Material"
  bl_context = "objectmode"

  def draw(self, context):
    if bpy.context.selected_objects:
      selected_object = bpy.context.selected_objects[0]
      layout = self.layout.column()

      # Row for each animation
      for i, anim in enumerate(context.object.material_animations):
        col = layout.column()
        row1 = col.row()
        row1.prop(context.object.material_animations[i], "name")
        row1.prop(context.object.material_animations[i], "frame_duration")
        row2 = col.row()
        row2.prop(context.object.material_animations[i], "frames", text="", placeholder="fx,fy; fx,fy; etc...")
      #endfor

      layout.separator()
      layout.operator("object.material_add_animation")
      layout.operator("object.material_remove_animation")
      layout.separator()
      layout.separator(type="LINE")
      layout.separator()

      layout.prop(selected_object.mat_properties, "id")
      layout.prop(selected_object.mat_properties, "opacity")
      layout.prop(selected_object.mat_properties, "normal_intensity")
      layout.prop(selected_object.mat_properties, "lightning")
      layout.prop(selected_object.mat_properties, "ambient")
      layout.prop(selected_object.mat_properties, "diffuse")
      layout.prop(selected_object.mat_properties, "specular")
      layout.prop(selected_object.mat_properties, "emissive")
      layout.prop(selected_object.mat_properties, "texture")
      layout.prop(selected_object.mat_properties, "texture_scroll_angle")
      layout.prop(selected_object.mat_properties, "texture_scroll_rate")
      layout.prop(selected_object.mat_properties, "displacement_map")
      layout.prop(selected_object.mat_properties, "displacement_map_scroll_angle")
      layout.prop(selected_object.mat_properties, "displacement_map_scroll_rate")
      layout.prop(selected_object.mat_properties, "displacement_map_factor")
      layout.prop(selected_object.mat_properties, "toon_light_dir")
      layout.prop(selected_object.mat_properties, "diffuse_map")
      layout.prop(selected_object.mat_properties, "specular_map")
      layout.prop(selected_object.mat_properties, "emissive_map")
      layout.prop(selected_object.mat_properties, "normal_map")
      layout.prop(selected_object.mat_properties, "env_map")
      layout.prop(selected_object.mat_properties, "toon_map")
      layout.prop(selected_object.mat_properties, "decal_enabled_flag")
      layout.prop(selected_object.mat_properties, "shadow_enabled_flag")
      layout.prop(selected_object.mat_properties, "shininess")
      layout.prop(selected_object.mat_properties, "emissive_factor")
      layout.prop(selected_object.mat_properties, "toon_blending")
      layout.prop(selected_object.mat_properties, "facing_alpha_blend")
      layout.separator()
      layout.separator(type="LINE")
      layout.separator()
      
      row = layout.row()
      row.prop(selected_object.mat_properties, "s00_name")
      row.prop(selected_object.mat_properties, "s00_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s01_name")
      row.prop(selected_object.mat_properties, "s01_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s02_name")
      row.prop(selected_object.mat_properties, "s02_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s03_name")
      row.prop(selected_object.mat_properties, "s03_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s04_name")
      row.prop(selected_object.mat_properties, "s04_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s05_name")
      row.prop(selected_object.mat_properties, "s05_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s06_name")
      row.prop(selected_object.mat_properties, "s06_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s07_name")
      row.prop(selected_object.mat_properties, "s07_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s08_name")
      row.prop(selected_object.mat_properties, "s08_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s09_name")
      row.prop(selected_object.mat_properties, "s09_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s10_name")
      row.prop(selected_object.mat_properties, "s10_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s11_name")
      row.prop(selected_object.mat_properties, "s11_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s12_name")
      row.prop(selected_object.mat_properties, "s12_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s13_name")
      row.prop(selected_object.mat_properties, "s13_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s14_name")
      row.prop(selected_object.mat_properties, "s14_value", text="")
      row = layout.row()
      row.prop(selected_object.mat_properties, "s15_name")
      row.prop(selected_object.mat_properties, "s15_value", text="")
      layout.separator()
      layout.prop(selected_object.mat_properties, "s0_texture")
      layout.prop(selected_object.mat_properties, "s1_texture")
    #endif


# Blender class to allow saving material_animations to objects as a data block
class MaterialAnimation(bpy.types.PropertyGroup):
  name: bpy.props.StringProperty(name="Name")
  frames: bpy.props.StringProperty(name="Frames")
  frame_duration: bpy.props.IntProperty(name="Frame Duration")


# MAT properties ui
class WARME_PG_MatProperties(bpy.types.PropertyGroup):
  id: IntProperty(
    name="Id",
    description="Identifier for the material",
    default=0
  )
  opacity: FloatProperty(
    name="Opacity",
    description="Opacity for the material",
    default=1,
    min=0,
    max=1
  )
  normal_intensity: FloatProperty(
    name="Normal intensity",
    description="Normal intensity for the material",
    default=1
  )
  lightning: BoolProperty(
    name="Lightning flag",
    description="Lightning flag for the material",
    default=False
  )
  ambient: FloatVectorProperty(
    name="Ambient color",
    description="Ambient color for the material",
    subtype='COLOR',
    default=(0.5, 0.5, 0.5),
    min=0.0, max=1.0
  )
  diffuse: FloatVectorProperty(
    name="Diffuse color",
    description="Diffuse color for the material",
    subtype='COLOR',
    default=(1.0, 1.0, 1.0),
    min=0.0, max=1.0
  )
  specular: FloatVectorProperty(
    name="Specular color",
    description="Specular color for the material",
    subtype='COLOR',
    default=(0.0, 0.0, 0.0),
    min=0.0, max=1.0
  )
  emissive: FloatVectorProperty(
    name="Specular color",
    description="Specular color for the material",
    subtype='COLOR',
    default=(0.0, 0.0, 0.0),
    min=0.0, max=1.0
  )
  texture: StringProperty(
    name="Texture",
    description="Texture for the material",
    default="",
    subtype='FILE_PATH'
  )
  texture_scroll_angle: FloatProperty(
    name="Texture scroll angle",
    description="Texture scroll angle for the material",
    default=0
  )
  texture_scroll_rate: FloatProperty(
    name="Texture scroll rate",
    description="Texture scroll rate for the material",
    default=0
  )
  displacement_map: StringProperty(
    name="Displacement texture",
    description="Displacement texture for the material",
    default="",
    subtype='FILE_PATH'
  )
  displacement_map_scroll_angle: FloatProperty(
    name="Displacement texture scroll angle",
    description="Displacement texture scroll angle for the material",
    default=0
  )
  displacement_map_scroll_rate: FloatProperty(
    name="Displacement texture scroll rate",
    description="Displacement texture scroll rate for the material",
    default=0
  )
  displacement_map_factor: FloatProperty(
    name="Displacement texture factor",
    description="Displacement texture factor for the material",
    default=0
  )
  toon_light_dir: FloatVectorProperty(
    name="Toon light direction",
    description="Toon light direction for the material",
    default=(0.0, 0.0, 0.0),
    subtype='XYZ',
    min=0.0, max=1.0
  )
  diffuse_map: StringProperty(
    name="Diffuse texture",
    description="Diffuse texture for the material",
    default="",
    subtype='FILE_PATH'
  )
  specular_map: StringProperty(
    name="Specular texture",
    description="Specular texture for the material",
    default="",
    subtype='FILE_PATH'
  )
  emissive_map: StringProperty(
    name="Emissive texture",
    description="Emissive texture for the material",
    default="",
    subtype='FILE_PATH'
  )
  normal_map: StringProperty(
    name="Normal texture",
    description="Normal texture for the material",
    default="",
    subtype='FILE_PATH'
  )
  env_map: StringProperty(
    name="Env texture",
    description="Env texture for the material",
    default="",
    subtype='FILE_PATH'
  )
  toon_map: StringProperty(
    name="Toon texture",
    description="Toon texture for the material",
    default="",
    subtype='FILE_PATH'
  )
  decal_enabled_flag: BoolProperty(
    name="Decals enable",
    description="Enable decals for the material",
    default=False
  )
  shadow_enabled_flag: BoolProperty(
    name="Shadow enable",
    description="Enable shadow for the material",
    default=False
  )
  shininess: FloatProperty(
    name="Shininess factor",
    description="Shininess factor for the material",
    default=0,
    min=0.0, max=1.0
  )
  emissive_factor: FloatProperty(
    name="Emissive factor",
    description="Emissive factor for the material",
    default=1.0,
    min=0.0, max=1.0
  )
  toon_blending: FloatProperty(
    name="Toon blending factor",
    description="Toon blending factor for the material",
    default=1.0,
    min=0.0, max=1.0
  )
  facing_alpha_blend: FloatProperty(
    name="Facing alpha blend",
    description="Facing transparency based on view angle",
    default=1.0,
    min=0.0, max=1.0
  )

  s00_name: StringProperty(
    name="S00",
    description="Custom slot name 00",
    default="S00"
  )
  s00_value: FloatProperty(
    name="S00",
    description="Custom slot value 00"
  )

  s01_name: StringProperty(
    name="S01",
    description="Custom slot name 01",
    default="S01"
  )
  s01_value: FloatProperty(
    name="S01",
    description="Custom slot value 01"
  )

  s02_name: StringProperty(
    name="S02",
    description="Custom slot name 02",
    default="S02"
  )
  s02_value: FloatProperty(
    name="S02",
    description="Custom slot value 02"
  )

  s03_name: StringProperty(
    name="S03",
    description="Custom slot name 03",
    default="S03"
  )
  s03_value: FloatProperty(
    name="S03",
    description="Custom slot value 03"
  )

  s04_name: StringProperty(
    name="S04",
    description="Custom slot name 04",
    default="S04"
  )
  s04_value: FloatProperty(
    name="S04",
    description="Custom slot value 04"
  )

  s05_name: StringProperty(
    name="S05",
    description="Custom slot name 05",
    default="S05"
  )
  s05_value: FloatProperty(
    name="S05",
    description="Custom slot value 05"
  )

  s06_name: StringProperty(
    name="S06",
    description="Custom slot name 06",
    default="S06"
  )
  s06_value: FloatProperty(
    name="S06",
    description="Custom slot value 06"
  )

  s07_name: StringProperty(
    name="S07",
    description="Custom slot name 07",
    default="S07"
  )
  s07_value: FloatProperty(
    name="S07",
    description="Custom slot value 07"
  )
  
  s08_name: StringProperty(
    name="S08",
    description="Custom slot name 08",
    default="S08"
  )
  s08_value: FloatProperty(
    name="S08",
    description="Custom slot value 08"
  )
  
  s09_name: StringProperty(
    name="S09",
    description="Custom slot name 09",
    default="S09"
  )
  s09_value: FloatProperty(
    name="S09",
    description="Custom slot value 09"
  )
  
  s10_name: StringProperty(
    name="S10",
    description="Custom slot name 10",
    default="S10"
  )
  s10_value: FloatProperty(
    name="S10",
    description="Custom slot value 10"
  )
  
  s11_name: StringProperty(
    name="S11",
    description="Custom slot name 11",
    default="S11"
  )
  s11_value: FloatProperty(
    name="S11",
    description="Custom slot value 11"
  )
  
  s12_name: StringProperty(
    name="S12",
    description="Custom slot name 12",
    default="S12"
  )
  s12_value: FloatProperty(
    name="S12",
    description="Custom slot value 12"
  )
  
  s13_name: StringProperty(
    name="S13",
    description="Custom slot name 13",
    default="S13"
  )
  s13_value: FloatProperty(
    name="S13",
    description="Custom slot value 13"
  )
  
  s14_name: StringProperty(
    name="S14",
    description="Custom slot name 14",
    default="S14"
  )
  s14_value: FloatProperty(
    name="S14",
    description="Custom slot value 14"
  )
  
  s15_name: StringProperty(
    name="S15",
    description="Custom slot name 15",
    default="S15"
  )
  s15_value: FloatProperty(
    name="S15",
    description="Custom slot value 15"
  )

  s0_texture: StringProperty(
    name="S0 Texture",
    description="Custom texture slot 0",
    default="",
    subtype='FILE_PATH'
  )
  s1_texture: StringProperty(
    name="S1 Texture",
    description="Custom texture slot 1",
    default="",
    subtype='FILE_PATH'
  )


# Blender stuff
def register():
  # Export
  bpy.utils.register_class(WARME_OT_export_jwm)
  bpy.utils.register_class(WARME_OT_export_bwm)
  bpy.utils.register_class(WARME_OT_export_jnm)
  bpy.utils.register_class(WARME_OT_export_bnm)
  bpy.utils.register_class(WARME_OT_export_jsm)
  bpy.utils.register_class(WARME_OT_export_bsm)
  bpy.utils.register_class(WARME_OT_export_jam)
  bpy.utils.register_class(WARME_OT_export_bam)
  bpy.utils.register_class(WARME_OT_export_jlm)
  bpy.utils.register_class(WARME_OT_export_blm)
  bpy.utils.register_class(WARME_OT_export_jsv)
  bpy.utils.register_class(WARME_OT_export_bsv)
  bpy.utils.register_class(WARME_OT_export_jlt)
  bpy.utils.register_class(WARME_OT_export_grf)
  bpy.utils.register_class(WARME_OT_export_any)
  bpy.utils.register_class(WARME_OT_pack)
  bpy.utils.register_class(WARME_OT_copy_camera_matrix)
  bpy.utils.register_class(WARME_OT_copy_object_position) 
  bpy.utils.register_class(WARME_OT_copy_object_rotation)
  bpy.utils.register_class(WARME_OT_add_animation)
  bpy.utils.register_class(WARME_OT_remove_animation)  
  bpy.utils.register_class(WARME_PT_options)
  # Export Types
  bpy.utils.register_class(JamAnimation)
  bpy.types.Object.jam_animations = bpy.props.CollectionProperty(type=JamAnimation)

  # Material
  bpy.utils.register_class(WARME_OT_export_mat)
  bpy.utils.register_class(WARME_OT_material_add_animation)
  bpy.utils.register_class(WARME_OT_material_remove_animation)
  bpy.utils.register_class(WARME_PT_material)
  # Material Types
  bpy.utils.register_class(MaterialAnimation)
  bpy.types.Object.material_animations = bpy.props.CollectionProperty(type=MaterialAnimation)
  bpy.utils.register_class(WARME_PG_MatProperties)
  bpy.types.Object.mat_properties = bpy.props.PointerProperty(type=WARME_PG_MatProperties)


def unregister():
  bpy.utils.unregister_class(WARME_OT_export_jwm)
  bpy.utils.unregister_class(WARME_OT_export_jnm)
  bpy.utils.unregister_class(WARME_OT_export_jsm)
  bpy.utils.unregister_class(WARME_OT_export_jam)
  bpy.utils.unregister_class(WARME_OT_export_jlm)
  bpy.utils.unregister_class(WARME_OT_copy_camera_matrix)   
  bpy.utils.unregister_class(WARME_OT_copy_object_position)
  bpy.utils.unregister_class(WARME_OT_copy_object_rotation)
  bpy.utils.unregister_class(WARME_PT_options)
  bpy.utils.unregister_class(WARME_PT_material)
  bpy.utils.unregister_class(WARME_OT_add_animation)
  bpy.utils.unregister_class(WARME_OT_remove_animation)
  bpy.utils.unregister_class(JamAnimation)

if __name__ == "__main__":
  register()


# ----------------------------------------------------------------------------------
# JAM
# ----------------------------------------------------------------------------------
def jam_export(selected_obj):
  # Setup object structure
  obj = {
    "Ident": "JAM",
    "NumVertices": -1,
    "NumFrames": -1,
    "NumAnimations": -1,
    "Frames": [],
    "TextureCoords": [],
    "Animations": []
  }

  # Triangulate selected object
  triangulate_mesh(selected_obj)

  # Fetch selected object
  dg = bpy.context.evaluated_depsgraph_get()

  # Go to start frame
  bpy.context.scene.frame_current = bpy.context.scene.frame_start

  # For each frame
  while bpy.context.scene.frame_current <= bpy.context.scene.frame_end:
    # Get current mesh data
    dg.update()
    obj_eval = selected_obj.evaluated_get(dg)
    mesh = obj_eval.to_mesh()

    # Transform to correct coordinate system
    mesh.transform(bpy.context.object.matrix_world)
    mesh.transform(mathutils.Matrix.Rotation(pi/2, 4, 'X')) 
    mesh.transform(mathutils.Matrix.Rotation(pi, 4, 'Z')) 

    vertices = []
    normals = [] 

    # Vertices, Normals
    for tri in mesh.polygons:
      if len(tri.loop_indices) != 3: raise NameError('Object not triangulate !')
      for li in tri.loop_indices:
        vert = mesh.vertices[mesh.loops[li].vertex_index]
        for i in range(0, 3):
          vertices.append(round(vert.co[i], 4))
          normals.append(round(vert.normal[i], 4))
        #endfor
      #endfor
    #endfor

    # Append to obj
    obj["Frames"].append({"Vertices": vertices, "Normals": normals})
    bpy.context.scene.frame_current += 1
  #endwhile

  depsgraph = bpy.context.evaluated_depsgraph_get()
  depsgraph.update()
  obj_eval = selected_obj.evaluated_get(depsgraph)
  mesh = obj_eval.data

  # TextureCoords
  for tri in mesh.polygons:
    for li in tri.loop_indices:
      obj["TextureCoords"].append(round(mesh.uv_layers.active.data[li].uv[0], 4))
      obj["TextureCoords"].append(1 - round(mesh.uv_layers.active.data[li].uv[1], 4))
    #endfor
  #endfor

  # Animations
  for anim in selected_obj.jam_animations:
    obj["Animations"].append({ "Name": anim.name, "StartFrame": anim.start_frame, "EndFrame": anim.end_frame, "FrameDuration": anim.frame_duration })
  #endfor

  obj["NumVertices"] = int(len(obj["Frames"][0]["Vertices"]) / 3)
  obj["NumFrames"] = len(obj["Frames"])
  obj["NumAnimations"] = len(obj["Animations"])

  # Destriangulate selected object
  destriangulate_mesh(selected_obj)
  return obj


# export to json file
def jam_export_json(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'jam')
  data = jam_export(selected_obj)

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# export to binary file
def jam_export_binary(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'bam')
  data = jam_export(selected_obj)

  with open(file, "wb") as f:
    header = struct.pack('<3i', data["NumVertices"], data["NumFrames"], data["NumAnimations"])
    f.write(header)

    for uv in data["TextureCoords"]:
      buf = struct.pack('<f', uv)
      f.write(buf)
    #endfor

    for frame in data["Frames"]:
      for vert in frame["Vertices"]:
        buf = struct.pack('<f', vert)
        f.write(buf)
      #endfor

      for norm in frame["Normals"]:
        buf = struct.pack('<f', norm)
        f.write(buf)
      #endfor
    #endfor

    for animation in data["Animations"]:
      namelen = struct.pack('<i', len(animation["Name"]))
      f.write(namelen)

      for char in animation["Name"]:
        c = struct.pack('<i', ord(char))
        f.write(c)
      #endfor

      buf = struct.pack('<3i', animation["StartFrame"], animation["EndFrame"], animation["FrameDuration"])
      f.write(buf)
    #endfor
  #endwith


# ----------------------------------------------------------------------------------
# JWM
# ----------------------------------------------------------------------------------
def jwm_export(selected_obj):
  obj = {
    "Ident": "JWM",
    "NumSectors": -1,
    "NumSectorColors": -1,
    "Min": [],
    "Max": [],
    "Sectors": [],
    "SectorColors": [],
    "NeighborPool": [],
    "SharedPool": []
  }

  # Triangulate selected object
  triangulate_mesh(selected_obj)

  # Fetch selected object
  dg = bpy.context.evaluated_depsgraph_get()

  # Get current mesh data
  dg.update()
  obj_eval = selected_obj.evaluated_get(dg)
  mesh = obj_eval.to_mesh()

  # Transform to correct coordinate system
  mesh.transform(bpy.context.object.matrix_world)
  mesh.transform(mathutils.Matrix.Rotation(pi/2, 4, 'X')) 
  mesh.transform(mathutils.Matrix.Rotation(pi, 4, 'Z')) 

  # Minimum and maximum base
  minimum = [INFINITY, INFINITY, INFINITY]
  maximum = [-INFINITY, -INFINITY, -INFINITY]

  # Sectors, SectorColors
  for tri in mesh.polygons:
    if len(tri.loop_indices) != 3: raise NameError('Object not triangulate !')
    sec = []
    col = []

    for li in tri.loop_indices:
      secVertex = []
      secVertexColor = []

      if (len(mesh.vertex_colors) > 0):
        for i in range(0, 3):
          secVertexColor.append(mesh.vertex_colors[0].data[li].color[i])
        #endfor
      #endif

      vert = mesh.vertices[mesh.loops[li].vertex_index]
      for i in range(0, 3):
        v = round(vert.co[i], 4)
        minimum[i] = min(v, minimum[i])
        maximum[i] = max(v, maximum[i])
        secVertex.append(v)
      #endfor

      if (len(secVertex) > 0): sec.append(secVertex)
      if (len(secVertexColor) > 0): col.append(secVertexColor)
    #endfor

    if (len(sec) > 0): obj["Sectors"].append(sec)
    if (len(col) > 0): obj["SectorColors"].append(col[0] if (col[0] == col[1] and col[0] == col[2]) else [0.0, 0.0, 0.0])
  #endfor

  # NeighborPool, SharedPool
  for i in range(len(obj["Sectors"])):
    neighbors = [-1, -1, -1]
    shared = [i]

    for j in range(3):
      p1 = obj["Sectors"][i][j]
      p2 = obj["Sectors"][i][(j + 1) % 3]

      for k in range(len(obj["Sectors"])):
        if obj["Sectors"][k] == obj["Sectors"][i]: continue
        for l in range(3):
          p1prime = obj["Sectors"][k][l]
          p2prime = obj["Sectors"][k][(l + 1) % 3]
          neighbor_test1 = p1 == p1prime and p2 == p2prime
          neighbor_test2 = p1 == p2prime and p2 == p1prime
          if neighbor_test1 or neighbor_test2: neighbors[j] = k
          if p1 == p1prime and not k in shared: shared.append(k)
        #endfor
      #endfor
    #endfor

    obj["NeighborPool"].append(neighbors)
    obj["SharedPool"].append(shared)
  #endfor

  # NumSectors, NumSectorColors, Min, Max
  obj["NumSectors"] = len(obj["Sectors"]);
  obj["NumSectorColors"] = len(obj["SectorColors"])
  obj["Min"] = [minimum[0], minimum[2]]
  obj["Max"] = [maximum[0], maximum[2]]

  # Destriangulate selected object
  destriangulate_mesh(selected_obj)

  return obj


# export to json file
def jwm_export_json(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'jwm')
  data = jwm_export(selected_obj)

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# export to binary file
def jwm_export_binary(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'bwm')
  data = jwm_export(selected_obj)

  with open(file, "wb") as f:
    header = struct.pack('<2f', data["NumSectors"], data["NumSectorColors"])
    f.write(header)

    min = struct.pack('<2f', data["Min"][0], data["Min"][1])
    f.write(min)

    max = struct.pack('<2f', data["Max"][0], data["Max"][1])
    f.write(max)

    for sec in data["Sectors"]:
      for i in range(0, 3):
        buf = struct.pack('<3f', sec[i][0], sec[i][1], sec[i][2])
        f.write(buf)
      #endfor
    #endfor

    for col in data["SectorColors"]:
      buf = struct.pack('<3f', col[0], col[1], col[2])
      f.write(buf)
    #endfor

    for neighbor in data["NeighborPool"]:
      buf = struct.pack('<3f', neighbor[0], neighbor[1], neighbor[2])
      f.write(buf)
    #endfor

    for shared in data["SharedPool"]:
      buf = struct.pack('<f', len(shared))
      f.write(buf);
      for index in shared:
        buf = struct.pack('<f', index)
        f.write(buf)
      #endfor
    #endfor
  #endwith


# ----------------------------------------------------------------------------------
# JNM
# ----------------------------------------------------------------------------------
def jnm_export(selected_obj):
  obj = {
    "Ident": "JNM",
    "NumFrags": -1,
    "NumFragColors": -1,
    "Min": [],
    "Max": [],
    "Frags": [],
    "FragColors": []
  }

  # Triangulate selected object
  triangulate_mesh(selected_obj)

  # Fetch selected object
  dg = bpy.context.evaluated_depsgraph_get()

  # Get current mesh data
  dg.update()
  obj_eval = selected_obj.evaluated_get(dg)
  mesh = obj_eval.to_mesh()

  # Transform to correct coordinate system
  mesh.transform(bpy.context.object.matrix_world)
  mesh.transform(mathutils.Matrix.Rotation(pi/2, 4, 'X')) 
  mesh.transform(mathutils.Matrix.Rotation(pi, 4, 'Z')) 

  # Minimum and maximum base
  minimum = [INFINITY, INFINITY, INFINITY]
  maximum = [-INFINITY, -INFINITY, -INFINITY]

  # Frags, FragColors
  for tri in mesh.polygons:
    if len(tri.loop_indices) != 3: raise NameError('Object not triangulate !')
    frag = []
    fcol = []

    for li in tri.loop_indices:
      fragVertex = []
      fragVertexColor = []

      if (len(mesh.vertex_colors) > 0):
        for i in range(0, 3):
          fragVertexColor.append(mesh.vertex_colors[0].data[li].color[i])
        #endfor
      #endif

      vert = mesh.vertices[mesh.loops[li].vertex_index]
      for i in range(0, 3):
        v = round(vert.co[i], 4)
        minimum[i] = min(v, minimum[i])
        maximum[i] = max(v, maximum[i])
        fragVertex.append(v)
      #endfor

      if (len(fragVertex) > 0): frag.append(fragVertex)
      if (len(fragVertexColor) > 0): fcol.append(fragVertexColor)
    #endfor

    if (len(frag) > 0): obj["Frags"].append(frag)
    if (len(fcol) > 0): obj["FragColors"].append(fcol[0] if (fcol[0] == fcol[1] and fcol[0] == fcol[2]) else [0.0, 0.0, 0.0])
  #endfor

  # NumFrags, NumFragColors, Min, Max
  obj["NumFrags"] = len(obj["Frags"])
  obj["NumFragColors"] = len(obj["FragColors"])
  obj["Min"] = minimum
  obj["Max"] = maximum

  # Destriangulate selected object
  destriangulate_mesh(selected_obj)

  return obj


# export to json file
def jnm_export_json(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'jnm')
  data = jnm_export(selected_obj)

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# export to binary file
def jnm_export_binary(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'bnm')
  data = jnm_export(selected_obj)

  with open(file, "wb") as f:
    header = struct.pack('<2f', data["NumFrags"], data["NumFragColors"])
    f.write(header)

    min = struct.pack('<3f', data["Min"][0], data["Min"][1], data["Min"][2])
    f.write(min)

    max = struct.pack('<3f', data["Max"][0], data["Max"][1], data["Max"][2])
    f.write(max)

    for frag in data["Frags"]:
      for i in range(0, 3):
        buf = struct.pack('<3f', frag[i][0], frag[i][1], frag[i][2])
        f.write(buf)
      #endfor
    #endfor

    for col in data["FragColors"]:
      buf = struct.pack('<3f', col[0], col[1], col[2])
      f.write(buf)
    #endfor
  #endwith


# ----------------------------------------------------------------------------------
# JSM
# ----------------------------------------------------------------------------------
def jsm_export(selected_obj):
  obj = {
    "Ident": "JSM",
    "NumVertices": -1,
    "Vertices": [],
    "Colors": [],
    "Normals": [],
    "TextureCoords": []
  }

  # Triangulate selected object
  triangulate_mesh(selected_obj)

  # Fetch selected object
  dg = bpy.context.evaluated_depsgraph_get()

  # Get current mesh data
  dg.update()
  obj_eval = selected_obj.evaluated_get(dg)
  mesh = obj_eval.to_mesh()

  # Transform to correct coordinate system
  mesh.transform(bpy.context.object.matrix_world)
  mesh.transform(mathutils.Matrix.Rotation(pi/2, 4, 'X')) 
  mesh.transform(mathutils.Matrix.Rotation(pi, 4, 'Z')) 

  # Vertices, Normals, Colors
  for tri in mesh.polygons:
    if len(tri.loop_indices) != 3: raise NameError('Object not triangulate !')
    for li in tri.loop_indices:
      if (len(mesh.vertex_colors) > 0):
        color = mesh.vertex_colors[0].data[li].color
        for i in range(0, 3):
          obj["Colors"].append(round(color[i], 4))
        #endfor
      #endif

      vert = mesh.vertices[mesh.loops[li].vertex_index]
      for i in range(0, 3):
        obj["Vertices"].append(round(vert.co[i], 4))
        obj["Normals"].append(round(vert.normal[i], 4))
      #endfor
    #endfor
  #endfor

  # TextureCoords
  for tri in mesh.polygons:
    for li in tri.loop_indices:
      obj["TextureCoords"].append(round(mesh.uv_layers.active.data[li].uv[0], 4))
      obj["TextureCoords"].append(1 - round(mesh.uv_layers.active.data[li].uv[1], 4))
    #endfor
  #endfor

  # NumVertices, NumTextureCoords, NumNormals, NumColors
  obj["NumVertices"] = int(len(obj["Vertices"]) / 3)
  obj["NumTextureCoords"] = int(len(obj["TextureCoords"]) / 2)
  obj["NumNormals"] = int(len(obj["Normals"]) / 3)
  obj["NumColors"] = int(len(obj["Colors"]) / 3)

  # Destriangulate selected object
  destriangulate_mesh(selected_obj)

  return obj


# export to json file
def jsm_export_json(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'jsm')
  data = jsm_export(selected_obj)

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# export to binary file
def jsm_export_binary(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'bsm')
  data = jsm_export(selected_obj)

  with open(file, "wb") as f:
    header = struct.pack('<4i', data["NumVertices"], data["NumTextureCoords"], data["NumNormals"], data["NumColors"])
    f.write(header)

    for vert in data["Vertices"]:
      buf = struct.pack('<f', vert)
      f.write(buf)
    #endfor

    for uv in data["TextureCoords"]:
      buf = struct.pack('<f', uv)
      f.write(buf)
    #endfor

    for normal in data["Normals"]:
      buf = struct.pack('<f', normal)
      f.write(buf)
    #endfor

    for color in data["Colors"]:
      buf = struct.pack('<f', color)
      f.write(buf)
    #endfor
  #endwith


# ----------------------------------------------------------------------------------
# JLM
# ----------------------------------------------------------------------------------
def jlm_export(selected_obj):
  obj = {
    "Ident": "JLM",
    "NumPoints": -1,
    "Points": []
  }

  # Fetch selected object
  dg = bpy.context.evaluated_depsgraph_get()

  # Get current mesh data
  dg.update()
  obj_eval = selected_obj.evaluated_get(dg)
  mesh = obj_eval.to_mesh()

  # Transform to correct coordinate system
  mesh.transform(bpy.context.object.matrix_world)
  mesh.transform(mathutils.Matrix.Rotation(pi/2, 4, 'X')) 
  mesh.transform(mathutils.Matrix.Rotation(pi, 4, 'Z')) 

  for vertex in mesh.vertices:
    obj["Points"].append([
      vertex.co.x,
      vertex.co.z,
      vertex.co.y
    ])
  #endfor

  obj["NumPoints"] = len(obj["Points"])
  return obj


# export to json file
def jlm_export_json(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'jlm')
  data = jlm_export(selected_obj)

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# export to binary file
def jlm_export_binary(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'blm')
  data = jlm_export(selected_obj)

  with open(file, "wb") as f:
    for vert in data["Points"]:
      buf = struct.pack('<3f', vert[0], vert[1], vert[2])
      f.write(buf)
    #endfor
  #endwith


# ----------------------------------------------------------------------------------
# JSV
# ----------------------------------------------------------------------------------
def jsv_export(selected_obj):
  obj = {
    "Ident": "JSV",
    "NumVertices": -1,
    "Vertices": [],
    "Colors": []
  }

  # Triangulate selected object
  triangulate_mesh(selected_obj)

  # Fetch selected object
  dg = bpy.context.evaluated_depsgraph_get()

  # Get current mesh data
  dg.update()
  obj_eval = selected_obj.evaluated_get(dg)
  mesh = obj_eval.to_mesh()

  # Transform to correct coordinate system
  mesh.transform(bpy.context.object.matrix_world)
  mesh.transform(mathutils.Matrix.Rotation(pi/2, 4, 'X')) 
  mesh.transform(mathutils.Matrix.Rotation(pi, 4, 'Z'))

  # Vertices, Colors
  for tri in mesh.polygons:
    if len(tri.loop_indices) != 3: raise NameError('Object not triangulate !')
    for li in tri.loop_indices:
      if (len(mesh.vertex_colors) == 0): raise NameError('Object is not colored !')
      color = mesh.vertex_colors[0].data[li].color
      vert = mesh.vertices[mesh.loops[li].vertex_index]

      for i in range(0, 3):
        obj["Vertices"].append(round(vert.co[i], 4))
        obj["Colors"].append(round(color[i], 4))
      #endfor
    #endfor
  #endfor

  # NumVertices
  obj["NumVertices"] = int(len(obj["Vertices"]) / 3)

  # Destriangulate selected object
  destriangulate_mesh(selected_obj)

  return obj


# export to json file
def jsv_export_json(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'jsv')
  data = jsv_export(selected_obj)

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# export to binary file
def jsv_export_binary(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'bsv')
  data = jsv_export(selected_obj)

  with open(file, "wb") as f:
    header = struct.pack('<i', data["NumVertices"])
    f.write(header)

    for vert in data["Vertices"]:
      buf = struct.pack('<f', vert)
      f.write(buf)
    #endfor

    for color in data["Colors"]:
      buf = struct.pack('<f', color)
      f.write(buf)
    #endfor
  #endwith


# ----------------------------------------------------------------------------------
# JLT
# ----------------------------------------------------------------------------------
def jlt_export(selected_obj):
  obj = {
    "Ident": "JLT",
    "Type": "POINT",
    "Position": [],
    "DiffuseColor": [],
    "SpecularColor": [],
    "Intensity": -1,
    "Constant": 1,
    "Linear": 0,
    "Exp": 0,
    "Radius": -1,
    "MeshID": 0,
    "Cutoff": 0,
    "Direction": [0, -1, 0]    
  }

  # Check for valid object
  if (selected_obj.type != 'LIGHT'): raise NameError('Object is not a light')

  # Check for valid light and fill the type
  if selected_obj.data.type == 'POINT': obj["Type"] = "POINT"
  elif selected_obj.data.type == 'SPOT': obj["Type"] = "SPOT"
  else: raise NameError('Object is not a valid light')

  diffuseColor = selected_obj.data.color * selected_obj.data.diffuse_factor
  specularColor = selected_obj.data.color * selected_obj.data.specular_factor

  # Fill json object
  obj["Position"] = [-selected_obj.location.x, selected_obj.location.z, selected_obj.location.y];
  obj["DiffuseColor"] = [diffuseColor.r, diffuseColor.g, diffuseColor.b]
  obj["SpecularColor"] = [specularColor.r, specularColor.g, specularColor.b]
  obj["Intensity"] = selected_obj.data.energy
  obj["Constant"] = selected_obj.data.constant_coefficient
  obj["Linear"] = selected_obj.data.linear_attenuation
  obj["Exp"] = selected_obj.data.linear_coefficient
  obj["Radius"] = selected_obj.data.shadow_soft_size

  if (obj["Type"] == "SPOT"):
    obj["Cutoff"] = selected_obj.data.spot_size
  #endif

  # Fill json custom props
  for k, v in selected_obj.items():
    obj[k] = v
  #endfor
  return obj


# export to json file
def jlt_export_json(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'jlt')
  data = jlt_export(selected_obj)

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# ----------------------------------------------------------------------------------
# GRF
# ----------------------------------------------------------------------------------
def grf_export(selected_obj):
  obj = {
    "Ident": "GRF",
    "Nodes": {},
    "Groups": {}
  }

  # Triangulate selected object
  triangulate_mesh(selected_obj)

  # Fetch mesh data
  bm = bmesh.new()
  bm.from_mesh(selected_obj.data)

  # create vertex group lookup dictionary for names
  vgroup_names = {vgroup.index: vgroup.name for vgroup in selected_obj.vertex_groups}

  # create dictionary of vertex group assignments per vertex
  vgroups = {v.index: [vgroup_names[g.group] for g in v.groups] for v in selected_obj.data.vertices}

  # build the graph
  for vert in bm.verts:
    obj["Nodes"][vert.index] = {}
    obj["Nodes"][vert.index]["Pos"] = [-vert.co.x, vert.co.z, vert.co.y]
    obj["Nodes"][vert.index]["G"] = 0
    obj["Nodes"][vert.index]["H"] = 0
    obj["Nodes"][vert.index]["F"] = 0
    obj["Nodes"][vert.index]["Children"] = []

    for e in vert.link_edges:
      v_other = e.other_vert(vert)
      if (v_other.index in obj["Nodes"] and 'NOBACK' in vgroups[vert.index]): continue
      obj['Nodes'][vert.index]['Children'].append(v_other.index)
    #endfor
  #endfor

  # fill groups
  obj["Groups"] = vgroups

  # Destriangulate selected object
  destriangulate_mesh(selected_obj)

  return obj


# export to json file
def grf_export_json(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'grf')
  data = grf_export(selected_obj)

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# ----------------------------------------------------------------------------------
# ANY
# ----------------------------------------------------------------------------------
def any_export(selected_obj):
  obj = {
    "Ident": "ANY",
    "Name": "",
    "Type": "",
    "Position": [],
    "Rotation": [],
    "Scale": [],
    "Width": -1,
    "Height": -1,
    "Depth": -1
  }

  pos = selected_obj.matrix_world.to_translation();
  rot = selected_obj.matrix_world.to_euler('YXZ');
  sca = selected_obj.scale

  # Fill json object
  obj["Name"] = selected_obj.name
  obj["Type"] = selected_obj.name.split('.')[0]
  obj["Position"] = [-pos.x, pos.z, pos.y]
  obj["Rotation"] = [rot.x, -rot.z, rot.y]
  obj["Scale"] = [sca.x, sca.z, sca.y]
  obj["Width"] = selected_obj.dimensions.x
  obj["Height"] = selected_obj.dimensions.z
  obj["Depth"] = selected_obj.dimensions.y

  # Fill json custom props
  for k, v in selected_obj.items():
    obj[k] = v
  #endfor
  return obj


# export to json file
def any_export_json(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'any')
  data = any_export(selected_obj)

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# ----------------------------------------------------------------------------------
# MAT
# ----------------------------------------------------------------------------------
def mat_export(selected_obj):
  obj = {
    "Ident": "MAT",
    "Animations": [],
    "SParams": []
  }

  ambient = selected_obj.mat_properties.ambient
  diffuse = selected_obj.mat_properties.diffuse
  specular = selected_obj.mat_properties.specular
  emissive = selected_obj.mat_properties.emissive
  toon_light_dir = selected_obj.mat_properties.toon_light_dir

  # Fill json object
  obj["Id"] = selected_obj.mat_properties.id;
  obj["Opacity"] = selected_obj.mat_properties.opacity
  obj["NormalIntensity"] = selected_obj.mat_properties.normal_intensity
  obj["Lightning"] = selected_obj.mat_properties.lightning
  obj["Ambient"] = [ambient.r, ambient.g, ambient.b]
  obj["Diffuse"] = [diffuse.r, diffuse.g, diffuse.b]
  obj["Specular"] = [specular.r, specular.g, specular.b]
  obj["Emissive"] = [emissive.r, emissive.g, emissive.b]

  obj["Texture"] = bpy.path.basename(selected_obj.mat_properties.texture)
  obj["TextureScrollAngle"] = selected_obj.mat_properties.texture_scroll_angle
  obj["TextureScrollRate"] = selected_obj.mat_properties.texture_scroll_rate

  obj["DisplacementMap"] = bpy.path.basename(selected_obj.mat_properties.displacement_map)
  obj["DisplacementMapScrollAngle"] = selected_obj.mat_properties.displacement_map_scroll_angle
  obj["DisplacementMapScrollRate"] = selected_obj.mat_properties.displacement_map_scroll_rate
  obj["DisplacementMapFactor"] = selected_obj.mat_properties.displacement_map_factor
  obj["ToonLightDir"] = [toon_light_dir.x, toon_light_dir.y, toon_light_dir.z]

  obj["DiffuseMap"] = bpy.path.basename(selected_obj.mat_properties.diffuse_map)
  obj["SpecularMap"] = bpy.path.basename(selected_obj.mat_properties.specular_map)
  obj["EmissiveMap"] = bpy.path.basename(selected_obj.mat_properties.emissive_map)
  obj["NormalMap"] = bpy.path.basename(selected_obj.mat_properties.normal_map)
  obj["EnvMap"] = bpy.path.basename(selected_obj.mat_properties.env_map)
  obj["ToonMap"] = bpy.path.basename(selected_obj.mat_properties.toon_map)

  obj["DecalEnabled"] = selected_obj.mat_properties.decal_enabled_flag
  obj["ShadowEnabled"] = selected_obj.mat_properties.shadow_enabled_flag
  obj["Shininess"] = selected_obj.mat_properties.shininess
  obj["EmissiveFactor"] = selected_obj.mat_properties.emissive_factor
  obj["ToonBlending"] = selected_obj.mat_properties.toon_blending
  obj["FacingAlphaBlend"] = selected_obj.mat_properties.facing_alpha_blend

  # Animations
  for anim in selected_obj.material_animations:
    obj["Animations"].append({ "Name": anim.name, "Frames": anim.frames, "FrameDuration": anim.frame_duration })
  #endfor

  obj["SParams"].append({ "Name": selected_obj.mat_properties.s00_name, "Value": selected_obj.mat_properties.s00_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s01_name, "Value": selected_obj.mat_properties.s01_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s02_name, "Value": selected_obj.mat_properties.s02_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s03_name, "Value": selected_obj.mat_properties.s03_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s04_name, "Value": selected_obj.mat_properties.s04_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s05_name, "Value": selected_obj.mat_properties.s05_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s06_name, "Value": selected_obj.mat_properties.s06_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s07_name, "Value": selected_obj.mat_properties.s07_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s08_name, "Value": selected_obj.mat_properties.s08_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s09_name, "Value": selected_obj.mat_properties.s09_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s10_name, "Value": selected_obj.mat_properties.s10_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s11_name, "Value": selected_obj.mat_properties.s11_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s12_name, "Value": selected_obj.mat_properties.s12_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s13_name, "Value": selected_obj.mat_properties.s13_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s14_name, "Value": selected_obj.mat_properties.s14_value })
  obj["SParams"].append({ "Name": selected_obj.mat_properties.s15_name, "Value": selected_obj.mat_properties.s15_value })

  obj["S0Texture"] = bpy.path.basename(selected_obj.mat_properties.s0_texture)
  obj["S1Texture"] = bpy.path.basename(selected_obj.mat_properties.s1_texture)
  return obj


# export to json file
def mat_export_json(selected_obj, path, filename):
  file = get_available_filename(path, filename, 'mat')
  data = mat_export(selected_obj)

  for key, value in selected_obj.mat_properties.items():
    if key in MATERIAL_FILE_PROPS and value != "":
      shutil.copy(bpy.path.abspath(value), path + bpy.path.basename(value))
    #endif
  #endfor

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# ----------------------------------------------------------------------------------
# PACK
# ----------------------------------------------------------------------------------
def pack(path):
  path_list = []

  for collection in bpy.data.collections:
    if (collection.name == "JAM"):
      for obj in collection.objects:
        jam_export_json(obj, path, obj.name)
        mat_export_json(obj, path, obj.name)
        path_list.append(path + obj.name + '.jam')
        path_list.append(path + obj.name + '.mat')
      #endfor
    #endif

    if (collection.name == "BAM"):
      for obj in collection.objects:
        jam_export_binary(obj, path, obj.name)
        mat_export_json(obj, path, obj.name)
        path_list.append(path + obj.name + '.bam')
        path_list.append(path + obj.name + '.mat')
      #endfor
    #endif

    if (collection.name == "JSM"):
      for obj in collection.objects:
        jsm_export_json(obj, path, obj.name)
        mat_export_json(obj, path, obj.name)
        path_list.append(path + obj.name + '.jsm')
        path_list.append(path + obj.name + '.mat')
      #endfor
    #endif

    if (collection.name == "BSM"):
      for obj in collection.objects:
        jsm_export_binary(obj, path, obj.name)
        mat_export_json(obj, path, obj.name)
        path_list.append(path + obj.name + '.bsm')
        path_list.append(path + obj.name + '.mat')
      #endfor
    #endif

    if (collection.name == "JWM"):
      for obj in collection.objects:
        jwm_export_json(obj, path, obj.name)
        path_list.append(path + obj.name + '.jwm')
      #endfor
    #endif

    if (collection.name == "BWM"):
      for obj in collection.objects:
        jwm_export_binary(obj, path, obj.name)
        path_list.append(path + obj.name + '.bwm')
      #endfor
    #endif

    if (collection.name == "JNM"):
      for obj in collection.objects:
        jnm_export_json(obj, path, obj.name)
        path_list.append(path + obj.name + '.jnm')
      #endfor
    #endif

    if (collection.name == "BNM"):
      for obj in collection.objects:
        jnm_export_binary(obj, path, obj.name)
        path_list.append(path + obj.name + '.bnm')
      #endfor
    #endif

    if (collection.name == "JLM"):
      for obj in collection.objects:
        jlm_export_json(obj, path, obj.name)
        path_list.append(path + obj.name + '.jlm')
      #endfor
    #endif

    if (collection.name == "BLM"):
      for obj in collection.objects:
        jlm_export_binary(obj, path, obj.name)
        path_list.append(path + obj.name + '.blm')
      #endfor
    #endif

    if (collection.name == "JSV"):
      for obj in collection.objects:
        jsv_export_json(obj, path, obj.name)
        path_list.append(path + obj.name + '.jsv')
      #endfor
    #endif

    if (collection.name == "BSV"):
      for obj in collection.objects:
        jsv_export_binary(obj, path, obj.name)
        path_list.append(path + obj.name + '.bsv')
      #endfor
    #endif

    if (collection.name == "JLT"):
      for obj in collection.objects:
        jlt_export_json(obj, path, obj.name)
        path_list.append(path + obj.name + '.jlt')
      #endfor
    #endif

    if (collection.name == "GRF"):
      for obj in collection.objects:
        grf_export_json(obj, path, obj.name)
        path_list.append(path + obj.name + '.grf')
      #endfor
    #endif

    if (collection.name == "ANY"):
      for obj in collection.objects:
        any_export_json(obj, path, obj.name)
        path_list.append(path + obj.name + '.any')
      #endfor
    #endif

    for obj in collection.objects:
      for key, value in obj.mat_properties.items():
        if key in MATERIAL_FILE_PROPS and value != "":
          path_list.append(path + bpy.path.basename(value))
        #endif
      #endfor
    #endfor
  #endfor

  scene_name = os.path.basename(bpy.data.filepath)
  zip_files(path_list, path + scene_name + '.pak')

  for file in path_list:
    os.remove(file)
  #endfor


# ----------------------------------------------------------------------------------
# UTILS
# ----------------------------------------------------------------------------------
# Get file descriptor with text encoding
def get_utf8_file_descriptor(path, filename, extension):
  file = get_available_filename(path, filename, extension)
  with open(file, 'w', encoding='utf-8') as f:
    return f
  #endwith


# Get file descriptor with binary encoding
def get_binary_file_descriptor(path, filename, extension):
  file = get_available_filename(path, filename, extension)
  with open(file, 'wb') as f:
    return f
  #endwith


# Get available filename
def get_available_filename(path, filename, extension):
  if path == "":
    path = bpy.path.abspath("//")
  #endif

  file = Path(path + "/" + filename + "." + extension)
  return file


def zip_files(path_list, output_path):
  with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for file in path_list:
      zipf.write(file, os.path.basename(file))
    #endfor
  #endwith


def triangulate_mesh(obj):
  bpy.context.view_layer.objects.active = obj
  bpy.ops.object.mode_set(mode="EDIT")
  bm = bmesh.from_edit_mesh(obj.data)
  bmesh.ops.triangulate(bm, faces=bm.faces[:])
  bmesh.update_edit_mesh(obj.data)
  bpy.ops.object.mode_set(mode="OBJECT")


def destriangulate_mesh(mesh_obj):
  bpy.context.view_layer.objects.active = mesh_obj
  bpy.ops.object.mode_set(mode="EDIT")
  bpy.ops.mesh.select_all(action="SELECT")
  bpy.ops.mesh.tris_convert_to_quads()
  bpy.ops.object.mode_set(mode="OBJECT")