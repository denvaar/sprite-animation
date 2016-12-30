# sprite-animation

This project is for exploring and playing around with ways to animate sprite sheets within a React app. The goal is to come up with a reusable pattern that could eventually be incorperated into a game engine.

# Overview

The animating happens using CSS. Users can define CSS rules that describe how to animate a sprite sheet image like this one:

<img width="200" src="http://nickbriz.com/gameon/images/link.jpg">

*Image taken from [Nick Briz's blog post](http://nickbriz.com/gameon/2b.html)*

Create a React component and implement a `handleKeyEvent(key)` method that describes state changes based on what key is pressed.

Components to be used as sprites are passed into a [higher order React component](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.7kzl233qg) called, `gameLoop`. This HOC handles things like key events and propagates the events down to the children components.

```
<SpriteScene sprites={[linkProps, birdProps]} />

const SpriteScene = gameLoop(Link, Bird);
```

# Resources

These resources have been pretty helpful:
- [CSS steps animation technique] (http://blog.teamtreehouse.com/css-sprite-sheet-animations-steps)
- [Formidable Labs' React-game-kit] (https://github.com/FormidableLabs/react-game-kit)
- [Video by Andrew McPherson about making games using React](https://www.youtube.com/watch?v=XD4seEJD9Lo)

# Demo

<img width="544" alt="screen shot 2016-12-29 at 8 14 33 pm" src="https://cloud.githubusercontent.com/assets/10538978/21559175/8c15595e-ce04-11e6-8c81-43da83fa988a.png">
