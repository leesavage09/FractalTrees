class Animate {

  /**
   * Returns a keyframe int between 0 and 1 according to the postion between the two points on the screen
   * @param {pixels from top of screen to START animation} startAtPos 
   * @param {pixels from top of screen to STOP animation} stopAtPos 
   */
   static createScrollKeyframe(startAtPos, stopAtPos) {
    let pos = window.scrollY; //TODO not sure if this is a good idea
    let keyframe = ((pos - startAtPos) / (stopAtPos - startAtPos));
    return keyframe <= 0 ? 0 : (keyframe >= 1 ? 1 : keyframe);
  }

  static animateFadeIn(keyframe, stateProperty,app) {
    let fade = `${stateProperty}Fade`;
    let display = `${stateProperty}Display`;
    // inital state
    if (keyframe === 0 && app.state[fade] !== 0) {
        app.setState({ [fade]: 0 });
        app.setState({ [display]: 'none' });
    }
    // during key frame render
    if (keyframe !== 1 && keyframe !== 0) {
        app.setState({ [fade]: Animate.easeInCubic(keyframe) });
        app.setState({ [display]: 'inline' });
    }
  }

  static animateFadeOut(keyframe, stateProperty,app) {
    let fade = `${stateProperty}Fade`;
    let display = `${stateProperty}Display`;
    // during key frame render
    if (keyframe !== 1 && keyframe !== 0) {
        app.setState({ [fade]: Animate.easeOutCubic(1 - keyframe) });
        app.setState({ [display]: 'inline' });
    }
    //end state
    if (keyframe === 1 && app.state[fade] !== 0) {
        app.setState({ [fade]: 0 });
        app.setState({ [display]: 'none' });
    }
  }

  static animateMotion(keyframe, moveUp, moveRight, initTop, initLeft, stateProperty,app) {
    let cssTop = `${stateProperty}Top`;
    let cssLeft = `${stateProperty}Left`;
    if (keyframe !== 1 && keyframe !== 0) {
      let obj = {
        [cssTop]:  ((1 - keyframe) * moveUp) + initTop + 'vh',
        [cssLeft]: (keyframe * moveRight) + initLeft + 'vw'
      };
      app.setState(obj);
    }
  }

  /**
   * Maps number that is in one range to another
   */
  static mapRange = function (num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  /**
   * Easeing funtions
   */
  // accelerating from zero velocity 
  static easeInCubic = t => t * t * t;
  // decelerating to zero velocity 
  static easeOutCubic = t => (--t) * t * t + 1;

}

export default Animate;