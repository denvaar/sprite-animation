export default class KeyListener {

  constructor() {
    this.keys = {};
    this.component = null;
    this.up = this.up.bind(this); 
    this.down = this.down.bind(this); 
  }

  subscribe(component, keys) {
    window.addEventListener('keydown', this.down);
    window.addEventListener('keyup', this.up);
    this.component = component;
    keys.forEach(key => {
      this.keys[key] = false;
    });
  }

  unsubscribe() {
    window.removeEventListener('keydown', this.down);
    window.removeEventListener('keyup', this.up);
    this.keys = {};
  }

  up(event) {
    if (event.keyCode in this.keys) {
      event.preventDefault();
      this.keys[event.keyCode] = false;
    }
    this.component.setState({animate:false});
  }
  
  down(event) {
    if (event.keyCode in this.keys) {
      event.preventDefault();
      this.keys[event.keyCode] = true;
    }
    this.component.setState({
      animate:true,
      directionFacing: event.keyCode
    });
  }

  isDown(keyCode) {
    return this.keys[keyCode] || false;
  }

}
