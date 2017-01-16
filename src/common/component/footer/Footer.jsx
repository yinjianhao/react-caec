/**
 * Created by yin on 2017/1/16.
 * footer
 */

import React, { Component, PropTypes } from 'react';
import { withRouter, Link } from 'react-router';
import classNames from 'classnames';
import './footer.less';
import config from './config.js';

/**
 * footer
 * 根据config配置
 */
@withRouter
export default class Footer extends Component {

    constructor(props) {
        super(props);

        let {activeIndex = 0} = this.props;
        let {footers} = config;

        this.state = {
            activeIndex,
            footers
        }
    }

    _renderFooter() {
        let {activeIndex} = this.state;

        return this.state.footers.map((footer, index) => {
            let wrapClasses = classNames('ui-tab-item', {
                'active': activeIndex == index
            });
            let classes = classNames('ui-detailicon', activeIndex == index ? footer.onIcon : footer.offIcon);
            return (
                <div key={index} className={wrapClasses} onClick={this._handleClick.bind(this, index)}>
                    <i className={classes}></i>
                    <div className="ui-footer-name">{footer.name}</div>
                </div>
            )
        })
    }

    _handleClick(index) {
        let {activeIndex, footers} = this.state;
        if (activeIndex != index) {
            this.props.router.push(footers[index].router);
        }
    }

    render() {
        return (
            <footer id="ui-footer" className="border-t">
                {this._renderFooter()}
            </footer>
        );
    }
}
