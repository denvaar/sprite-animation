import React, { Component } from 'react';

import KeyListener from '../utils/key-listener';


const gameLoop = (...ComposedComponents) => class extends Component {

  constructor() {
    super();
    this.instances = [];
    this.keyListener = new KeyListener();
    this.loop = this.loop.bind(this);
    this.handleKeyEvents = this.handleKeyEvents.bind(this);
  }

  componentDidMount() {
    this.props.sprites.forEach((sprite, i) => {
      this.keyListener.subscribe(this.props.sprites[i].spriteId, sprite.keys);
    });
    this.loop();
  }

  componentWillUnmount() {
    this.keyListener.unsubscribe();
  }

  proc(composedComponentInstance) {
    this.instances.push(composedComponentInstance);
    //this.instance = composedComponentInstance;
  }

  handleKeyEvents(instanceIndex) {
    let areAnyKeysPressed = false;
    for (let key of this.props.sprites[instanceIndex].keys) {
      if (this.keyListener.isDown(this.props.sprites[instanceIndex].spriteId, key)) {
        this.instances[instanceIndex].handleKeyEvent(key);
        areAnyKeysPressed = true;
      }
    }
    if (!areAnyKeysPressed) {
      this.instances[instanceIndex].handleKeyEvent(null);
    }
  }

  loop() {
    this.instances.forEach((instance, i) => {
      this.handleKeyEvents(i);
    });
    setTimeout(this.loop, 10);
  }

  render() {
    //const props = {...this.props, ref: this.proc.bind(this)};
    let components = ComposedComponents.map((ComposedComponent, i) => {
      return <ComposedComponent key={i} ref={this.proc.bind(this)} {...this.props.sprites[i]} />
    });
    return (
      <div>
        {components}
      </div>
    );
  }
}

gameLoop.propTypes = {
  sprites: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      spriteId: React.PropTypes.string.isRequired
    })
  )
}

export default gameLoop;
