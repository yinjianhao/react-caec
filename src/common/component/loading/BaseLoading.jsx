import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './loading.less';
import loadingImg from './img/dialog-loading.gif';

export default class Loading extends Component {

    static propTypes = {
        visible: PropTypes.bool
    }

    constructor(props) {
        super(props);

        let {visible = false} = this.props;

        this.state = {
            visible
        }
    }

    open = () => {
        this.setState({
            visible: true
        })
    }

    close = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        let classes = classNames('loading-mask', { active: this.state.visible });

        return (
            <div className={classes}>
                <div id="loading">
                    <img className="loadImg" src={loadingImg} />
                    <div className="loadContent">正在加载</div>
                </div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        let {visible = this.state.visible} = nextProps;
        this.setState({
            visible
        })
    }

    static newInstance = (properties = {}) => {
        const {el = document.body, ...props} = properties;

        let div = document.createElement('div');
        el.appendChild(div);
        let loading = ReactDOM.render(<Loading {...props} />, div);

        return {
            component: loading,
            open: function () {
                loading.open();
            },
            close: function () {
                loading.close();
            },
            destroy: function destroy() {
                ReactDOM.unmountComponentAtNode(div);
                el.removeChild(div);
            }
        };
    }
}
