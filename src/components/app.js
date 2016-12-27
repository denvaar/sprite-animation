import React, { Component } from 'react';

import KeyListener from '../utils/key-listener';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false,
      directionFacing: 40
    };
    this.keyListener = new KeyListener();
  }

  componentDidMount() {
    this.keyListener.subscribe(this,
      [37, 39, 38, 40]);
  }

  render() {
    let classes = "center link ";
    if (this.state.animate) {
      if (this.keyListener.isDown(37)) {
        classes += "link-walking-left";
      } else if (this.keyListener.isDown(39)) {
        classes += "link-walking-right";
      } else if (this.keyListener.isDown(38)) {
        classes += "link-walking-back";
      } else if (this.keyListener.isDown(40)) {
        classes += "link-walking-front";
      }
    } else {
      switch (this.state.directionFacing) {
        case 37:
          classes += "link-standing-left";
          break;
        case 39:
          classes += "link-standing-right";
          break;
        case 38:
          classes += "link-standing-back";
          break;
        default:
          classes += "link-standing-front";
          break;
      }
    }
    return (
      <div className="center">
        <h3 className="banner">Use arrow keys to animate the sprites</h3>
        <div className="sprite-container">
          <h3>Link</h3>
          <div className={classes}></div>
        </div>
      </div>
    );
  }
}
