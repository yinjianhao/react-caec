/**
 * Created by yin on 2017/1/16.
 * footer
 */

import React, { Component, PropTypes } from 'react';
import { withRouter, Link } from 'react-router';
import classNames from 'classnames';
import './footer.less';
import Footer from './Footer';

/**
 * 带footer的容器
 */
export default class ContainerWithFooter extends Component {

    static propTypes = {
        className: PropTypes.string,
        activeIndex: PropTypes.number
    }

    static defaultProps = {
        activeIndex: 0
    }

    constructor(props) {
        super(props);
    }

    render() {
        console.log('this.props.className',this.props.className);
        let classes = classNames('ui-footer-wrap', this.props.className);
        return (
            <div className={classes}>
                <div className="ui-footer-body">
                    {this.props.children}
                </div>
                <Footer activeIndex={this.props.activeIndex}></Footer>
            </div>
        );
    }
}