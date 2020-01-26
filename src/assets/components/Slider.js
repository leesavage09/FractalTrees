import React from 'react';

class Slider extends React.Component  {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.target.value = event.target.value > this.props.maxValue ? event.target.value = this.props.maxValue : event.target.value;
    event.target.value = event.target.value < this.props.minValue ? event.target.value = this.props.minValue : event.target.value;
    this.props.onSlidersChanged(event.target.value);
  }

  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input type="range" step={this.props.step} min={this.props.minValue} max={this.props.maxValue} value={this.props.value} onChange={this.handleChange} />
        <input type="number" min={this.props.minValue} max={this.props.maxValue} value={this.props.value} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Slider;
