class Zone extends Array {
  constructor(location) {
    super();
    this.location = location;
  }

  getLocation() {
    return this.location;
  }
}

export { Zone };