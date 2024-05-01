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
import sys
from math import pi
from pathlib import Path

INFINITY = sys.float_info.max

# Copy camera matrix process operator
class JSMJAMEXPORT_OT_copy_camera_matrix(bpy.types.Operator):
    """Copy camera matrix""" 
    bl_idname = "object.copy_camera_matrix"
    bl_label = "Copy camera matrix to clipboard"
    bl_options = {'REGISTER', 'UNDO_GROUPED'}

    def execute(self, context):
        cam = bpy.data.objects['Camera']
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

# Copy object position process operator
class JSMJAMEXPORT_OT_copy_object_position(bpy.types.Operator):
    """Copy object position""" 
    bl_idname = "object.copy_object_position"
    bl_label = "Copy object position to clipboard"
    bl_options = {'REGISTER', 'UNDO_GROUPED'}

    def execute(self, context):
        # Fetch selected object
        pos = bpy.context.object.matrix_world.to_translation();
        copy2clip(f"{-pos.x}, {pos.z}, {pos.y}"); # converter x => -x; y => +z; z => +y;
        return {"FINISHED"}

# Copy object rotation process operator
class JSMJAMEXPORT_OT_copy_object_rotation(bpy.types.Operator):
    """Copy object rotation""" 
    bl_idname = "object.copy_object_rotation"
    bl_label = "Copy object rotation to clipboard"
    bl_options = {'REGISTER', 'UNDO_GROUPED'}

    def execute(self, context):
        # Fetch selected object
        rot = bpy.context.object.matrix_world.to_euler('YXZ');
        copy2clip(f"{rot.x}, {-rot.z}, {rot.y}");
        return {"FINISHED"}

# JAM export operator
class JSMJAMEXPORT_OT_export_jam(bpy.types.Operator):
    """Export to a JAM format""" 
    bl_idname = "object.export_jam"
    bl_label = "Export to JAM"
    bl_options = {'REGISTER', 'UNDO_GROUPED'}

    def execute(self, context):
        data = export_jam()
        if data is not None:
            save_file(data, bpy.path.abspath(context.scene.render.filepath), context.object.name, "jam")
        else:
            self.report({'ERROR'}, "Object is not triangulated")
        return {"FINISHED"}

# JSM export operator
class JSMJAMEXPORT_OT_export_jsm(bpy.types.Operator):
    """Export to a JSM format""" 
    bl_idname = "object.export_jsm"
    bl_label = "Export to JSM"
    bl_options = {'REGISTER', 'UNDO_GROUPED'}

    def execute(self, context):
        data = export_jsm()
        if data is not None:
            save_file(data, bpy.path.abspath(context.scene.render.filepath), context.object.name, "jsm")
        else:
            self.report({'ERROR'}, "Object is not triangulated")
        return {"FINISHED"}
    
    
# JWM export operator
class JSMJAMEXPORT_OT_export_jwm(bpy.types.Operator):
    """Export to a JWM format""" 
    bl_idname = "object.export_jwm"
    bl_label = "Export to JWM"
    bl_options = {'REGISTER', 'UNDO_GROUPED'}

    def execute(self, context):
        data = export_jwm()
        if data is not None:
            save_file(data, bpy.path.abspath(context.scene.render.filepath), context.object.name, "jwm")
        else:
            self.report({'ERROR'}, "Object is not triangulated")
        return {"FINISHED"}

# JNM export operator
class JSMJAMEXPORT_OT_export_jnm(bpy.types.Operator):
    """Export to a JNM format""" 
    bl_idname = "object.export_jnm"
    bl_label = "Export to JNM"
    bl_options = {'REGISTER', 'UNDO_GROUPED'}

    def execute(self, context):
        data = export_jnm()
        if data is not None:
            save_file(data, bpy.path.abspath(context.scene.render.filepath), context.object.name, "jnm")
        else:
            self.report({'ERROR'}, "Object is not triangulated")
        return {"FINISHED"}


