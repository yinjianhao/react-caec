import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Swipe from '../../common/component/swipe/Swipe';
import Tabs from '../../common/component/tabs/Tabs';
import TabPane from '../../common/component/tabs/TabPane';
import Footer, { WrapWithFooter } from '../../common/component/footer/Footer';
import "./home.less"

import img0 from './img/0.jpg';
import img1 from './img/1.jpg';
import img2 from './img/2.jpg';
import img3 from './img/3.jpg';
import img4 from './img/4.jpg';

@connect()
@withRouter
export default class Home extends Component {

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
            return (
                <div key={item.id}>
                    <img style={{ width: '100%' }} src={item.img} />
                </div>
            )
        })
    }

    render() {
        return (
            <WrapWithFooter activeIndex="0">
                <div id="home">
                    <Swipe swipeOptions={{ auto: 5000, speed: 500 }} >
                        {this.initSwipe()}
                    </Swipe>
                    <div className="grid">
                        <ul id="nav">
                            <li className="buy col-20" data-value="3">
                                <i className="icon icon-car-buy" style={{ 'backgroundColor': '#0378ec' }}></i>
                                <div className="h5">我要买车</div>
                            </li>
                            <li className="customize col-20" data-value="2">
                                <i className="icon icon-car-diy" style={{ 'backgroundColor': '#fd491a' }}></i>
                                <div className="h5">定制爱车</div>
                            </li>

                            <li className="boutique col-20" data-value="4">
                                <i className="icon icon-car-parts" style={{ 'backgroundColor': '#fea203' }}></i>
                                <div className="h5">精品配件</div>
                            </li>
                            <li className="serviceOl col-20" data-value="7">
                                <i className="icon icon-insurance" style={{ 'backgroundColor': '#41c961' }}></i>
                                <div className="h5">汽车保险</div>
                            </li>
                            <li className="dealer col-20" data-value="5">
                                <i className="icon icon-dealer-locator" style={{ 'backgroundColor': '#ff3050' }}></i>
                                <div className="h5">经销商查询</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </WrapWithFooter>
        );
    }
}
