import React, { Component, PropTypes } from 'react';
// import Swipe from 'react-swipe';
import Swiper from '../swiper/swiper';
import './tabs.less';

export default class TabContent extends Component {

    static propTypes = {
        activeIndex: PropTypes.number,
        onTabChange: PropTypes.func,
        panels: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ])
    };

    static defaultProps = {
        activeIndex: 0,
        onTabChange: () => { },
    }

    componentWillReceiveProps(nextProps) {
        if ('activeIndex' in nextProps) {
            // this.refs.swipe.slide(nextProps.activeIndex);
            this.refs.swiper.slideTo(nextProps.activeIndex);
        }
    }

    _initPanels() {
        const {panels} = this.props;

        return React.Children.map(panels, child => {
            return (
                <div className="ui-tabcontent-wrap">
                    {child}
                </div>
            )
        })
    }

    render() {
        const {activeIndex, onTabChange} = this.props;
        const options = {
            // startSlide: activeIndex,
            // continuous: false,
            // callback: function (index, elem) {
            //     onTabChange(index)
            // },
            initialSlide: activeIndex,
            onSlideChangeEnd: function (swiper) {
                onTabChange(swiper.activeIndex);
            }
        };

        return (
            <div className="ui-tabcontent">
                <Swiper ref="swiper" options={options}>
                    {this._initPanels()}
                </Swiper>
            </div>
        );
    }
}
