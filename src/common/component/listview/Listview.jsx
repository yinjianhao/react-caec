import React, { Component, PropTypes } from 'react';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll';

import className from 'classnames';
import _ from 'lodash';

import "./listview.less";

export default class Listview extends Component {

    static PropTypes = {
        error: PropTypes.string
    }

    static defaultProps = {
        options: {
            probeType: 2,
            scrollX: false,
            scrollY: true,
            mouseWheel: true,
            isPullToRefresh: true
        }
    }

    constructor(props) {
        super(props);

        this._onScrollStart = this._onScrollStart.bind(this);
        this._onScroll = this._onScroll.bind(this);
        this._onScrollEnd = this._onScrollEnd.bind(this);

        const {options = {}} = this.props

        this.state = {
            downStage: 1,
            pullStage: 1,
            labelTip: '下拉刷新',
            empty: false,
            hidden: true,
            isLoading: false,
            pageSize: options.pageSize || 20,
            pageIndex: options.pageIndex || 1
        }
    }

    render() {

        let {downStage, pullStage} = this.state;

        let downTip = downStage === 1 ? '下拉刷新' : downStage === 2 ? '释放更新' : '加载中,请稍候...';
        if (empty) {
            pullTip = '我也是有底线的'
        } else {
            pullTip = pullStage === 1 ? '上拉加载更多...' : '加载中,请稍候...';
        }

        return (
            <ReactIScroll className="listview" iScroll={iScroll}
                options={this.props.options}
                onScrollStart={this._onScrollStart}
                onScroll={this._onScroll}
                onScrollEnd={this._onScrollEnd}>

                <div className="scroller">
                    <div className="pulldown">
                        <span className="icon"></span>
                        <span className="label">{downTip}</span>
                    </div>
                    <div className="message">
                        <div className="empty">暂无数据</div>
                        <div className="error">数据加载失败</div>
                    </div>
                    <ul className="listview-container">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>0</li>
                    </ul>
                    <div className="pullup">
                        <span className="icon"></span>
                        <span className="label">{pullTip}</span>
                    </div>
                </div>

            </ReactIScroll>
        )
    }

    _onScrollStart(event) {
        const {empty, isLoading} = this.state;

        event.startY = event.y;
        if (!empty && isLoading) {
            this.setSate({
                hidden: false
            })
        }
    }

    _onScroll(event) {
        const {empty, isLoading} = this.state;
        let state = {};

        if (event.y > 10) {
            event.minScrollY = 0;
            state.downStage = 2;
        } else if (this.y < 10 && isLoading) {
            event.minScrollY = -50;
            state.downStage = 1;
        }

        //上拉&如果没有结束
        if (!empty && isLoading) {
            state.pullStage = 1;
        }

        if (!_.isEmpty(state)) {
            this.setState(state);
        }
    }

    _onScrollEnd(event) {
        const {downStage, hidden, isLoading} = this.state;

        if (downStage === '2') {
            this._onPullDown();
        }

        //设置滑动距离底部还有60px的距离时自动加载
        if (event.startY - event.y >= 0 && Math.abs(event.maxScrollY) - Math.abs(event.y) < 60 && !hidden && !isLoading) {
            this._onPullUp();
        }
    }

    _onPullDown() {

    }

    _onPullUp() {

    }

    _reloadData() {
        this.reset();
        this.dataSource.clear();
        this.IScroll.minScrollY = 0;
        this.IScroll.isLoading = true;
        this.IScroll.scrollTo(0, 0, 600, "");
        this.$pullDown.removeClass('flip').addClass('loading').find('.label').html(
            '加载中,请稍候...'); //第一次加载也需要菊花图
        setTimeout(function () {
            me.dataSource.loadData(me.page, me.pageSize, function (result, finish) {
                if (result == null || result == "") result = [];
                //success callback
                me.IScroll.isLoading = false;
                me.isisLoading = true;
                // me.el.classList.remove('pulleddown');
                me.$pullDown.removeClass('flip loading').find('.label').html(
                    '下拉刷新...');

                //loadmore
                if (finish) {
                    me.$('.loadmore').removeClass('visible');
                    me.$pullUp.addClass('_hidden').addClass('_empty');
                } else {
                    me.$('.loadmore').addClass('visible');
                    me.$pullUp.addClass('withpullup');
                    me.$pullUp.removeClass('_empty').removeClass('_hidden').find(
                        '.label').html('上拉加载更多...');
                }

                //显示没有更多数据
                if (finish && result.length == 0) {
                    me.$('.message, .message .empty').addClass('visible');
                };

                //remove all
                me.deleteAllItems();
                //append items
                result.forEach(function (data) {
                    var item = new me.itemClass({
                        data: data
                    });
                    item.setEditing(me.editing);
                    me.addItem(item);
                });
                //添加懒加载
                me.addLazyLoad();
                me.refresh();

                //若数据加载非异步，则load事件会先于用户的listenTo方法执行，使用setTimeout延迟load事件触发时机
                setTimeout(function () {
                    me.trigger('load', me);
                    me.setScrollerMinHeight();
                }, 0);

            }, function (error, status, isabort) {
                // me.reset();
                me.IScroll.isLoading = false;
                if (isabort != true) { //手动中断请求不提示加载数据失败

                    me.$pullUp.removeClass('withpullup');
                    me.$pullUp.addClass('_hidden');
                    me.$pullDown.removeClass('flip loading').find('.label').html(
                        '下拉刷新...');
                    if (!me.isisLoading) {
                        me.$('.message, .message .error').addClass('visible');
                    } else {
                        Dialog.showToast('加载数据失败！')
                    }
                }
                me.refresh();
                setTimeout(function () {
                    me.trigger('error', me);
                    me.setScrollerMinHeight();
                }, 0);
            });
        }, this.isPullToRefresh ? 400 : 0);
    }
}