# JLM export operator
class JSMJAMEXPORT_OT_export_jlm(bpy.types.Operator):
    """Export to a JLM format""" 
    bl_idname = "object.export_jlm"
    bl_label = "Export to JLM"
    bl_options = {'REGISTER', 'UNDO_GROUPED'}

    def execute(self, context):
        data = export_jlm()
        if data is not None:
            save_file(data, bpy.path.abspath(context.scene.render.filepath), context.object.name, "jlm")
        return {"FINISHED"}


# UI
class JSMJAMEXPORT_PT_options(bpy.types.Panel):
    bl_idname = "JSMJAMEXPORT_PT_options"
    bl_label = "WARME Engine Exporter"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "WARME Engine Exporter"
    bl_context = "objectmode"
    
    def draw(self, context):
        layout = self.layout.column()
        layout.operator("object.export_jwm")
        layout.separator()
        layout.separator()
        layout.operator("object.export_jnm")
        layout.separator()
        layout.separator()
        layout.operator("object.export_jsm")
        layout.separator()
        layout.separator()
        layout.operator("object.export_jam")
        layout.separator()
        layout.operator("object.export_jlm")
        layout.separator()        
        
        # Row for each animation
        for i, anim in enumerate(context.object.jam_animations):
            layout = self.layout.row()
            layout.prop(context.object.jam_animations[i], "name")
            layout.prop(context.object.jam_animations[i], "start_frame")
            layout.prop(context.object.jam_animations[i], "end_frame")
            layout.prop(context.object.jam_animations[i], "frame_duration")
            
        layout = self.layout.column()
        layout.separator()
        
        layout.operator("object.add_animation")
        layout.operator("object.remove_animation")
        layout.operator("object.copy_camera_matrix")
        layout.operator("object.copy_object_position")
        layout.operator("object.copy_object_rotation")


# Add an animation data block operator
class JSMJAMEXPORT_OT_add_animation(bpy.types.Operator):
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
class JSMJAMEXPORT_OT_remove_animation(bpy.types.Operator):
    """Remove last animation""" 
    bl_idname = "object.remove_animation"
    bl_label = "Remove last animation from the current objects list"
    bl_options = {'REGISTER', 'UNDO_GROUPED'}
    
    def execute(self, context):
        context.object.jam_animations.remove(len(bpy.context.object.jam_animations) - 1)
        return {"FINISHED"}


