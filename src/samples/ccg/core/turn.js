class Turn {
  constructor() {
    this.phases = [];
    this.currentPhase = null;
  }

  getPhases() {
    return this.phases;
  }

  getPhase(id) {
    return this.phases.find(phase => phase.id == id);
  }

  addPhase(phase) {
    this.phases.push(phase);
  }

  getCurrentPhase() {
    return this.currentPhase;
  }

  setCurrentPhase(currentPhase) {
    this.currentPhase = currentPhase;
  }
}

export { Turn };