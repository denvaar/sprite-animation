import React, { Component } from 'react';

import Link from './sprites/link';
import Bird from './sprites/bird';
import gameLoop from './animate';


const Ball = (props) => <div style={styles}></div>;

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let linkProps = {
      spriteId: "link",
      keys: [37,38,39,40],
      animationClasses: "link link-standing-front",
      yPosition: 200,
      xPosition: 200
    };
    let birdProps = {
      spriteId: "bird",
      keys: [83,68,87,65],
      animationClasses: "bird bird-flying-front",
      yPosition: 200,
      xPosition: 10
    };

    return (
      <div className="center">
        <h3 className="banner">Use arrow keys to move Link around.</h3>
        <h3 className="banner">Use a, w, s, d keys to move the bird around.</h3>
        <SpriteScene sprites={[linkProps, birdProps]} />
      </div>
    );
  }
}

let styles = {
  width: 50+"px",
  height: 50+"px",
  background: "blue",
  borderRadius: 50+"%"
};


const SpriteScene = gameLoop(Link, Bird);
