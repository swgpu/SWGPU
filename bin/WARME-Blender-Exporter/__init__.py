bl_info = {
  "name": "WARME Engine Exporter",
  "author": "matidfk#2272",
  "version": (0, 1, 5),
  "blender": (3, 1, 2),
  "location": "View3D > Properties > WARME Engine Export",
  "description": "Export to a custom warme-engine format",
  "category": "Import-Export"
}

# Imports
import bpy
import subprocess
import json
import mathutils
import struct
import sys
from math import pi
from pathlib import Path

INFINITY = sys.float_info.max

# JAM export operator
class WARME_OT_export_jam(bpy.types.Operator):
  """Export to a JAM format""" 
  bl_idname = "object.export_jam"
  bl_label = "Export to JAM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    jam_export_json(bpy.path.abspath(context.scene.render.filepath), context.object.name)
    return {"FINISHED"}


# BAM export operator
class WARME_OT_export_bam(bpy.types.Operator):
  """Export to a BAM format""" 
  bl_idname = "object.export_bam"
  bl_label = "Export to BAM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    jam_export_binary(bpy.path.abspath(context.scene.render.filepath), context.object.name)
    return {"FINISHED"}


# JSM export operator
class WARME_OT_export_jsm(bpy.types.Operator):
  """Export to a JSM format""" 
  bl_idname = "object.export_jsm"
  bl_label = "Export to JSM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    jsm_export_json(bpy.path.abspath(context.scene.render.filepath), context.object.name)
    return {"FINISHED"}


# BSM export operator
class WARME_OT_export_bsm(bpy.types.Operator):
  """Export to a BSM format""" 
  bl_idname = "object.export_bsm"
  bl_label = "Export to BSM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    jsm_export_binary(bpy.path.abspath(context.scene.render.filepath), context.object.name)
    return {"FINISHED"}


# JWM export operator
class WARME_OT_export_jwm(bpy.types.Operator):
  """Export to a JWM format""" 
  bl_idname = "object.export_jwm"
  bl_label = "Export to JWM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    jwm_export_json(bpy.path.abspath(context.scene.render.filepath), context.object.name)
    return {"FINISHED"}


# BWM export operator
class WARME_OT_export_bwm(bpy.types.Operator):
  """Export to a BWM format""" 
  bl_idname = "object.export_bwm"
  bl_label = "Export to BWM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    jwm_export_binary(bpy.path.abspath(context.scene.render.filepath), context.object.name)
    return {"FINISHED"}


# JNM export operator
class WARME_OT_export_jnm(bpy.types.Operator):
  """Export to a JNM format""" 
  bl_idname = "object.export_jnm"
  bl_label = "Export to JNM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    jnm_export_json(bpy.path.abspath(context.scene.render.filepath), context.object.name)
    return {"FINISHED"}


# BNM export operator
class WARME_OT_export_bnm(bpy.types.Operator):
  """Export to a BNM format""" 
  bl_idname = "object.export_bnm"
  bl_label = "Export to BNM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    jnm_export_binary(bpy.path.abspath(context.scene.render.filepath), context.object.name)
    return {"FINISHED"}


# JLM export operator
class WARME_OT_export_jlm(bpy.types.Operator):
  """Export to a JLM format""" 
  bl_idname = "object.export_jlm"
  bl_label = "Export to JLM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    jlm_export_json(bpy.path.abspath(context.scene.render.filepath), context.object.name)
    return {"FINISHED"}


# BLM export operator
class WARME_OT_export_blm(bpy.types.Operator):
  """Export to a BLM format""" 
  bl_idname = "object.export_blm"
  bl_label = "Export to BLM"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    jlm_export_binary(bpy.path.abspath(context.scene.render.filepath), context.object.name)
    return {"FINISHED"}


# JSV export operator
class WARME_OT_export_jsv(bpy.types.Operator):
  """Export to a JSV format""" 
  bl_idname = "object.export_jsv"
  bl_label = "Export to JSV"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    jsv_export_json(bpy.path.abspath(context.scene.render.filepath), context.object.name)
    return {"FINISHED"}


