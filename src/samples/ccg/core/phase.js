class Phase {
  constructor(id, name, disabled = false) {
    this.id = id;
    this.name = name;
    this.disabled = disabled;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  isDisabled() {
    return this.disabled;
  }

  setDisabled(disabled) {
    this.disabled = disabled;
  }
}

export { Phase };