# JSM exporter function
def export_jsm():
    # Setup object structure
    obj = {
        "Ident": "JSM",
        "NumVertices": -1,
        "Vertices": [],
        "Normals": [],
        "TextureCoords": [],
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
    
    # Vertices, Normals
    for tri in mesh.polygons:
        for li in tri.loop_indices:
            # Return error if object is not triangulated
            if len(tri.loop_indices) != 3:
                return None
            
            vert = mesh.vertices[mesh.loops[li].vertex_index]
            for i in range(0, 3):
                obj["Vertices"].append(round(vert.co[i], 4))
                obj["Normals"].append(round(vert.normal[i], 4))
                
    # TextureCoords
    for tri in mesh.polygons:
        for li in tri.loop_indices:
            obj["TextureCoords"].append(round(mesh.uv_layers.active.data[li].uv[0], 4))
            obj["TextureCoords"].append(1 - round(mesh.uv_layers.active.data[li].uv[1], 4))
                
    obj["NumVertices"] = int(len(obj["Vertices"]) / 3)
    return obj


# JAM exporter function
def export_jam():
    # Setup object structure
    obj = {
        "Ident": "JAM",
        "NumVertices": -1,
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
            for li in tri.loop_indices:
                # Return error if object is not triangulated
                if len(tri.loop_indices) != 3:
                    return None
                
                vert = mesh.vertices[mesh.loops[li].vertex_index]
                for i in range(0, 3):
                    vertices.append(round(vert.co[i], 4))
                    normals.append(round(vert.normal[i], 4))
                    
        # Append to obj
        obj["Frames"].append({"Vertices": vertices, "Normals": normals})
        obj["NumVertices"] = int(len(obj["Frames"][0]["Vertices"]) / 3)
        bpy.context.scene.frame_current += 1
        
    depsgraph = bpy.context.evaluated_depsgraph_get()
    depsgraph.update()
    obj_eval = selected_obj.evaluated_get(depsgraph)
    mesh = obj_eval.data

    # TextureCoords
    for tri in mesh.polygons:
        for li in tri.loop_indices:
            obj["TextureCoords"].append(round(mesh.uv_layers.active.data[li].uv[0], 4))
            obj["TextureCoords"].append(1 - round(mesh.uv_layers.active.data[li].uv[1], 4))
                
    # Animations
    for anim in selected_obj.jam_animations:
        obj["Animations"].append({"Name": anim.name,
                                  "StartFrame": anim.start_frame, 
                                  "EndFrame": anim.end_frame,
                                  "FrameDuration": anim.frame_duration})
    return obj


# JWM exporter function
def export_jwm():
    obj = {
        "Ident": "JWM",
        "Min": [],
        "Max": [],
        "Sectors": [],
        "SectorsData": [],
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

    minimum = [INFINITY, INFINITY, INFINITY]
    maximum = [-INFINITY, -INFINITY, -INFINITY]

    for tri in mesh.polygons:
        sector = []
        for i, li in enumerate(tri.loop_indices):
            vert = mesh.vertices[mesh.loops[li].vertex_index]
            trii = []
            for j in range(0, 3):
                v = round(vert.co[j], 4)
                minimum[j] = min(v, minimum[j])
                maximum[j] = max(v, maximum[j])
                trii.append(v)
            sector.append(trii)
        obj["Sectors"].append(sector)

    obj["Min"] = [minimum[0], minimum[2]]
    obj["Max"] = [maximum[0], maximum[2]]

    # Theres probably a better way to do this
    # access pool is shared vertices
    # neighbor pool is shared edges

    for i in range(len(obj["Sectors"])):
        neighbors = [-1,-1,-1]
        shared = [i]
        
        for j in range(3):
            p1 = obj["Sectors"][i][j]
            p2 = obj["Sectors"][i][(j + 1) % 3]
            
            for k in range(len(obj["Sectors"])):
                if obj["Sectors"][k] == obj["Sectors"][i]:
                    continue

                for l in range(3):
                    p1prime = obj["Sectors"][k][l]
                    p2prime = obj["Sectors"][k][(l + 1) % 3]
                    
                    neighbor_test1 = p1 == p1prime and p2 == p2prime
                    neighbor_test2 = p1 == p2prime and p2 == p1prime
                    
                    if neighbor_test1 or neighbor_test2:
                        neighbors[j] = k
            
                    if p1 == p1prime and not k in shared:
                        shared.append(k)

        obj["NeighborPool"].append(neighbors)
        obj["SharedPool"].append(shared)

    return obj


# JNM exporter function
def export_jnm():
    # Setup object structure
    obj = {
        "Ident": "JNM",
        "Min": [],
        "Max": [],
        "Frags": [],
        "FragsData": []
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
    
    minimum = [INFINITY, INFINITY, INFINITY]
    maximum = [-INFINITY, -INFINITY, -INFINITY]

    for tri in mesh.polygons:
        frag = []
        for i, li in enumerate(tri.loop_indices):
            vert = mesh.vertices[mesh.loops[li].vertex_index]
            trii = []
            for j in range(0, 3):
                v = round(vert.co[j], 4)
                minimum[j] = min(v, minimum[j])
                maximum[j] = max(v, maximum[j])
                trii.append(v)
            frag.append(trii)
        obj["Frags"].append(frag)

    obj["Min"] = minimum
    obj["Max"] = maximum
    return obj


# JLM exporter function
def export_jlm():
    # Setup object structure
    obj = {
        "Ident": "JLM",
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
        point = [
            vertex.co.x,
            vertex.co.z,
            vertex.co.y
        ]
        obj["Points"].append(point)

    # for tri in mesh.polygons:
    #     frag = []
    #     for i, li in enumerate(tri.loop_indices):
    #         vert = mesh.vertices[mesh.loops[li].vertex_index]
    #         trii = []
    #         for j in range(0, 3):
    #             v = round(vert.co[j], 4)
    #             trii.append(v)
    #         frag.append(trii)
    #     obj["Points"].append(frag)
    return obj


# Save to file
def save_file(obj, path, filename, extension):
    if path == "":
        path = bpy.path.abspath("//")
    file = Path(path + "/" + filename + "." + extension)
    i = 1
    
    # In order to avoid overwriting files, add _i where i will increment until there is no file named that
    while file.exists():
        file = Path(path + "/" + filename + "_" + str(i) + "." + extension)
        i += 1
    with open(file, 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False)

def copy2clip(txt):
    cmd='echo '+txt.strip()+'|clip'
    return subprocess.check_call(cmd, shell=True)

# Blender class to allow saving jam_animations to objects as a data block
class JamAnimation(bpy.types.PropertyGroup):
    name: bpy.props.StringProperty(name="Name")
    start_frame: bpy.props.IntProperty(name="Start frame")
    end_frame: bpy.props.IntProperty(name="End frame")
    frame_duration: bpy.props.IntProperty(name="Frame Duration")


# Blender stuff
def register():
    bpy.utils.register_class(JSMJAMEXPORT_OT_export_jwm)
    bpy.utils.register_class(JSMJAMEXPORT_OT_export_jnm)
    bpy.utils.register_class(JSMJAMEXPORT_OT_export_jsm)
    bpy.utils.register_class(JSMJAMEXPORT_OT_export_jam)
    bpy.utils.register_class(JSMJAMEXPORT_OT_export_jlm)
    bpy.utils.register_class(JSMJAMEXPORT_OT_copy_camera_matrix)
    bpy.utils.register_class(JSMJAMEXPORT_OT_copy_object_position) 
    bpy.utils.register_class(JSMJAMEXPORT_OT_copy_object_rotation)
    bpy.utils.register_class(JSMJAMEXPORT_PT_options)
    bpy.utils.register_class(JSMJAMEXPORT_OT_add_animation)
    bpy.utils.register_class(JSMJAMEXPORT_OT_remove_animation)    
    bpy.utils.register_class(JamAnimation)
    bpy.types.Object.jam_animations = bpy.props.CollectionProperty(type=JamAnimation)


def unregister():
    bpy.utils.unregister_class(JSMJAMEXPORT_OT_export_jwm)
    bpy.utils.unregister_class(JSMJAMEXPORT_OT_export_jnm)
    bpy.utils.unregister_class(JSMJAMEXPORT_OT_export_jsm)
    bpy.utils.unregister_class(JSMJAMEXPORT_OT_export_jam)
    bpy.utils.unregister_class(JSMJAMEXPORT_OT_export_jlm)
    bpy.utils.unregister_class(JSMJAMEXPORT_OT_copy_camera_matrix)   
    bpy.utils.unregister_class(JSMJAMEXPORT_OT_copy_object_position)
    bpy.utils.unregister_class(JSMJAMEXPORT_OT_copy_object_rotation)
    bpy.utils.unregister_class(JSMJAMEXPORT_PT_options)
    bpy.utils.unregister_class(JSMJAMEXPORT_OT_add_animation)
    bpy.utils.unregister_class(JSMJAMEXPORT_OT_remove_animation)
    bpy.utils.unregister_class(JamAnimation)

if __name__ == "__main__":
    register()