# BSV export operator
class WARME_OT_export_bsv(bpy.types.Operator):
  """Export to a BSV format""" 
  bl_idname = "object.export_bsv"
  bl_label = "Export to BSV"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    jsv_export_binary(bpy.path.abspath(context.scene.render.filepath), context.object.name)
    return {"FINISHED"}


# JPL export operator
class WARME_OT_export_jpl(bpy.types.Operator):
  """Export to JPL format""" 
  bl_idname = "object.export_jpl"
  bl_label = "Export to JPL"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    jpl_export_json(bpy.path.abspath(context.scene.render.filepath), context.object.name)
    return {"FINISHED"}


# JTR export operator
class WARME_OT_export_jtr(bpy.types.Operator):
  """Export to JTR format""" 
  bl_idname = "object.export_jtr"
  bl_label = "Export to JTR"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    jtr_export_json(bpy.path.abspath(context.scene.render.filepath), context.object.name)
    return {"FINISHED"}


# UI
class WARME_PT_options(bpy.types.Panel):
  bl_idname = "WARME_PT_options"
  bl_label = "WARME Engine Exporter"
  bl_space_type = 'VIEW_3D'
  bl_region_type = 'UI'
  bl_category = "WARME Engine Exporter"
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

    layout.operator("object.export_jpl")
    layout.operator("object.export_jtr")
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
    layout.operator("object.copy_camera_matrix")
    layout.operator("object.copy_object_position")
    layout.operator("object.copy_object_rotation")


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
    copy2clip(f"{matrix[0][0]}, {matrix[0][1]}, {matrix[0][2]}, {matrix[0][3]}, {matrix[1][0]}, {matrix[1][1]}, {matrix[1][2]}, {matrix[1][3]}, {matrix[2][0]}, {matrix[2][1]}, {matrix[2][2]}, {matrix[2][3]}, {matrix[3][0]}, {matrix[3][1]}, {matrix[3][2]}, {matrix[3][3]}");
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
    copy2clip(f"{-pos.x}, {pos.z}, {pos.y}"); # converter x => -x; y => +z; z => +y;
    return {"FINISHED"}


# Copy object rotation operator
class WARME_OT_copy_object_rotation(bpy.types.Operator):
  """Copy object rotation""" 
  bl_idname = "object.copy_object_rotation"
  bl_label = "Copy object rotation to clipboard"
  bl_options = {'REGISTER', 'UNDO_GROUPED'}

  def execute(self, context):
    # Fetch selected object
    rot = bpy.context.object.matrix_world.to_euler('YXZ');
    copy2clip(f"{rot.x}, {-rot.z}, {rot.y}");
    return {"FINISHED"}


# Blender stuff
def register():
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
  bpy.utils.register_class(WARME_OT_export_jpl)
  bpy.utils.register_class(WARME_OT_export_jtr)
  bpy.utils.register_class(WARME_OT_copy_camera_matrix)
  bpy.utils.register_class(WARME_OT_copy_object_position) 
  bpy.utils.register_class(WARME_OT_copy_object_rotation)
  bpy.utils.register_class(WARME_PT_options)
  bpy.utils.register_class(WARME_OT_add_animation)
  bpy.utils.register_class(WARME_OT_remove_animation)    
  bpy.utils.register_class(JamAnimation)
  bpy.types.Object.jam_animations = bpy.props.CollectionProperty(type=JamAnimation)


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
  bpy.utils.unregister_class(WARME_OT_add_animation)
  bpy.utils.unregister_class(WARME_OT_remove_animation)
  bpy.utils.unregister_class(JamAnimation)

if __name__ == "__main__":
  register()


# ----------------------------------------------------------------------------------
# JAM
# ----------------------------------------------------------------------------------
def jam_export():
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

  # Fetch selected object
  selected_obj = bpy.context.object
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
  return obj


# export to json file
def jam_export_json(path, filename):
  file = get_available_filename(path, filename, 'jam')
  data = jam_export()

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# export to binary file
def jam_export_binary(path, filename):
  file = get_available_filename(path, filename, 'bam')
  data = jam_export()

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
def jwm_export():
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

  # Fetch selected object
  selected_obj = bpy.context.object
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
  return obj


