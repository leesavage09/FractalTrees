import React from 'react';
import { Slider as CompSlider, Handles as CompHandles, Tracks, Rail } from 'react-compound-slider';
import '../css/AdvancedSlider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

class AdvancedSlider extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let v = event[0];
        v = v > this.props.maxValue ? v = this.props.maxValue : v;
        v = v < this.props.minValue ? v = this.props.minValue : v;
        this.props.valueChanged(v);
        if (this.props.numberHandles == 2) {
            let v = event[1];
            v = v > this.props.maxValue ? v = this.props.maxValue : v;
            v = v < this.props.minValue ? v = this.props.minValue : v;
            this.props.value2Changed(v);
        }
    }

    render() {
        return (
            <div className='sliderDiv'>
                <label className='sliderlabel'>{this.props.label} <FontAwesomeIcon icon={faInfoCircle} /><span className="sliderText">{this.props.text}</span></label>
                
                <CompSlider
                    className='compslider'
                    domain={[this.props.minValue, this.props.maxValue]}
                    step={this.props.step}
                    values={this.props.numberHandles == 2 ? [this.props.value, this.props.value2] : [this.props.value]}
                    onUpdate={this.handleChange}
                >

                    <Rail>
                        {({ getRailProps }) => (
                            <div className='comprail' {...getRailProps()} />
                        )}
                    </Rail>
                    <CompHandles>
                        {({ handles, getHandleProps }) => (
                            <div className="slider-handles">
                                {handles.map(handle => (
                                    <Handle
                                        key={handle.id}
                                        handle={handle}
                                        precision={this.props.precision}
                                        getHandleProps={getHandleProps}
                                    />
                                ))}
                            </div>
                        )}
                    </CompHandles>
                    <Tracks left={this.props.numberHandles != 2} right={false}>
                        {({ tracks, getTrackProps }) => (
                            <div className="slider-tracks">
                                {tracks.map(({ id, source, target }) => (
                                    <Track
                                        key={id}
                                        source={source}
                                        target={target}
                                        getTrackProps={getTrackProps}
                                    />
                                ))}
                            </div>
                        )}
                    </Tracks>
                </CompSlider>


            </div>
        );
    }
}

export default AdvancedSlider;


function Handle({ handle: { id, value, percent }, getHandleProps, precision }) {
    return (
        <div
            style={{ left: `${percent}%` }}
            className='handle'
            {...getHandleProps(id)}
        >
            <div className='handle-label'>{value.toFixed(precision)}</div>
        </div>
    )
}


function Track({ source, target, getTrackProps }) {
    return (
        <div
            className='track'
            style={{
                left: `${source.percent}%`,
                width: `${target.percent - source.percent}%`,
            }}
            {...getTrackProps() }
        />
    )
}