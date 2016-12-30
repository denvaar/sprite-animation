import React, { Component } from 'react';

import '../../../styles/link.css';


export default class Link extends Component {
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
          animationClasses: `${this.props.spriteId} link-walking-left`
        });
        break;
      case 39:
        this.setState({
          xPosition: this.state.xPosition + 3,
          animationClasses: `${this.props.spriteId} link-walking-right`
        });
        break;
      case 38:
        this.setState({
          yPosition: this.state.yPosition - 3,
          animationClasses: `${this.props.spriteId} link-walking-back`
        });
        break;
      case 40:
        this.setState({
          yPosition: this.state.yPosition + 3,
          animationClasses: `${this.props.spriteId} link-walking-front`
        });
        break;
      default:
        this.setState({
          animationClasses: ({
            null: `${this.props.spriteId} link-standing-front`,
            40: `${this.props.spriteId} link-standing-front`,
            39: `${this.props.spriteId} link-standing-right`,
            38: `${this.props.spriteId} link-standing-back`,
            37: `${this.props.spriteId} link-standing-left`
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

Link.propTypes = {
  animationClasses: React.PropTypes.string.isRequired,
  yPosition: React.PropTypes.number.isRequired,
  xPosition: React.PropTypes.number.isRequired
};
