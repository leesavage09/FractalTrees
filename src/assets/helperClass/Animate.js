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
    // inital state
    if (keyframe === 0 && app.state[stateProperty] !== 0) {
        app.setState({ [stateProperty]: 0 });
    }
    // during key frame render
    if (keyframe !== 1 && keyframe !== 0) {
        app.setState({ [stateProperty]: Animate.easeInCubic(keyframe) });
    }
  }

  static animateFadeOut(keyframe, stateProperty,app) {
    // during key frame render
    if (keyframe !== 1 && keyframe !== 0) {
        app.setState({ [stateProperty]: Animate.easeOutCubic(1 - keyframe) });
    }
    //end state
    if (keyframe === 1 && app.state[stateProperty] !== 0) {
        app.setState({ [stateProperty]: 0 });
    }
  }

  static animateMotion(keyframe, up, right, top, left, statePropertyTop, statePropertyLeft,app) {
    if (keyframe !== 1 && keyframe !== 0) {
      let obj = {};
      if (statePropertyTop) {
        obj[statePropertyTop] =  ((1 - keyframe) * up) + top + 'vh';
      }
      if (statePropertyLeft) {
        obj[statePropertyLeft] = (keyframe * right) + left + 'vw';
      }
      app.setState(obj);
    }
  }

  /**
   * Helper function maps a number that is in one range to another
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
  // acceleration until halfway, then deceleration 
  static easeInOutCubic = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;



}

export default Animate;