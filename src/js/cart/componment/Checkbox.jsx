import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import "./checkbox.less";

export default class Checkbox extends Component {
    static PropTypes = {
        checked: PropTypes.bool,
        className: PropTypes.string,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        // const {isChecked = false, className} = this.props;

        // this.state = {
        //     isChecked
        // }
    };

    handleChange(event) {
        let {isChecked} = this.props;

        this.props.onChange && this.props.onChange(!isChecked);

        // this.setState({
        //     isChecked: !isChecked
        // })
    };

    render() {
        const {isChecked = false, className} = this.props;

        let classes = classNames('checkbox', className, {
            'checked': isChecked
        })
        // console.log(classes);  
        return (
            <div className={classes} onClick={this.handleChange}>
                <i className="icon-checked checkbox-content"></i>
            </div>
        )
    };
}
