import React, { Component, PropTypes } from 'react';

export default class TabPane extends Component {

    static propTypes = {
        tab: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ])
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}
