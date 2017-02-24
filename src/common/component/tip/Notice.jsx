import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import Notice from './Notice';
import './notification.less';

class Notification extends Component {

    static PropTypes = {
        duration: PropTypes.number,
        onClose: PropTypes.func,
        children: PropTypes.any,
        className: PropTypes.string,
        style: PropTypes.object,
    }

    static defaultProps = {
        className: '',
        duration: 2000,
        onClose: () => { },
    }

    render() {
        let {className, style} = this.props;

        <div className={`ui-notice-wrap ${className}`} style={style}>
            {this.props.children}
        </div>
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.handleClose();
        }, this.props.duration)
    }

    componentWillUnmount() {
        this.clearCloseTimer();
    }

    handleClose = () => {
        this.clearCloseTimer();
        this.props.onClose();
    }

    clearCloseTimer = () => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
}