# export to json file
def jwm_export_json(path, filename):
  file = get_available_filename(path, filename, 'jwm')
  data = jwm_export()

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# export to binary file
def jwm_export_binary(path, filename):
  file = get_available_filename(path, filename, 'bwm')
  data = jwm_export()

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
def jnm_export():
  obj = {
    "Ident": "JNM",
    "NumFrags": -1,
    "NumFragColors": -1,
    "Min": [],
    "Max": [],
    "Frags": [],
    "FragColors": []
  }

  # Fetch selected object
  selected_obj = bpy.context.object
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
  return obj


# export to json file
def jnm_export_json(path, filename):
  file = get_available_filename(path, filename, 'jnm')
  data = jnm_export()

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# export to binary file
def jnm_export_binary(path, filename):
  file = get_available_filename(path, filename, 'bnm')
  data = jnm_export()

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
def jsm_export():
  obj = {
    "Ident": "JSM",
    "NumVertices": -1,
    "Vertices": [],
    "Colors": [],
    "Normals": [],
    "TextureCoords": []
  }

  # Fetch selected object
  selected_obj = bpy.context.object
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
  return obj


# export to json file
def jsm_export_json(path, filename):
  file = get_available_filename(path, filename, 'jsm')
  data = jsm_export()

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# export to binary file
def jsm_export_binary(path, filename):
  file = get_available_filename(path, filename, 'bsm')
  data = jsm_export()

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
def jlm_export():
  obj = {
    "Ident": "JLM",
    "NumPoints": -1,
    "Points": []
  }

  # Fetch selected object
  selected_obj = bpy.context.object
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
def jlm_export_json(path, filename):
  file = get_available_filename(path, filename, 'jlm')
  data = jlm_export()

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# export to binary file
def jlm_export_binary(path, filename):
  file = get_available_filename(path, filename, 'blm')
  data = jlm_export()

  with open(file, "wb") as f:
    for vert in data["Points"]:
      buf = struct.pack('<3f', vert[0], vert[1], vert[2])
      f.write(buf)
    #endfor
  #endwith


# ----------------------------------------------------------------------------------
# JSV
# ----------------------------------------------------------------------------------
def jsv_export():
  obj = {
    "Ident": "JSV",
    "NumVertices": -1,
    "Vertices": [],
    "ShadowFactors": []
  }

  # Fetch selected object
  selected_obj = bpy.context.object
  dg = bpy.context.evaluated_depsgraph_get()

  # Get current mesh data
  dg.update()
  obj_eval = selected_obj.evaluated_get(dg)
  mesh = obj_eval.to_mesh()

  # Transform to correct coordinate system
  mesh.transform(bpy.context.object.matrix_world)
  mesh.transform(mathutils.Matrix.Rotation(pi/2, 4, 'X')) 
  mesh.transform(mathutils.Matrix.Rotation(pi, 4, 'Z')) 

  # Vertices, ShadowFactors
  for tri in mesh.polygons:
    if len(tri.loop_indices) != 3: raise NameError('Object not triangulate !')
    for li in tri.loop_indices:
      if (len(mesh.vertex_colors) == 0): raise NameError('Object is not colored !')
      color = mesh.vertex_colors[0].data[li].color
      vert = mesh.vertices[mesh.loops[li].vertex_index]
      obj["ShadowFactors"].append(round(color[2], 4))
      for i in range(0, 3):
        obj["Vertices"].append(round(vert.co[i], 4))
      #endfor
    #endfor
  #endfor

  # NumVertices
  obj["NumVertices"] = int(len(obj["Vertices"]) / 3)
  return obj


# export to json file
def jsv_export_json(path, filename):
  file = get_available_filename(path, filename, 'jsv')
  data = jsv_export()

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# export to binary file
def jsv_export_binary(path, filename):
  file = get_available_filename(path, filename, 'bsv')
  data = jsv_export()

  with open(file, "wb") as f:
    header = struct.pack('<i', data["NumVertices"])
    f.write(header)

    for vert in data["Vertices"]:
      buf = struct.pack('<f', vert)
      f.write(buf)
    #endfor

    for factor in data["ShadowFactors"]:
      buf = struct.pack('<f', factor)
      f.write(buf)
    #endfor
  #endwith


