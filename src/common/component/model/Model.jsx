import React, { Component, PropTypes } from 'react';
import Dialog from 'rc-dialog';
import './model.less';

export default class Model extends Component {

    static propTypes = {
        wrapClassName: PropTypes.string,
        transitionName: PropTypes.string,
        maskTransitionName: PropTypes.string,
        mask: PropTypes.bool,
        closable: PropTypes.bool,
        keyboard: PropTypes.bool,
        onClose: PropTypes.func,
        title: PropTypes.string,
        visible: PropTypes.bool,
        maskClosable: PropTypes.bool,
        footer: PropTypes.array,
    }

    static defaultProps = {
        prefixCls: "ui-dialog",
        transitionName: 'ui-zoom',
        maskTransitionName: 'ui-fade',
        visible: false,
        mask: true,
        maskClosable: true,
        closable: false,
        keyboard: false,
        onClose: () => { },
    }

    renderFooterButton = (button, index, prefixCls) => {
        const handleClick = function (e) {
            if (typeof button.onClick === 'function') {
                button.onClick();
            }
        };

        return (
            <div key={index} className={`${prefixCls}-button`} style={button.style} onClick={handleClick}>
                {button.text}
            </div>
        );
    }

    render() {
        let {prefixCls, footer = []} = this.props;

        const btnGroupClass = `${prefixCls}-button-group ${footer.length === 2 ? `${prefixCls}-button-group-two` : ''}`;
        let footerDom = footer.length ?
            <div className={btnGroupClass}>
                {footer.map((button, index) => this.renderFooterButton(button, index, prefixCls))}
            </div>
            :
            null;

        return (
            <Dialog
                {...this.props}
                footer={footerDom}
                />
        );
    }
}
