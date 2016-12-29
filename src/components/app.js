import React, { Component } from 'react';

import KeyListener from '../utils/key-listener';


export default class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    let linkProps = {
      animationClasses: "link link-standing-front",
      yPosition: 10, //this.state.yPosition,
      xPosition: 10 //this.state.xPosition,
    };

    return (
      <div className="center">
        <h3 className="banner">Use arrow keys to move Link around.</h3>
        <SpriteHOC {...linkProps} keys={[37,38,39,40]} />
      </div>
    );
  }
}



const gameLoop = (ComposedComponent) => class extends Component {

  constructor() {
    super();
    this.keyListener = new KeyListener();
    this.loop = this.loop.bind(this);
  }

  componentDidMount() {
    this.keyListener.subscribe(this, this.props.keys);
    this.loop();
  }

  proc(composedComponentInstance) {
    //composedComponentInstance.method(args);
    this.instance = composedComponentInstance;
  }

  loop() {
    let areAnyKeysPressed = false;
    for (let key of this.props.keys) {
      if (this.keyListener.isDown(key)) {
        this.instance.handleKeyEvent(key);
        areAnyKeysPressed = true;
      }
    }
    if (!areAnyKeysPressed) {
      this.instance.handleKeyEvent(null);
    }
    setTimeout(this.loop, 10);
  }

  render() {
    const props = {...this.props, ref: this.proc.bind(this)};
    return (
      <ComposedComponent {...props} />
    );
  }
}


  

class LinkSprite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationClasses: this.props.animationClasses,
      xPosition: this.props.xPosition,
      yPosition: this.props.yPosition,
    };
    this.lastKeyPressed = null;
  }

  handleKeyEvent(key) {
    switch (key) {
      case 37:
        this.setState({
          xPosition: this.state.xPosition - 3,
          animationClasses: "link link-walking-left"
        });
        break;
      case 39:
        this.setState({
          xPosition: this.state.xPosition + 3,
          animationClasses: "link link-walking-right"  
        });
        break;
      case 38:
        this.setState({
          yPosition: this.state.yPosition - 3,
          animationClasses: "link link-walking-back"
        });
        break;
      case 40:
        this.setState({
          yPosition: this.state.yPosition + 3,
          animationClasses: "link link-walking-front"
        });
        break;
      default:
        this.setState({
          animationClasses: ({
            null: "link link-standing-front",
            40: "link link-standing-front",
            39: "link link-standing-right",
            38: "link link-standing-back",
            37: "link link-standing-left"
          })[this.lastKeyPressed]
        });
    }
    if (key) this.lastKeyPressed = key;
  }

  render() {
    let styles = {
      top: this.state.yPosition,
      left: this.state.xPosition
    };
    return (
      <div className={this.state.animationClasses} style={styles}></div>
    );
  }
}

LinkSprite.propTypes = {
  animationClasses: React.PropTypes.string.isRequired,
  yPosition: React.PropTypes.number.isRequired,
  xPosition: React.PropTypes.number.isRequired
};

const SpriteHOC = gameLoop(LinkSprite);
