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
        onChange: PropTypes.func,
        tabPosition: PropTypes.oneOf(['top', 'bottom']),
        type: PropTypes.oneOf(['table', 'swipe']),
        options: PropTypes.object,
    }

    static defaultProps = {
        activeIndex: 0,
        onChange: () => { },
        tabPosition: 'top',
        type: 'table',
        options: {}
    }

    constructor(props) {
        super(props);

        let {activeIndex, options} = props;

        this.state = {
            activeIndex: options && options.initialSlide || activeIndex,
            preIndex: activeIndex
        }
    }

    _handleTabChange = (index) => {
        let currentIndex = this.state.activeIndex;
        if (currentIndex !== index) {
            this.setState({
                activeIndex: index,
                preIndex: currentIndex
            });
            this.props.onChange(index, currentIndex);
        }
    }

    _renderTabNav = () => {
        const {children, type, options} = this.props;
        return (
            <TabNav
                onTabClick={this._handleTabChange}
                panels={children}
                activeIndex={this.state.activeIndex}
                type={type}
                options={options}
                />
        )
    }

    _renderTabContent = () => {
        return (
            <TabContent
                onTabChange={this._handleTabChange}
                panels={this.props.children}
                activeIndex={this.state.activeIndex}
                />
        )
    }

    render() {
        const {className, tabPosition} = this.props;
        const classes = classNames('ui-tabs', className, tabPosition);

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

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}

Tabs.TabPane = TabPane;

export default Tabs

export {
    TabPane,
    Tabs
}