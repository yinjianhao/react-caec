import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll';



@connect()
@withRouter
export default class ListviewDemo extends Component {

    static defaultProps = {
        options: {
            probeType: 2,
            scrollX: false,
            scrollY: true,
            mouseWheel: true,
            isPullToRefresh: true
        }
    }

    constructor(props) {
        super(props);
    }

    onScrollStart(e) {
        console.log('onScrollStart', e);
    }

    onScroll(e) {
        console.log('onScroll', e);
    }

    onScrollEnd(e) {
        console.log('onScrollEnd', e);
    }

    render() {
        var i = 0, len = 1000, listOfLi = [];

        for (i; i < len; i++) {
            listOfLi.push(<li key={i}>Row {i + 1}</li>)
        }

        return (
            <div style={{ height: '100vh' }}>
                <ReactIScroll className="listview" iScroll={iScroll}
                    options={this.props.options}
                    onScrollStart={this.onScrollStart}
                    onScroll={this.onScroll}
                    onScrollEnd={this.onScrollEnd}>
                    <ul>
                        {listOfLi}
                    </ul>
                </ReactIScroll>
            </div >
        )
    }
}
