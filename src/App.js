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

  constructor(props) {
    super(props);
    this.isBrowser = typeof window !== `undefined`;

    this.state = {
      initLength: 91, initWidth: 22,
      nextLengthMin: 0.6, nextLengthMax: 0.85,
      nextWidthMin: 0.56, nextWidthMax: 0.8,
      nextBendMin: 5, nextBendMax: 8,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  initLengthChange = (v) => { this.setState({ initLength: parseInt(v) }) };
  initWidthChanged = (v) => { this.setState({ initWidth: parseInt(v) }); };
  nextLengthMinChanged = (v) => this.setState({ nextLengthMin: parseFloat(v) });
  nextLengthMaxChanged = (v) => this.setState({ nextLengthMax: parseFloat(v) });
  nextWidthMinChanged = (v) => this.setState({ nextWidthMin: parseFloat(v) });
  nextWidthMaxChanged = (v) => this.setState({ nextWidthMax: parseFloat(v) });
  nextBendMinChanged = (v) => this.setState({ nextBendMin: parseFloat(v) });
  nextBendMaxChanged = (v) => this.setState({ nextBendMax: parseFloat(v) });


  handleScroll(e) {
    if (!this.isBrowser) return { x: 0, y: 0 }

    let startAtPos = window.innerHeight * 0.5;
    let stopAtPos = window.innerHeight * 1.5;
    this.animateInH1(this.createScrollKeyframe(startAtPos, stopAtPos));

    startAtPos = window.innerHeight * 2.5;
    stopAtPos = (window.innerHeight * 4.0);
    this.animateOutH1(this.createScrollKeyframe(startAtPos, stopAtPos));

    startAtPos = window.innerHeight * 1.5;
    stopAtPos = window.innerHeight * 2.5;
    let tempkeyframe = this.createScrollKeyframe(startAtPos, stopAtPos);
    this.animateInH2(tempkeyframe);

    startAtPos = window.innerHeight * 2.5;
    stopAtPos = (window.innerHeight * 3.0);
    this.animateOutH2(this.createScrollKeyframe(startAtPos, stopAtPos));

    startAtPos = window.innerHeight * 0.5;
    stopAtPos = (window.innerHeight * 4.0);
    this.animateTopH1H2(this.createScrollKeyframe(startAtPos, stopAtPos));
  }

  createScrollKeyframe(startAtPos, stopAtPos) {
    let pos = window.scrollY;
    let keyframe = ((pos - startAtPos) / (stopAtPos - startAtPos));
    return keyframe <= 0 ? 0 : (keyframe >= 1 ? 1 : keyframe);
  }

  animateTopH1H2(keyframe) {
    if (keyframe != 1 && keyframe != 0) {
      this.setState({ h1Top: ((1 - keyframe) * 15) + 35 + 'vh', h2Top: ((keyframe) * 5) + 65 + 'vw' });
    }
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
      left: this.state.h2Top,
    };
    return (
      <div className="App">
        <header className="App-header">

          <div className='sideBar'></div>



          <div className='container' onScroll={this.handelScroll}>

            <div ref={(el) => this.yourElement = el} className='welcome-text'>
              <h1 style={aniH1}>Fractal Trees</h1>
              <h2 style={aniH2}>By Lee Savage</h2>
              <p className='scroll'>Scroll for controls<br></br><FontAwesomeIcon icon={faCaretDown} /></p>
            </div>


            {/* //encapsulate everything after this */}

            <Canvas className='treeCanvas'
              initLength={this.state.initLength}
              initWidth={this.state.initWidth}
              nextWidthMin={this.state.nextWidthMin}
              nextWidthMax={this.state.nextWidthMax}
              nextLengthMin={this.state.nextLengthMin}
              nextLengthMax={this.state.nextLengthMax}
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
                valueChanged={this.nextBendMinChanged}
                value2Changed={this.nextBendMaxChanged} />

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