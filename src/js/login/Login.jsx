import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Tabs from '../../common/component/tabs/Tabs';
import TabPane from '../../common/component/tabs/TabPane';
import "./login.less"

import img0 from './img/0.jpg';
import img1 from './img/1.jpg';
import img2 from './img/2.jpg';
import img3 from './img/3.jpg';
import img4 from './img/4.jpg';

@connect()
@withRouter
export default class Login extends Component {

    static defaultProps = {
        swipeList: [
            { id: 0, img: img0 },
            { id: 1, img: img1 },
            { id: 2, img: img2 },
            { id: 3, img: img3 },
            { id: 4, img: img4 }
        ]
    }

    initSwipe() {
        return this.props.swipeList.map(item => {
            return <TabPane key={item.id} tab={item.id.toString()}>
                <img style={{ width: '100%' }} src={item.img} />
            </TabPane>
        })
    }

    render() {
        return (
            <div id="login">
                <Tabs onChange={() => { console.log('change') } }>
                    {this.initSwipe()}
                </Tabs>
            </div>
        );
    }
}
