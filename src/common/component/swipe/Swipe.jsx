/**
 * Created by yin on 2017/1/14.
 * 带分页的轮播
 */

import React, { Component, PropTypes } from 'react';
import Swipe from 'react-swipe';
import classNames from 'classnames';
import _ from 'lodash';
import './swipe.less';

export default class SwipeWithPagination extends Component {

    constructor(props) {
        super(props);

        let {swipeOptions} = this.props;
        let activeIndex = swipeOptions && swipeOptions.startSlide || 0;

        this.state = {
            activeIndex
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.activeIndex !== this.state.activeIndex;
    // }

    render() {
        let props = _.cloneDeep(this.props);
        let {swipeOptions = {}} = props;
        let {callback} = swipeOptions;
        let that = this;

        swipeOptions.callback = function (index, elem) {
            // console.log(index);
            if (typeof callback === 'function') {
                callback.call(this, index, elem);
            }
            that.setState({
                activeIndex: index
            });
        }

        // console.log(props);
        return (
            <div className="swipe-wrap">
                <Swipe {...props}>
                    {this.props.children}
                </Swipe>
                <div className="swipe-pagination">{this._initPagination()}</div>
            </div>
        );
    }

    /**
     * 初始化小圆点
     */
    _initPagination() {
        let activeIndex = this.state.activeIndex;
        let l = this.props.children.length;
        let paginations = [];
        let classname = '';

        for (let i = 0; i < l; i++) {
            classname = classNames('swipe-pagination-item', { active: activeIndex === i });
            paginations.push(<span key={i} className={classname}></span>);
        }

        return paginations;
    }
}
