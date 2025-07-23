import { DNASystem } from '@lib/dna/dna_system';
// ---------------------------------------------------------------------------------------

class GraphicsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Entity');
  }

  onEntityUpdate(ts: number, eid: number): void {
    // Pour l'instant, on utilise juste le debug renderer
    // On pourrait ajouter des modèles 3D plus tard
  }

  onEntityDraw(eid: number): void {
    // Le rendu est géré par le debug renderer de Jolt
  }
}

export { GraphicsSystem };