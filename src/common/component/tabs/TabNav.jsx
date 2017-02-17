import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Swiper from '../swiper/swiper';
import './tabs.less';

export default class TabNav extends Component {

    static propTypes = {
        options: PropTypes.object,
        activeIndex: PropTypes.number,
        onTabClick: PropTypes.func,
        panels: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ])
    }

    constructor(props) {
        super(props);

        this.state = {
            isSwiper: !!this.props.options
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isSwiper && nextProps.activeIndex !== this.props.activeIndex) {
            this.refs.swiper.slideTo(nextProps.activeIndex);
        }
    }

    _renderTabNavItem() {
        const {panels, activeIndex, onTabClick, options} = this.props;

        if (this.state.isSwiper) {
            return (
                <Swiper ref="swiper" className="ui-tabnav-list" options={options}>
                    {
                        React.Children.map(panels, (child, index) => {
                            let classes = classNames('ui-tab-item', {
                                'active': activeIndex === index
                            })

                            return (
                                <div
                                    className={classes}
                                    key={index}
                                    onClick={onTabClick.bind(this, index)}
                                >
                                    {child.props.tab}
                                    <div className="ui-tabnav-line"></div>
                                </div>
                            )
                        })
                    }
                </Swiper>
            )
        }

        return (
            <table className="ui-tabnav-list">
                <tbody>
                    <tr>
                        {
                            React.Children.map(panels, (child, index) => {
                                let classes = classNames('ui-tab-item', {
                                    'active': activeIndex === index
                                })

                                return (
                                    <td
                                        className={classes}
                                        key={index}
                                        onClick={onTabClick.bind(this, index)}
                                    >
                                        {child.props.tab}
                                        <div className="ui-tabnav-line"></div>
                                    </td>
                                )
                            })
                        }
                    </tr>
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div className="ui-tabnav">
                {this._renderTabNavItem()}
            </div>
        );
    }
}
