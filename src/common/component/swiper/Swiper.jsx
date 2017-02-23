import React, { Component, PropTypes } from 'react';
import swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

export default class ReactSwiper extends Component {

    static defaultProps = {
        containerStyle: {
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
        },
        options: {}
    }

    constructor(props) {
        super(props);
    }

    getSwiperInstance = () => {
        return this.swiper;
    }

    slidePrev = () => {
        this.swiper.slidePrev();
    }

    slideNext = () => {
        this.swiper.slideNext();
    }

    slideTo = (index, speed, callback) => {
        this.swiper.slideTo(index, speed, callback);
    }

    render() {
        const {children, className = ''} = this.props;

        return (
            <div ref="swiperContainer" className={`swiper-container ${className}`} style={this.props.containerStyle}>
                <div className="swiper-wrapper" style={{ 'boxSizing': 'border-box' }}>
                    {
                        React.Children.map(children, (child, index) => {
                            return React.cloneElement(child, {
                                className: `swiper-slide ${child.props.className}`
                            })
                        })
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.swiper = new swiper(this.refs.swiperContainer, this.props.options);
    }

    componentWillUnmount() {
        this.swiper.destroy(false);
        this.swiper = null;
    }
}
