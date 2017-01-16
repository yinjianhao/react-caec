import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './loading.less';
import loadingImg from './img/dialog-loading.gif';

export default class Loading extends Component {

    static PropTypes = {
        isLoading: PropTypes.bool
    }

    constructor(props) {
        super(props);

        let {isLoading = true} = this.props;

        this.state = {
            isLoading
        }
    }

    hide() {
        this.setState({
            isLoading: false
        })
    }

    show() {
        this.setState({
            isLoading: true
        })
    }

    render() {
        let classes = classNames('loading-mask', { active: this.state.isLoading });

        return (
            <div className={classes}>
                <div id="loading">
                    <img className="loadImg" src={loadingImg} />
                    <div className="loadContent">正在加载</div>
                </div>
            </div>
        );
    }
}
