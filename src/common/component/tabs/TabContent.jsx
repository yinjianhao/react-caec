import React, {Component, PropTypes} from 'react';
import Swipe from 'react-swipe';
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

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.refs.swipe.slide(nextProps.activeIndex);
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
        const swipeOptions = {
            startSlide: activeIndex,
            continuous: false,
            callback: function (index, elem) {
                onTabChange(index)
            }
        };

        // console.log(panels);
        // console.log(this._initPanels());

        return (
            <div className="ui-tabcontent">
                <Swipe ref="swipe" swipeOptions={swipeOptions}>
                    {this._initPanels()}
                </Swipe>
            </div>
        );
    }
}
