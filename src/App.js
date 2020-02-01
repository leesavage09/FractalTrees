import React from 'react';
import './assets/css/App.css';
import AdvancedSlider from './assets/components/AdvancedSlider';
import Canvas from './assets/components/Canvas.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {

  /**
   * Get scroll events
   */
  componentDidMount() {
    window.addEventListener('scroll', this.animateUI.bind(this));
  }

  constructor(props) {
    super(props);
    this.state = {
      initLength: 200, initWidth: 15,
      nextLengthMin: 0.6, nextLengthMax: 0.6,
      nextWidthMin: 0.8, nextWidthMax: 0.8,
      nextBendMin: 0, nextBendMax: 0,
      nextAngleMin: 0, nextAngleMax: 0,
      nextSideAngleMin: 45, nextSideAngleMax: 45,
      deathMin: 0, deathMax: 0,
      deathSideMin: 100, deathSideMax: 100,
      fruit: 0, leaf: 0,
      wireframe: false,
    };
    this.handleScroll = this.animateUI.bind(this);
  }

  /**
   * Some default trees
   */
  christmasTree = () => this.setState({
    initLength: 250, initWidth: 50,
    nextLengthMin: 0.5, nextLengthMax: 0.5,
    nextWidthMin: 0.5, nextWidthMax: 0.5,
    nextBendMin: 0, nextBendMax: 0,
    nextAngleMin: 0, nextAngleMax: 0,
    nextSideAngleMin: 128, nextSideAngleMax: 128,
    deathMin: 100, deathMax: 100,
    deathSideMin: 100, deathSideMax: 100,
    fruit: 20, leaf: 100,
  });
  niceTree = () => this.setState({
    initLength: 91, initWidth: 22,
    nextLengthMin: 0.6, nextLengthMax: 0.85,
    nextWidthMin: 0.56, nextWidthMax: 0.8,
    nextBendMin: 5, nextBendMax: 8,
    nextAngleMin: -20, nextAngleMax: 20,
    nextSideAngleMin: 20, nextSideAngleMax: 40,
    deathMin: 95, deathMax: 95,
    deathSideMin: 60, deathSideMax: 60,
    fruit: 0, leaf: 0,
  });
  basicTree = () => this.setState({
    initLength: 200, initWidth: 15,
    nextLengthMin: 0.6, nextLengthMax: 0.6,
    nextWidthMin: 0.8, nextWidthMax: 0.8,
    nextBendMin: 0, nextBendMax: 0,
    nextAngleMin: 0, nextAngleMax: 0,
    nextSideAngleMin: 45, nextSideAngleMax: 45,
    deathMin: 0, deathMax: 0,
    deathSideMin: 100, deathSideMax: 100,
    fruit: 0, leaf: 0,
  });
  squareTree = () => this.setState({
    initLength: 250, initWidth: 36,
    nextLengthMin: 0.7, nextLengthMax: 0.7,
    nextWidthMin: 0.8, nextWidthMax: 0.8,
    nextBendMin: 0, nextBendMax: 0,
    nextAngleMin: 0, nextAngleMax: 0,
    nextSideAngleMin: 90, nextSideAngleMax: 90,
    deathMin: 0, deathMax: 0,
    deathSideMin: 100, deathSideMax: 100,
    fruit: 0, leaf: 0,
  });
  crazyTree = () => this.setState({
    initLength: 200, initWidth: 15,
    nextLengthMin: 0.6, nextLengthMax: 0.6,
    nextWidthMin: 0.8, nextWidthMax: 0.8,
    nextBendMin: 0.1, nextBendMax: 1,
    nextAngleMin: 0, nextAngleMax: 0,
    nextSideAngleMin: 45, nextSideAngleMax: 45,
    deathMin: 0, deathMax: 0,
    deathSideMin: 100, deathSideMax: 100,
    fruit: 0, leaf: 0,
  });
  ballTree = () => this.setState({
    initLength: 200, initWidth: 100,
    nextLengthMin: 0.6, nextLengthMax: 0.6,
    nextWidthMin: 0.8, nextWidthMax: 0.8,
    nextBendMin: 0.1, nextBendMax: 0.1,
    nextAngleMin: 0, nextAngleMax: 0,
    nextSideAngleMin: 45, nextSideAngleMax: 45,
    deathMin: 0, deathMax: 0,
    deathSideMin: 100, deathSideMax: 100,
    fruit: 0, leaf: 0,
  });
  oakTree = () => this.setState({
    initLength: 127, initWidth: 71,
    nextLengthMin: 0.6, nextLengthMax: 0.8,
    nextWidthMin: 0.6, nextWidthMax: 0.75,
    nextBendMin: 11, nextBendMax: 15,
    nextAngleMin: -20, nextAngleMax: 20,
    nextSideAngleMin: 27, nextSideAngleMax: 35,
    deathMin: 85, deathMax: 95,
    deathSideMin: 69, deathSideMax: 79,
    fruit: 0, leaf: 8.4,
  });
  shrubTree = () => this.setState({
    initLength: 120, initWidth: 33,
    nextLengthMin: 0.6, nextLengthMax: 0.85,
    nextWidthMin: 0.28, nextWidthMax: 0.67,
    nextBendMin: 6, nextBendMax: 7,
    nextAngleMin: -7, nextAngleMax: 7,
    nextSideAngleMin: 8, nextSideAngleMax: 18,
    deathMin: 95, deathMax: 95,
    deathSideMin: 60, deathSideMax: 60,
    fruit: 4, leaf: 0,
  });

  /**
   * Handel state updates
   */
  initLengthChange = (v) => { this.setState({ initLength: parseInt(v) }) };
  initWidthChanged = (v) => { this.setState({ initWidth: parseInt(v) }); };
  nextLengthMinChanged = (v) => this.setState({ nextLengthMin: parseFloat(v) });
  nextLengthMaxChanged = (v) => this.setState({ nextLengthMax: parseFloat(v) });
  nextWidthMinChanged = (v) => this.setState({ nextWidthMin: parseFloat(v) });
  nextWidthMaxChanged = (v) => this.setState({ nextWidthMax: parseFloat(v) });
  nextBendMinChanged = (v) => this.setState({ nextBendMin: parseFloat(v) });
  nextBendMaxChanged = (v) => this.setState({ nextBendMax: parseFloat(v) });
  nextSideAngleMinChanged = (v) => this.setState({ nextSideAngleMin: parseFloat(v) });
  nextSideAngleMaxChanged = (v) => this.setState({ nextSideAngleMax: parseFloat(v) });
  nextAngleMinChanged = (v) => this.setState({ nextAngleMin: parseFloat(v) });
  nextAngleMaxChanged = (v) => this.setState({ nextAngleMax: parseFloat(v) });
  deathMinChanged = (v) => this.setState({ deathMin: parseFloat(v) });
  deathMaxChanged = (v) => this.setState({ deathMax: parseFloat(v) });
  deathSideMinChanged = (v) => this.setState({ deathSideMin: parseFloat(v) });
  deathSideMaxChanged = (v) => this.setState({ deathSideMax: parseFloat(v) });
  fruitChanged = (v) => this.setState({ fruit: parseFloat(v) });
  leafChanged = (v) => this.setState({ leaf: parseFloat(v) });
  wireframeToggle = (v) => this.setState({ wireframe: !this.state.wireframe });

  /**
   * Create animations based on scroll positions realtive to VH units
   * @param {a scroll event} e 
   */
  animateUI(e) {
    console.log(window.innerHeight, window.scrollY, window.innerHeight * 4.7);

    let startAtPos = window.innerHeight * 0.0;
    let stopAtPos = window.innerHeight * 1.0;
    this.animateFadeInH1(this.createScrollKeyframe(startAtPos, stopAtPos));

    startAtPos = window.innerHeight * 2.0;
    stopAtPos = (window.innerHeight * 3.0);
    this.animateFadeOutH1(this.createScrollKeyframe(startAtPos, stopAtPos));

    startAtPos = window.innerHeight * 0.75;
    stopAtPos = window.innerHeight * 1.25;
    let tempkeyframe = this.createScrollKeyframe(startAtPos, stopAtPos);
    this.animateFadeInH2(tempkeyframe);

    startAtPos = window.innerHeight * 1.5;
    stopAtPos = (window.innerHeight * 2.5);
    this.animateFadeOutH2(this.createScrollKeyframe(startAtPos, stopAtPos));

    startAtPos = window.innerHeight * 0.0;
    stopAtPos = (window.innerHeight * 3.0);
    this.animateH1H2motion(this.createScrollKeyframe(startAtPos, stopAtPos));

    startAtPos = window.innerHeight * 3.0;
    stopAtPos = window.innerHeight * 4.5;
    this.animateFadeInP1(this.createScrollKeyframe(startAtPos, stopAtPos));

    startAtPos = window.innerHeight * 4.5;
    stopAtPos = window.innerHeight * 6.0;
    this.animateFadeOutP1(this.createScrollKeyframe(startAtPos, stopAtPos));

    startAtPos = window.innerHeight * 6.0;
    stopAtPos = window.innerHeight * 7.5;
    this.animateFadeInP2(this.createScrollKeyframe(startAtPos, stopAtPos));

    startAtPos = window.innerHeight * 7.5;
    stopAtPos = window.innerHeight * 9.0;
    this.animateFadeOutP2(this.createScrollKeyframe(startAtPos, stopAtPos));

    startAtPos = window.innerHeight * 9.0;
    stopAtPos = window.innerHeight * 10.5;
    this.animateFadeInP3(this.createScrollKeyframe(startAtPos, stopAtPos));

    startAtPos = window.innerHeight * 10.5;
    stopAtPos = window.innerHeight * 12.0;
    this.animateFadeOutP3(this.createScrollKeyframe(startAtPos, stopAtPos));


    // startAtPos = window.innerHeight * 6.0;
    // stopAtPos = window.innerHeight * 7.5;
    // this.animateFadeInOutC1(this.createScrollKeyframe(startAtPos, stopAtPos));

  }

  /**
   * Returns a keyframe int between 0 and 1 according to the postion between the two points on the screen
   * @param {pixels from top of screen to START animation} startAtPos 
   * @param {pixels from top of screen to STOP animation} stopAtPos 
   */
  createScrollKeyframe(startAtPos, stopAtPos) {
    let pos = window.scrollY;
    let keyframe = ((pos - startAtPos) / (stopAtPos - startAtPos));
    return keyframe <= 0 ? 0 : (keyframe >= 1 ? 1 : keyframe);
  }

  //Animation Functions
  animateH1H2motion(keyframe) {
    if (keyframe !== 1 && keyframe !== 0) {
      this.setState({ h1Top: ((1 - keyframe) * 15) + 35 + 'vh', h2Left: ((keyframe) * 5) + 55 + 'vw' });
    }
  }
  animateFadeInH1(keyframe) {
    if (keyframe !== 1 && keyframe !== 0) {
      this.setState({ h1Fade: this.easeInCubic(keyframe) });
    }
    else if (keyframe === 0 && this.state.h1Fade !== 0) {
      this.setState({ h1Fade: 0 });
    }
  }
  animateFadeOutH1(keyframe) {
    if (keyframe !== 1 && keyframe !== 0) {
      this.setState({ h1Fade: this.easeOutCubic(1 - keyframe) });
    }
    if (keyframe === 1 && this.state.h1Fade !== 0) {
      this.setState({ h1Fade: 0 });
    }
  }
  animateFadeInH2(keyframe) {
    if (keyframe !== 1 && keyframe !== 0) {
      this.setState({ h2Fade: this.easeInCubic(keyframe) });
    }
    else if (keyframe === 0 && this.state.h2Fade !== 0) {
      this.setState({ h2Fade: 0 });
    }
  }
  animateFadeOutH2(keyframe) {
    if (keyframe !== 1 && keyframe !== 0) {
      this.setState({ h2Fade: this.easeOutCubic(1 - keyframe) });
    }
    if (keyframe === 1 && this.state.h2Fade !== 0) {
      this.setState({ h2Fade: 0 });
    }
  }
  animateFadeInP1(keyframe) {
    if (keyframe !== 1 && keyframe !== 0) {
      this.setState({ p1Fade: this.easeInCubic(keyframe), p1Top: ((1-keyframe)*10)+25+ 'vh'  });
    }
    else if (keyframe === 0 && this.state.p1Fade !== 0) {
      this.setState({ p1Fade: 0 });
    }
  }
  animateFadeOutP1(keyframe) {
    if (keyframe !== 1 && keyframe !== 0) {
      this.setState({ p1Fade: this.easeInCubic(1-keyframe), p1Top: ((-keyframe)*10)+25+ 'vh'  });
    }
    else if (keyframe === 1 && this.state.p1Fade !== 0) {
      this.setState({ p1Fade: 0 });
    }
  }
  animateFadeInP2(keyframe) {
    if (keyframe !== 1 && keyframe !== 0) {
      this.setState({ p2Fade: this.easeInCubic(keyframe), p2Top: ((1-keyframe)*10)+25+ 'vh'  });
    }
    else if (keyframe === 0 && this.state.p2Fade !== 0) {
      this.setState({ p2Fade: 0 });
    }
  }
  animateFadeOutP2(keyframe) {
    if (keyframe !== 1 && keyframe !== 0) {
      this.setState({ p2Fade: this.easeInCubic(1-keyframe), p2Top: ((-keyframe)*10)+25+ 'vh'  });
    }
    else if (keyframe === 1 && this.state.p1Fade !== 0) {
      this.setState({ p2Fade: 0 });
    }
  }
  animateFadeInP3(keyframe) {
    if (keyframe !== 1 && keyframe !== 0) {
      this.setState({ p3Fade: this.easeInCubic(keyframe), p3Top: ((1-keyframe)*10)+25+ 'vh'  });
    }
    else if (keyframe === 0 && this.state.p2Fade !== 0) {
      this.setState({ p3Fade: 0 });
    }
  }
  animateFadeOutP3(keyframe) {
    if (keyframe !== 1 && keyframe !== 0) {
      this.setState({ p3Fade: this.easeInCubic(1-keyframe), p3Top: ((-keyframe)*10)+25+ 'vh'  });
    }
    else if (keyframe === 1 && this.state.p1Fade !== 0) {
      this.setState({ p3Fade: 0 });
    }
  }

  // animateFadeInOutC1(keyframe) {
  //   if (keyframe !== 1 && keyframe !== 0) {
  //     this.setState({ c1Fade: this.easeInCubic(this.mapRange(keyframe, 0, 0.5, 0.0, 1.5)), c1Scale: this.easeInCubic(this.mapRange(keyframe, 0, 0.6, 0.85, 1.0)) });
  //   }
  //   else if (keyframe === 0 && this.state.c1Fade !== 0) {
  //     this.setState({ c1Fade: 0 });
  //   }
  // }

  /**
   * Helper function maps a number that is in one range to another
   */
  mapRange = function (num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  /**
   * Easeing funtions
   */
  // accelerating from zero velocity 
  easeInCubic = t => t * t * t;
  // decelerating to zero velocity 
  easeOutCubic = t => (--t) * t * t + 1;
  // acceleration until halfway, then deceleration 
  easeInOutCubic = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  render() {
    const aniH1 = {
      opacity: this.state.h1Fade,
      top: this.state.h1Top,
    };
    const aniH2 = {
      opacity: this.state.h2Fade,
      left: this.state.h2Left,
    };
    const aniP1 = {
      opacity: this.state.p1Fade,
      top: this.state.p1Top,
    };
    const aniP2 = {
      opacity: this.state.p2Fade,
      top: this.state.p2Top,
    };
    const aniP3 = {
      opacity: this.state.p3Fade,
      top: this.state.p3Top,
    };
    // const aniC1 = {
    //   opacity: this.state.c1Fade,
    //   transform: 'scale(' + this.state.c1Scale + ')',
    // };
    return (
      <div className="App">
        <header className="App-header">

          <div className='sideBar1'></div>
          <div className='sideBar2'></div>
          <p className='scroll'>Scroll to begin<br></br><FontAwesomeIcon icon={faCaretDown} /></p>

          <h1 style={aniH1}>Fractal Trees</h1>
          <h2 style={aniH2}>By Lee Savage</h2>

          <div style={aniP1} className='text-block'>
            <h3>What is a fractal tree</h3>
            <p className='text'>A fractal tree is a procedurally generated image of a tree. The rules of the tree you see below are simple.<br />
              1. Starting at the bottom of the screen draw a virtual line of length N<br />
              2. At the end of the line draw 2 new lines at 45' with a length 0.5*N<br />
              3. Repeat step 2 until the length is not worth drawing</p>
          </div>

          <div ref={(el) => this.yourElement = el} className='fog' />

          <div style={aniP2} className='text-block'>
            <h3>The building block is the first rectangle it has a length and width</h3>
            <AdvancedSlider
              label="Length"
              text='The length of the first branch or trunk'
              step={1}
              precision={0}
              minValue={1}
              maxValue={250}
              value={this.state.initLength}
              valueChanged={this.initLengthChange}
            />
            <AdvancedSlider
              label="Width"
              text='The width of the first branch or trunk'
              step={1}
              precision={0}
              minValue={1}
              maxValue={100}
              value={this.state.initWidth}
              valueChanged={this.initWidthChanged} />
          </div>

          <div style={aniP3} className='text-block'>
            <h3>But it doesn't look very much like a real tree</h3>
            <p className='text'>I have always been fascinated by the idea that the universe is built on simple laws. The language of the universe appears to be mathematics. So how can we make the trees more natural. One key aspect is of this is a little randomness, some of the controls have 2 values. The algorithm will choose a random value in the range you select.</p>
          </div>


{/* 

          <div className='spacer'></div>
          <div className='controls'>
            <h3>The next is created from the last</h3>
            <AdvancedSlider
              label="Next Length"
              text='The length multiplier of the next branch. A value of 0.5 will mean the next branch is half the length of the last '
              numberHandles={2}
              step={0.01}
              precision={2}
              minValue={0.25}
              maxValue={0.95}
              value={this.state.nextLengthMin}
              value2={this.state.nextLengthMax}
              valueChanged={this.nextLengthMinChanged}
              value2Changed={this.nextLengthMaxChanged} />
            <AdvancedSlider
              label="Next Width"
              text='The width multiplier of the next branch. A value of 0.5 will mean the next branch is half the width of the last'
              numberHandles={2}
              step={0.01}
              precision={2}
              minValue={0.01}
              maxValue={1.50}
              value={this.state.nextWidthMin}
              value2={this.state.nextWidthMax}
              valueChanged={this.nextWidthMaxChanged}
              value2Changed={this.nextWidthMinChanged} />
          </div>


          <div className='spacer'></div>
          <div className='controls'>
            <h3>If they were all rectangles it would be boaring</h3>
            <AdvancedSlider
              label="Bend"
              text='bezier Curve, low numbers create more bend '
              numberHandles={2}
              step={0.1}
              precision={1}
              minValue={0}
              maxValue={50}
              value={this.state.nextBendMin}
              value2={this.state.nextBendMax}
              valueChanged={this.nextBendMinChanged}
              value2Changed={this.nextBendMaxChanged} />
          </div>



          <div className='spacer'></div>
          <div className='controls'>
            <h3>Everything Dies</h3>
            <AdvancedSlider
              label="Main Death Rate"
              text='The probability the main trunk will survive'
              numberHandles={2}
              step={1}
              precision={0}
              minValue={0}
              maxValue={100}
              value={this.state.deathMin}
              value2={this.state.deathMax}
              valueChanged={this.deathMinChanged}
              value2Changed={this.deathMaxChanged} />
            <AdvancedSlider
              label="Side Death Rate"
              text='The probability the side branches will survive'
              numberHandles={2}
              step={1}
              precision={0}
              minValue={0}
              maxValue={100}
              value={this.state.deathSideMin}
              value2={this.state.deathSideMax}
              valueChanged={this.deathSideMinChanged}
              value2Changed={this.deathSideMaxChanged} />
          </div>



          <div className='spacer'></div>
          <div className='controls'>
            <h3>The angles are all wrong</h3>
            <AdvancedSlider
              label="Next angle "
              text='The next angle of the main trunk'
              numberHandles={2}
              step={1}
              precision={0}
              minValue={-150}
              maxValue={150}
              value={this.state.nextAngleMin}
              value2={this.state.nextAngleMax}
              valueChanged={this.nextAngleMinChanged}
              value2Changed={this.nextAngleMaxChanged} />
            <AdvancedSlider
              label="Next sidebanch angle"
              text='Brances to the left and right of the main trunk will have this angle'
              numberHandles={2}
              step={1}
              precision={0}
              minValue={0}
              maxValue={150}
              value={this.state.nextSideAngleMin}
              value2={this.state.nextSideAngleMax}
              valueChanged={this.nextSideAngleMinChanged}
              value2Changed={this.nextSideAngleMaxChanged} />
          </div>





          <div className='spacer'></div>
          <div className='controls'>
            <h3>Decoration</h3>
            <AdvancedSlider
              label="Fruit Chance"
              text='The probability of fruit'
              numberHandles={1}
              step={0.2}
              precision={0}
              minValue={0}
              maxValue={100}
              value={this.state.fruit}
              valueChanged={this.fruitChanged} />
            <AdvancedSlider
              label="Leaf Chance"
              text='The probability of a leaf'
              numberHandles={1}
              step={0.2}
              precision={0}
              minValue={0}
              maxValue={100}
              value={this.state.leaf}
              valueChanged={this.leafChanged} />
            <input type="button" value='Wireframe Mode' onClick={this.wireframeToggle} />
          </div>


          <div className='spacer'></div>
          <div className='controls'>
            <h3>Decoration</h3>
            <input type="button" value='Basic Tree' onClick={this.basicTree} />
            <input type="button" value='Nice Tree' onClick={this.niceTree} />
            <input type="button" value='Crazy Tree' onClick={this.crazyTree} />
            <input type="button" value='Oak Tree' onClick={this.oakTree} />
            <input type="button" value='Shrub Tree' onClick={this.shrubTree} />
            <input type="button" value='Ball Tree' onClick={this.ballTree} />
            <input type="button" value='Square Tree' onClick={this.squareTree} />
            <input type="button" value='Christmas Tree' onClick={this.christmasTree} />
          </div>



          <div className='goodbye-text'>
            <p className='thanks'>Thanks for playing</p>
          </div> */}

          <Canvas className='treeCanvas'
            initLength={this.state.initLength}
            initWidth={this.state.initWidth}
            nextWidthMin={this.state.nextWidthMin}
            nextWidthMax={this.state.nextWidthMax}
            nextLengthMin={this.state.nextLengthMin}
            nextLengthMax={this.state.nextLengthMax}
            nextBendMin={this.state.nextBendMin}
            nextBendMax={this.state.nextBendMax}
            nextAngleMin={this.state.nextAngleMin}
            nextAngleMax={this.state.nextAngleMax}
            nextSideAngleMin={this.state.nextSideAngleMin}
            nextSideAngleMax={this.state.nextSideAngleMax}
            deathMin={this.state.deathMin}
            deathMax={this.state.deathMax}
            deathSideMin={this.state.deathSideMin}
            deathSideMax={this.state.deathSideMax}
            fruit={this.state.fruit}
            leaf={this.state.leaf}
            wireframe={this.state.wireframe}
          />
        </header>
      </div >
    );
  }
}
export default App;