# ----------------------------------------------------------------------------------
# JPL
# ----------------------------------------------------------------------------------
def jpl_export():
  obj = {
    "Ident": "JPL",
    "Position": [],
    "Radius": -1,
    "AmbientColor": [0.3, 0.3, 0.3],
    "DiffuseColor": [],
    "SpecularColor": [],
    "Intensity": -1,
    "MeshID": 0,
    "Constant": 1,
    "Linear": 0,
    "Exp": 0
  }

  # Get world
  scene = bpy.context.scene
  world = scene.world

  # Fetch selected object
  selected_obj = bpy.context.object
  if (selected_obj.type != 'LIGHT' and obj.data.type != 'POINT'): raise NameError('Object is not a point light')

  diffuseColor = selected_obj.data.color * selected_obj.data.diffuse_factor
  specularColor = selected_obj.data.color * selected_obj.data.specular_factor

  # Fill json object
  obj["Position"] = [-selected_obj.location.x, selected_obj.location.z, selected_obj.location.y];
  obj["AmbientColor"] = [world.color.r, world.color.g, world.color.b]
  obj["DiffuseColor"] = [diffuseColor.r, diffuseColor.g, diffuseColor.b]
  obj["SpecularColor"] = [specularColor.r, specularColor.g, specularColor.b]
  obj["Intensity"] = selected_obj.data.energy
  if 'MeshID' in selected_obj.data: obj["MeshID"] = selected_obj.data["MeshID"]
  if 'Constant' in selected_obj.data: obj["Constant"] = selected_obj.data["Constant"]
  if 'Linear' in selected_obj.data: obj["Linear"] = selected_obj.data["Linear"]
  if 'Exp' in selected_obj.data: obj["Exp"] = selected_obj.data["Exp"]
  return obj


# export to json file
def jpl_export_json(path, filename):
  file = get_available_filename(path, filename, 'jpl')
  data = jpl_export()

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


# ----------------------------------------------------------------------------------
# JTR
# ----------------------------------------------------------------------------------
def jtr_export():
  obj = {
    "Ident": "JTR",
    "Type": "",
    "Position": [],
    "Width": -1,
    "Depth": -1,
    "Height": -1,
    "OnEnterBlockId": "",
    "OnLeaveBlockId": "",
    "OnActionBlockId": ""
  }

  # Fetch selected object
  selected_obj = bpy.context.object
  if (selected_obj.type != 'MESH'): raise NameError('Object is not a mesh (target only cylinder)')
  
  # Check the prefix
  if (selected_obj.data.name.startswith('Trigger')): raise NameError('Object name must start by "Trigger"')

  # Fill json object
  obj["Position"] = [-selected_obj.location.x, selected_obj.location.z, selected_obj.location.y]
  obj["Radius"] = selected_obj.dimensions.x * 0.5
  obj["Height"] = selected_obj.dimensions.z
  if 'Type' in selected_obj.data: obj["Type"] = selected_obj.data["Type"]
  if 'OnEnterBlockId' in selected_obj.data: obj["OnEnterBlockId"] = selected_obj.data["OnEnterBlockId"]
  if 'OnLeaveBlockId' in selected_obj.data: obj["OnLeaveBlockId"] = selected_obj.data["OnLeaveBlockId"]
  if 'OnActionBlockId' in selected_obj.data: obj["OnActionBlockId"] = selected_obj.data["OnActionBlockId"]
  return obj


# export to json file
def jtr_export_json(path, filename):
  file = get_available_filename(path, filename, 'jtr')
  data = jtr_export()

  with open(file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
  #endwith


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
  i = 1

  # In order to avoid overwriting files, add _i where i will increment until there is no file named that
  while file.exists():
    file = Path(path + "/" + filename + "_" + str(i) + "." + extension)
    i += 1
  #endwhile
  return file


# copy string to clipboard
def copy2clip(txt):
  cmd='echo '+txt.strip()+'|clip'
  return subprocess.check_call(cmd, shell=True)