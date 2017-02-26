import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'rc-dialog';
import './toast.less';

class Toast extends Component {

    static propTypes = {
        onClose: PropTypes.func,
        content: PropTypes.string,
        duration: PropTypes.number,
    }

    static defaultProps = {
        prefixCls: "ui-toast",
        transitionName: 'ui-zoom',
        mask: false,
        closable: false,
        keyboard: false,
        onClose: () => { },
        duration: 3000,
    }

    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    show = () => {
        this.setState({ visible: true });
    }

    render() {
        return (
            <Dialog
                {...this.props}
                visible={this.state.visible}
                >
                {this.props.content}
            </Dialog>
        );
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.handleClose();
        }, this.props.duration)
    }

    componentWillUnmount() {
        this.clearCloseTimer();
    }

    handleClose = () => {
        this.clearCloseTimer();
        this.props.onClose();
        this.setState({ visible: false })
    }

    clearCloseTimer = () => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    static newInstance = (properties) => {
        let div = document.createElement('div');
        document.body.appendChild(div);
        let toast = ReactDOM.render(<Toast {...properties} />, div);

        return {
            component: toast,
            show: function () {
                toast.show();
            },
            destroy: function destroy() {
                ReactDOM.unmountComponentAtNode(div);
                document.body.removeChild(div);
            }
        };
    }
}

// content	提示内容	
// duration	自动关闭的延时，单位毫秒	
// onClose	关闭后回调

let toastInstance = null;

function notice(content, duration, onClose) {
    if (toastInstance) {
        toastInstance.destroy();
        toastInstance = null;
    }

    toastInstance = new Toast.newInstance({
        content,
        duration,
        onClose
    })

    toastInstance.show();
}

export default {
    show(content, duration, onClose) {
        notice(content, duration, onClose);
    }
}