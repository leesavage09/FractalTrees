import React from 'react';
import './assets/css/App.css';
import AdvancedSlider from './assets/components/AdvancedSlider';
import Canvas from './assets/components/Canvas.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  /**
 * Check if an element is in viewport
 *
 * @param {number} [offset]
 * @returns {boolean}
 */
  isInViewport(offset = 0) {
    if (!this.yourElement) return false;
    const top = this.yourElement.getBoundingClientRect().top;
    return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
  }

  constructor(props) {
    super(props);
    this.isBrowser = typeof window !== `undefined`;

    this.state = {
      initLength: 91, initWidth: 22,
      nextLengthMin: 0.6, nextLengthMax: 0.85,
      nextLengthLMin: 0.5, nextLengthLMax: 0.7,
      nextLengthRMin: 0.5, nextLengthRMax: 0.7,
      nextWidthMin: 0.56, nextWidthMax: 0.8,
      nextBendMin: 5, nextBendMax: 8,
    };
    this.handelInitLengthChanged = this.handelInitLengthChanged.bind(this);
    this.handelInitWidthChanged = this.handelInitWidthChanged.bind(this);
    this.handelNextWidthMinChanged = this.handelNextWidthMinChanged.bind(this);
    this.handelNextWidthMaxChanged = this.handelNextWidthMaxChanged.bind(this);
    this.handelNextLengthMinChanged = this.handelNextLengthMinChanged.bind(this);
    this.handelNextLengthMaxChanged = this.handelNextLengthMaxChanged.bind(this);

    this.handelNextLengthLMinChanged = this.handelNextLengthLMinChanged.bind(this);
    this.handelNextLengthLMaxChanged = this.handelNextLengthLMaxChanged.bind(this);

    this.handelNextLengthRMinChanged = this.handelNextLengthRMinChanged.bind(this);
    this.handelNextLengthRMaxChanged = this.handelNextLengthRMaxChanged.bind(this);

    this.handelNextBendMinChanged = this.handelNextBendMinChanged.bind(this);
    this.handelNextBendMaxChanged = this.handelNextBendMaxChanged.bind(this);

    this.handleScroll = this.handleScroll.bind(this);
  }

  handelInitLengthChanged(value) {
    this.setState({ initLength: parseInt(value) });
  }
  handelInitWidthChanged(value) {
    this.setState({ initWidth: parseInt(value) });
  }
  handelNextWidthMinChanged(value) {
    this.setState({ nextWidthMin: parseFloat(value) });
  }
  handelNextWidthMaxChanged(value) {
    this.setState({ nextWidthMax: parseFloat(value) });
  }
  handelNextLengthMinChanged(value) {
    this.setState({ nextLengthMin: parseFloat(value) });
  }
  handelNextLengthMaxChanged(value) {
    this.setState({ nextLengthMax: parseFloat(value) });
  }

  handelNextLengthLMinChanged(value) {
    this.setState({ nextLengthLMin: parseFloat(value) });
  }
  handelNextLengthLMaxChanged(value) {
    this.setState({ nextLengthLMax: parseFloat(value) });
  }

  handelNextLengthRMinChanged(value) {
    this.setState({ nextLengthRMin: parseFloat(value) });
  }
  handelNextLengthRMaxChanged(value) {
    this.setState({ nextLengthRMax: parseFloat(value) });
  }


  handelNextBendMinChanged(value) {
    this.setState({ nextBendMin: parseFloat(value) });
  }
  handelNextBendMaxChanged(value) {
    this.setState({ nextBendMax: parseFloat(value) });
  }


  handleScroll(e) {
    if (!this.isBrowser) return { x: 0, y: 0 }



    let startAtPos = window.innerHeight * 0.5;
    let stopAtPos = window.innerHeight * 1;
    this.animateInH1(this.createScrollKeyframe(startAtPos, stopAtPos));


    startAtPos = window.innerHeight * 1.1;
    stopAtPos = (window.innerHeight * 1.6);
    this.animateOutH1(this.createScrollKeyframe(startAtPos, stopAtPos));




    startAtPos = window.innerHeight * 0.75;
    stopAtPos = window.innerHeight * 1;
    this.animateInH2(this.createScrollKeyframe(startAtPos, stopAtPos));


    startAtPos = window.innerHeight * 1.1;
    stopAtPos = (window.innerHeight * 1.3);
    this.animateOutH2(this.createScrollKeyframe(startAtPos, stopAtPos));



  }

  createScrollKeyframe(startAtPos, stopAtPos) {
    let pos = window.scrollY;
    let keyframe = ((pos - startAtPos) / (stopAtPos - startAtPos));
    return keyframe <= 0 ? 0 : (keyframe >= 1 ? 1 : keyframe);
  }

  animateInH1(keyframe) {
    if (keyframe != 1 && keyframe != 0) {
      this.setState({ h1Fade: this.easeInCubic(keyframe) });
    }
    else if (keyframe === 0 && this.state.h1Fade != 0) {
      this.setState({ h1Fade: 0 });
    }
  }

  animateOutH1(keyframe) {
    if (keyframe != 1 && keyframe != 0) {
      this.setState({ h1Fade: this.easeOutCubic(1 - keyframe) });
    }
    if (keyframe === 1 && this.state.h1Fade != 0) {
      this.setState({ h1Fade: 0 });
    }
  }

  animateInH2(keyframe) {
    if (keyframe != 1 && keyframe != 0) {
      this.setState({ h2Fade: this.easeInCubic(keyframe) });
    }
    else if (keyframe === 0 && this.state.h2Fade != 0) {
      this.setState({ h2Fade: 0 });
    }
  }

  animateOutH2(keyframe) {
    if (keyframe != 1 && keyframe != 0) {
      this.setState({ h2Fade: this.easeOutCubic(1 - keyframe) });
    }
    if (keyframe === 1 && this.state.h2Fade != 0) {
      this.setState({ h2Fade: 0 });
    }
  }


  // decelerating to zero velocity 
  easeOutCubic = t => (--t) * t * t + 1;
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
      opacity: this.state.h1Fade
    };
    const aniH2 = {
      opacity: this.state.h2Fade
    };
    return (
      <div className="App">
        <header className="App-header">





          <div className='container' onScroll={this.handelScroll}>

            <div ref={(el) => this.yourElement = el} className='welcome-text'>
              <h1 style={aniH1}>Fractal Trees</h1>
              <h2 style={aniH2}>By Lee Savage</h2>
              <p className='scroll'>Scroll for controls<br></br><FontAwesomeIcon icon={faCaretDown} /></p>
            </div>

            <Canvas className='treeCanvas'
              initLength={this.state.initLength}
              initWidth={this.state.initWidth}
              nextWidthMin={this.state.nextWidthMin}
              nextWidthMax={this.state.nextWidthMax}
              nextLengthMin={this.state.nextLengthMin}
              nextLengthMax={this.state.nextLengthMax}

              nextLengthLMin={this.state.nextLengthLMin}
              nextLengthLMax={this.state.nextLengthLMax}


              nextLengthRMin={this.state.nextLengthRMin}
              nextLengthRMax={this.state.nextLengthRMax}


              nextBendMin={this.state.nextBendMin}
              nextBendMax={this.state.nextBendMax}
            />

            <div className='controls'>
              <h3>The building block is the first rectangle it has a length and width</h3>
              <AdvancedSlider
                label="Length"
                text='The length of the first branch or trunk'
                step={1}
                precision={0}
                minValue={1}
                maxValue={100}
                value={this.state.initLength}
                valueChanged={this.handelInitLengthChanged} />

              <AdvancedSlider
                label="Width"
                text='The width of the first branch or trunk'
                step={1}
                precision={0}
                minValue={1}
                maxValue={100}
                value={this.state.initWidth}
                valueChanged={this.handelInitWidthChanged} />

              <div className='spacer'></div>
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
                valueChanged={this.handelNextLengthMinChanged}
                value2Changed={this.handelNextLengthMaxChanged} />

              <AdvancedSlider
                label="Next Length Left"
                text='The length multiplier of the next branch to the left. A value of 0.5 will mean the next branch is half the length of the last '
                numberHandles={2}
                step={0.01}
                precision={2}
                minValue={0.25}
                maxValue={0.95}
                value={this.state.nextLengthLMin}
                value2={this.state.nextLengthLMax}
                valueChanged={this.handelNextLengthLMinChanged}
                value2Changed={this.handelNextLengthLMaxChanged} />

              <AdvancedSlider
                label="Next Length Right"
                text='The length multiplier of the next branch to the right. A value of 0.5 will mean the next branch is half the length of the last '
                numberHandles={2}
                step={0.01}
                precision={2}
                minValue={0.25}
                maxValue={0.95}
                value={this.state.nextLengthRMin}
                value2={this.state.nextLengthRMax}
                valueChanged={this.handelNextLengthRMinChanged}
                value2Changed={this.handelNextLengthRMaxChanged} />


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
                valueChanged={this.handelNextWidthMinChanged}
                value2Changed={this.handelNextWidthMaxChanged} />


              <div className='spacer'></div>
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
                valueChanged={this.handelNextBendMinChanged}
                value2Changed={this.handelNextBendMaxChanged} />

              <div className='spacer'></div>

              <div className='goodbye-text'>
                <p className='thanks'>Thanks for playing</p>
              </div>

            </div>
          </div>

        </header>
      </div>
    );
  }

}

export default App;