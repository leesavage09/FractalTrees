import React from 'react';
import './assets/css/App.css';
import AdvancedSlider from './assets/components/AdvancedSlider';
import Canvas from './assets/components/Canvas.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Animate from './assets/helperClass/Animate';
import DefaultTrees from './assets/helperClass/DefaultTrees';

class App extends React.Component {

  /**
   * Get scroll events
   */
  componentDidMount() {
    window.addEventListener('scroll', this.animateUI.bind(this)); //TODO is this good in react?
  }

  constructor(props) {
    super(props);
    this.state = DefaultTrees.basicTree;
  }

  /**
   * Some default trees
   */
  christmasTree = () => this.setState(DefaultTrees.christmasTree);
  niceTree = () => this.setState(DefaultTrees.niceTree);
  basicTree = () => this.setState(DefaultTrees.basicTree);
  squareTree = () => this.setState(DefaultTrees.squareTree);
  crazyTree = () => this.setState(DefaultTrees.crazyTree);
  ballTree = () => this.setState(DefaultTrees.ballTree);
  oakTree = () => this.setState(DefaultTrees.oakTree);
  shrubTree = () => this.setState(DefaultTrees.shrubTree);

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
  wireframeToggle = (v) => this.setState({ wireframe: !this.state.wireframe });//TODO async issues?

  /**
   * Create animations based on scroll positions realtive to VH units
   * @param {a scroll event} e 
   */
  animateUI() {
    let vh = window.innerHeight;
    let fIn = Animate.animateFadeIn;
    let fInHold = Animate.animateFadeInAndHold;
    let fOut = Animate.animateFadeOut;
    let keyFrame = Animate.createScrollKeyframe;
    let motion = Animate.animateMotion;

    fIn(keyFrame(vh * 0, vh * 1), 'h1', this);
    fIn(keyFrame(vh * 0.75, vh * 1.25), 'h2', this);
    fOut(keyFrame(vh * 1.5, vh * 2.5), 'h2', this);
    fOut(keyFrame(vh * 2, vh * 3), 'h1', this);
    motion(keyFrame(vh * 0, vh * 3), 15, 5, 35, 55, 'h1', this);
    motion(keyFrame(vh * 0, vh * 3), 15, 5, 35, 55, 'h2', this);

    let pStart = 2.5;
    for (let i = 1; i <= 9; i++) {
      fIn(keyFrame(vh * pStart, vh * (pStart + 1)), `p${i}`, this);
      fOut(keyFrame(vh * (pStart + 1), vh * (pStart + 2)), `p${i}`, this);
      motion(keyFrame(vh * pStart, vh * (pStart + 2)), 15, 0, 15, 0, `p${i}`, this);
      pStart = pStart + 2;
    }

    fInHold(keyFrame(vh * pStart, vh * (pStart + 3)), 'g1', this);
    motion(keyFrame(vh * pStart, vh * (pStart + 3)), 25, 0, 15, 0, 'g2', this);
  }

  render() {
    const aniH1 = {
      opacity: this.state.h1Fade,
      top: this.state.h1Top,
      display: this.state.h1Display,
    };
    const aniH2 = {
      opacity: this.state.h2Fade,
      left: this.state.h2Left,
      display: this.state.h2Display,
    };
    const aniP1 = {
      opacity: this.state.p1Fade,
      top: this.state.p1Top,
      display: this.state.p1Display,
    };
    const aniP2 = {
      opacity: this.state.p2Fade,
      top: this.state.p2Top,
      display: this.state.p2Display,
    };
    const aniP3 = {
      opacity: this.state.p3Fade,
      top: this.state.p3Top,
      display: this.state.p3Display,
    };
    const aniP4 = {
      opacity: this.state.p4Fade,
      top: this.state.p4Top,
      display: this.state.p4Display,
    };
    const aniP5 = {
      opacity: this.state.p5Fade,
      top: this.state.p5Top,
      display: this.state.p5Display,
    };
    const aniP6 = {
      opacity: this.state.p6Fade,
      top: this.state.p6Top,
      display: this.state.p6Display,
    };
    const aniP7 = {
      opacity: this.state.p7Fade,
      top: this.state.p7Top,
      display: this.state.p7Display,
    };
    const aniP8 = {
      opacity: this.state.p8Fade,
      top: this.state.p8Top,
      display: this.state.p8Display,
    };
    const aniP9 = {
      opacity: this.state.p9Fade,
      top: this.state.p9Top,
      display: this.state.p9Display,
    };
    const aniG1 = {
      opacity: this.state.g1Fade,
      display: this.state.g1Display,
    };
    const aniG2 = {
      top: this.state.g2Top,
    };

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
              minValue={1}
              maxValue={250}
              value={this.state.initLength}
              valueChanged={this.initLengthChange}
            />
            <AdvancedSlider
              label="Width"
              text='The width of the first branch or trunk'
              minValue={1}
              maxValue={100}
              value={this.state.initWidth}
              valueChanged={this.initWidthChanged} />
          </div>

          <div style={aniP3} className='text-block'>
            <h3>But it doesn't look very much like a real tree</h3>
            <p className='text'>I have always been fascinated by the idea that the universe is built on simple laws. The language of the universe appears to be mathematics. So how can we make the trees more natural. One key aspect is of this is a little randomness, some of the controls have 2 values. The algorithm will choose a random value in the range you select.</p>
          </div>

          <div className='spacer'></div>
          <div style={aniP4} className='text-block'>
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
          <div style={aniP5} className='text-block'>
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
          <div style={aniP6} className='text-block'>
            <h3>Everything Dies</h3>
            <AdvancedSlider
              label="Main Death Rate"
              text='The probability the main trunk will survive'
              numberHandles={2}
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
              minValue={0}
              maxValue={100}
              value={this.state.deathSideMin}
              value2={this.state.deathSideMax}
              valueChanged={this.deathSideMinChanged}
              value2Changed={this.deathSideMaxChanged} />
          </div>



          <div className='spacer'></div>
          <div style={aniP7} className='text-block'>
            <h3>The angles are all wrong</h3>
            <AdvancedSlider
              label="Next angle "
              text='The next angle of the main trunk'
              numberHandles={2}
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
              minValue={0}
              maxValue={150}
              value={this.state.nextSideAngleMin}
              value2={this.state.nextSideAngleMax}
              valueChanged={this.nextSideAngleMinChanged}
              value2Changed={this.nextSideAngleMaxChanged} />
          </div>





          <div className='spacer'></div>
          <div style={aniP8} className='text-block'>
            <h3>Decoration</h3>
            <AdvancedSlider
              label="Fruit Chance"
              text='The probability of fruit'
              step={0.2}
              precision={0}
              minValue={0}
              maxValue={100}
              value={this.state.fruit}
              valueChanged={this.fruitChanged} />
            <AdvancedSlider
              label="Leaf Chance"
              text='The probability of a leaf'
              step={0.2}
              precision={0}
              minValue={0}
              maxValue={100}
              value={this.state.leaf}
              valueChanged={this.leafChanged} />
            <input type="button" value='Wireframe Mode' onClick={this.wireframeToggle} />
          </div>

          <div className='spacer'></div>
          <div style={aniP9} className='text-block'>
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

          <div style={aniG1} className='goodbye-sky'>
            <p style={aniG2} className='goodbye-text'>
              Thanks for playing<br></br>
            <a href="https://github.com/leesavage09/FractalTrees">View Source on github</a>
            </p>
          </div>
          <div style={aniG1} className='goodbye-ground' />



        </header>
      </div >
    );
  }
}
export default App;