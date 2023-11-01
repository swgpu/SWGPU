## Récuperer la taille de la scene en unité d'espace de clip.
Largeur: (largeur scene / (largeur vue * 0.5));
Hauteur: (hauteur scene / (hauteur vue * 0.5));
Marge horizontal: (Largeur - 2) * 0.5
Marge vertical: (Hauteur - 2) * 0.5

## Récupérer la matrice de caméra (espace blender vers gwe) (Inversion axe x, permutation y-z)
import bpy
from mathutils import Vector
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
print(matrix);