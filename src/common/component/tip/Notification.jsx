import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import Notice from './Notice';

class Notification extends Component {

    static PropTypes = {
        style: PropTypes.object,
        onClose: PropTypes.func,
    }

    static defaultProps = {

    }

    constructor(props) {
        super(props);

        this.state = {
            natices: []
        }
    }

    add = (notice) => {
        let {notices} = this.state;

        this.setState({
            notices: notices.concat(notice)
        })
    }

    handleClose = () => {
        this.props.onClose();

        this.setState({
            notices: this.state.notices.slice(1)
        });
    }

    render() {
        let [notice] = this.state.notices;

        notice ?
            <Notice
                {...notice}
                onClose={this.handleClose}
            >
                {notice.content}
            </Notice>
            :
            null
    }

    static newInstance = function (properties = { el: document.body }) {
        let {el, ...props} = properties;

        let div = document.createElement('div');
        el.appendChild(div);
        let notification = ReactDOM.render(<Notification {...props} />, div);

        return {
            component: notification,
            notice(noticeProps) {
                notification.add(noticeProps);
            },
            removeNotice(key) {
                notification.remove(key);
            },
            destroy() {
                ReactDOM.unmountComponentAtNode(div);
                document.body.removeChild(div);
            },
        };
    }
}