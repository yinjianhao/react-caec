import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import "../assets/index.less"

export default class Checkbox extends Component {
    static PropTypes = {
        checked: PropTypes.bool,
        className: PropTypes.string,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {

        this.props.onChange && this.props.onChange(event);
    };

    render() {
        const {isChecked = false} = this.props;
        return (
            <input className={this.props.className} type="checkbox" checked={isChecked} onClick={this.handleChange} />
        )
    };
}
