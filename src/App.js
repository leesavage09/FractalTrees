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
      initLength: 91, initWidth: 22,
      nextLengthMin: 0.6, nextLengthMax: 0.85,
      nextWidthMin: 0.56, nextWidthMax: 0.8,
      nextBendMin: 5, nextBendMax: 8,
      nextAngleMin: -20, nextAngleMax: 20,
      nextSideAngleMin: 20, nextSideAngleMax: 40,
    };

    this.handleScroll = this.animateUI.bind(this);
  }

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


    startAtPos = window.innerHeight * 4.5;
    stopAtPos = window.innerHeight * 6.0;
    this.animateFadeInOutC1(this.createScrollKeyframe(startAtPos, stopAtPos));

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

  animateFadeInOutC1(keyframe) {
    if (keyframe !== 1 && keyframe !== 0) {
      this.setState({ c1Fade: this.easeInCubic(this.mapRange(keyframe, 0, 0.5, 0.0, 1.5)), c1Scale: this.easeInCubic(this.mapRange(keyframe, 0, 0.6, 0.85, 1.0)) });
    }
    else if (keyframe === 0 && this.state.c1Fade !== 0) {
      this.setState({ c1Fade: 0 });
    }
  }

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

  /**  controls to add
       
    
      
      fruitChance
      leafChance
  
      mainDieOff
      mainNextAngle min max
  
      leftDieOff
      
      leftNextAngle min max
  
      rightDieOff
      
      rightNextAngle min max
   */

  render() {
    const aniH1 = {
      opacity: this.state.h1Fade,
      top: this.state.h1Top,
    };
    const aniH2 = {
      opacity: this.state.h2Fade,
      left: this.state.h2Left,
    };
    const aniC1 = {
      opacity: this.state.c1Fade,
      transform: 'scale(' + this.state.c1Scale + ')',
    };
    return (
      <div className="App">
        <header className="App-header">

          <div className='sideBar1'></div>
          <div className='sideBar2'></div>
          <p className='scroll'>Scroll to begin<br></br><FontAwesomeIcon icon={faCaretDown} /></p>

          <h1 style={aniH1}>Fractal Trees</h1>
          <h2 style={aniH2}>By Lee Savage</h2>
          <div ref={(el) => this.yourElement = el} className='welcome-text' />

          <div style={aniC1} className='controls'>
            <h3>The building block is the first rectangle it has a length and width</h3>
            <AdvancedSlider
              label="Length"
              text='The length of the first branch or trunk'
              step={1}
              precision={0}
              minValue={1}
              maxValue={100}
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



          <div className='goodbye-text'>
            <p className='thanks'>Thanks for playing</p>
          </div>

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
          />

        </header>
      </div >
    );
  }

}

export default App;