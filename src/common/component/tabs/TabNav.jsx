import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './tabs.less';

export default class TabNav extends Component {

    static propTypes = {
        activeIndex: PropTypes.number,
        onTabClick: PropTypes.func,
        panels: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ])
    }

    constructor(props) {
        super(props);
    }

    _renderTabNavItem() {
        const {panels, activeIndex, onTabClick} = this.props;

        return React.Children.map(panels, (child, index) => {
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
                </td>
            )
        })
    }

    render() {
        const {activeIndex} = this.props;
        const tabNav = this._renderTabNavItem();
        const length = tabNav.length;

        const style = {
            width: 100 / length + '%',
            left: activeIndex / length * 100 + '%'
        }

        return (
            <div className="ui-tabnav">
                <table className="ui-tabnav-list">
                    <tbody>
                        <tr>
                            {tabNav}
                        </tr>
                    </tbody>
                </table>
                <div className="ui-tabnav-line" style={style}></div>
            </div>
        );
    }
}
