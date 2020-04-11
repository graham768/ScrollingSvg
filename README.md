# Scrolling SVG

A React component for SVG animations to begin once the image has been scrolled onto the screen

## Installation

`npm i scrollingsvg`

## Usage

ScrollingSvg is used by creating an svg element child within the tag with an existing animation. The animation is paused until the SVG is in full view.
This module pairs well with [react-svg-loader](https://github.com/boopathi/react-svg-loader/tree/master/packages/react-svg-loader) to save SVGs as separate files.

An SVG `className` can be put on either `ScrollingSvg` or the SVG element. Classes added to `ScrollingSvg` are always applied to the SVG element.

[![Edit ScrollingSvg Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/recursing-mirzakhani-dcjm2?fontsize=14&hidenavigation=1&theme=dark)

index.js
```js
import React from "react"
import ScrollingSvg from "scrollingsvg"
import "./index.css"

export default () => (
    <div>
      <ScrollingSvg>
        <svg className="round" viewBox="0 0 100 100" data-percent="100">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </ScrollingSvg>

      <ScrollingSvg className="round">
        <svg viewBox="0 0 100 100" data-percent="100">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </ScrollingSvg>
    </div>
)
```
index.css
```css
.round {
  width: 400px;
  height: auto;
  
  /* SVG */
  fill: none;
  stroke: black;
  stroke-width: 8;
  stroke-dasharray: 800;
  stroke-dashoffset: 800;
  animation: dash 2s linear forwards;
}

@keyframes dash {
  to{
    stroke-dashoffset: 0;
  }
}
```

## Implementation

The child svg within `ScrollingSvg` has an `animationPlayState` set to `paused` initially. Meanwhile, the component adds an `onscroll` event listener that compares the distance scrolled with the child component's view box. Once the window has scrolled to the bottom of the element, the top level svg has it's `animationPlayState` set to `animate`, initiating any pending animations.