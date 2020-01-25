import React from 'react';

class Sliders extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 50};
    this.handleChange = this.handleChange.bind(this);
 
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <input type="range" min="1" max="100" value={this.state.value} onChange={this.handleChange} />
    );
  }
}

export default Sliders;
