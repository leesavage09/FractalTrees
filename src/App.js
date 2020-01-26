import React from 'react';
import './assets/css/App.css';
import AdvancedSlider from './assets/components/AdvancedSlider';
import Canvas from './assets/components/Canvas.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {



  constructor(props) {
    super(props);
    this.state = { initLength: 65, initWidth: 35, nextWidthMin: 0.4, nextWidthMax: 0.8 };
    this.handelInitLengthChanged = this.handelInitLengthChanged.bind(this);
    this.handelInitWidthChanged = this.handelInitWidthChanged.bind(this);
    this.handelNextWidthMinChanged = this.handelNextWidthMinChanged.bind(this);
    this.handelNextWidthMaxChanged = this.handelNextWidthMaxChanged.bind(this);
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

  /**  controls to add
      branchWidth 
      
      bendMin bendMax
      
      fruitChance
      leafChance
  
      mainDieOff
      mainNextLenMulti min max
      mainNextAngle min max
  
      leftDieOff
      leftNextLenMulti min max
      leftNextAngle min max
  
      rightDieOff
      rightNextLenMulti min max
      rightNextAngle min max
   */

  render() {
    return (
      <div className="App">
        <header className="App-header">


          <div className='treeContainer'>
            <Canvas className='treeCanvas' initLength={this.state.initLength}
              initWidth={this.state.initWidth}
              nextWidthMin={this.state.nextWidthMin}
              nextWidthMax={this.state.nextWidthMax} />
          </div>
          <div className='container'>

            <div className='welcome-text'>
              <h1>Fractal Trees</h1>
              <h2>By Lee Savage</h2>
              <p className='scroll'>Scroll for controls<br></br><FontAwesomeIcon icon={faCaretDown} /></p>
            </div>

            <div className='controls'>
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

              <AdvancedSlider
                label="Next Width"
                text='The width multiplier of the next branch. A value of 0.5 will mean the next branch is half the width '
                numberHandles={2}
                step={0.01}
                precision={2}
                minValue={0.01}
                maxValue={1.50}
                value={this.state.nextWidthMin}
                value2={this.state.nextWidthMax}
                valueChanged={this.handelNextWidthMinChanged}
                value2Changed={this.handelNextWidthMaxChanged} />
            </div>
          </div>

        </header>
      </div>
    );
  }

}

export default App;