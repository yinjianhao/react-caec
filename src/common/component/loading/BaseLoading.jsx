import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './loading.less';
import loadingImg from './img/dialog-loading.gif';

export default class Loading extends Component {

    static propTypes = {
        isLoading: PropTypes.bool
    }

    constructor(props) {
        super(props);

        let {isLoading = false} = this.props;

        this.state = {
            isLoading
        }
    }

    open = () => {
        this.setState({
            isLoading: true
        })
    }

    close = () => {
        this.setState({
            isLoading: false
        })
    }

    render() {
        let classes = classNames('loading-mask', { active: this.state.isLoading });

        return (
            <div className={classes}>
                <div id="loading">
                    <img className="loadImg" src={loadingImg} />
                    <div className="loadContent">正在加载</div>
                </div>
            </div>
        );
    }

    static newInstance = (props = { el: document.body }) => {
        const {el, ...prop} = props;

        let div = document.createElement('div');
        el.appendChild(div);
        let loading = ReactDOM.render(<Loading {...prop} />, div);

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
