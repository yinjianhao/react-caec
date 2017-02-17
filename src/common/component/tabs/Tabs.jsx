/**
 * Created by yin on 2017/1/15.
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './tabs.less';
import TabNav from './TabNav';
import TabContent from './TabContent';

const Tabs = class Tabs extends Component {

    static propTypes = {
        className: PropTypes.string,
        activeIndex: PropTypes.number,
        onChange: PropTypes.func
    }

    static defaultProps = {
        activeIndex: 0,
        onChange: () => { }
    }

    constructor(props) {
        super(props);

        this._handleTabChange = this._handleTabChange.bind(this);

        let {activeIndex, options} = this.props;

        this.state = {
            activeIndex: options && options.initialSlide || activeIndex,
            preIndex: activeIndex
        }
    }

    // componentWillReceiveProps(nextProps) {

    // }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    _handleTabChange(index) {
        let currentIndex = this.state.activeIndex;
        if (currentIndex !== index) {
            this.setState({
                activeIndex: index,
                preIndex: currentIndex
            });
            this.props.onChange(index, currentIndex);
        }
    }

    _renderTabNav() {
        return (
            <TabNav
                onTabClick={this._handleTabChange}
                panels={this.props.children}
                activeIndex={this.state.activeIndex}
                options={this.props.options}
            />
        )
    }

    _renderTabContent() {
        return (
            <TabContent
                onTabChange={this._handleTabChange}
                panels={this.props.children}
                activeIndex={this.state.activeIndex}
            />
        )
    }

    render() {
        const {className} = this.props;
        const classes = classNames(className, 'ui-tabs');

        return (
            <div className={classes}>
                {this._renderTabNav()}
                {this._renderTabContent()}
            </div>
        );
    }
}

const TabPane = class TabPane extends Component {

    static propTypes = {
        tab: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ])
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}

export default Tabs

export {
    TabPane,
    Tabs
}