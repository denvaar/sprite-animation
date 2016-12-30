import React, { Component } from 'react';

import '../../../styles/bird.css';


export default class Bird extends Component {
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
      case 65:
        this.setState({
          xPosition: this.state.xPosition - 3,
          animationClasses: `${this.props.spriteId} bird-flying-left`
        });
        break;
      case 68:
        this.setState({
          xPosition: this.state.xPosition + 3,
          animationClasses: `${this.props.spriteId} bird-flying-right`
        });
        break;
      case 87:
        this.setState({
          yPosition: this.state.yPosition - 3,
          animationClasses: `${this.props.spriteId} bird-flying-front`
        });
        break;
      case 83:
        this.setState({
          yPosition: this.state.yPosition + 3,
          animationClasses: `${this.props.spriteId} bird-flying-down`
        });
        break;
      default:
        this.setState({
          animationClasses: ({
            null: `${this.props.spriteId} bird-flying-front`,
            83: `${this.props.spriteId} bird-flying-front`,
            68: `${this.props.spriteId} bird-flying-right`,
            87: `${this.props.spriteId} bird-flying-front`,
            65: `${this.props.spriteId} bird-flying-left`
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

Bird.propTypes = {
  animationClasses: React.PropTypes.string.isRequired,
  yPosition: React.PropTypes.number.isRequired,
  xPosition: React.PropTypes.number.isRequired
};
