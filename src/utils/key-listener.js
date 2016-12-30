export default class KeyListener {

  constructor() {
    this.keyMappings = {};
    this.up = this.up.bind(this); 
    this.down = this.down.bind(this); 
    this.active = false;
  }

  subscribe(target, keys) {
    if (!this.active) {
      window.addEventListener('keydown', this.down);
      window.addEventListener('keyup', this.up);
    }
    let mapping = {};
    keys.forEach(key => {
      mapping[key] = false;
    });
    this.keyMappings = {
      ...this.keyMappings,
      [`${target}`]: mapping
    };
    this.active = true
  }

  unsubscribe() {
    window.removeEventListener('keydown', this.down);
    window.removeEventListener('keyup', this.up);
    this.keyMappings = {};
    this.active = false;
  }

  up(event) {
    Object.keys(this.keyMappings).forEach(target => {
      if (event.keyCode in this.keyMappings[target]) {
        event.preventDefault();
        this.keyMappings[target][event.keyCode] = false;
      }
    });
  }
  
  down(event) {
    Object.keys(this.keyMappings).forEach(target => {
      if (event.keyCode in this.keyMappings[target]) {
        event.preventDefault();
        this.keyMappings[target][event.keyCode] = true;
      }
    });
  }

  isDown(target, keyCode) {
    return this.keyMappings[target][keyCode] || false;
  }

}
