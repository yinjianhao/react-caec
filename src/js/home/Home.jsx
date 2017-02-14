import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Swipe from '../../common/component/swipe/Swipe';
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
        ],
        sellList: [
            { id: 0, img: 'http://mall.changan.com.cn/goods-img/img/otherimg/pic/2016/08/31/20/1472646301936.jpg' },
            { id: 1, img: 'http://mall.changan.com.cn/goods-img/img/otherimg/pic/2016/08/31/21/1472650795953.jpg' },
            { id: 2, img: 'http://mall.changan.com.cn/goods-img/img/otherimg/pic/2016/11/15/11/1479178933543.jpg' },
            { id: 3, img: 'http://mall.changan.com.cn/goods-img/img/otherimg/pic/2016/11/15/11/1479178948032.jpg' },
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

    initSell() {
        const {sellList} = this.props;
        const sell = [];

        sell.push(
            <div key={0} className="cars-item border-b">
                <div className="car-img col-50">
                    <div className="img-con">
                        <img src={sellList[0].img} />
                    </div>
                </div>
            </div>
        );

        for (let i = 1, l = sellList.length; i < l; i++) {
            sell.push(
                <div key={sellList[i].id} className="col-33 border-r cars-item" >
                    <div className="hotCat">
                        <div className="img-wrap lazyload">
                            <img src={sellList[i].img} />
                        </div>
                    </div>
                </div >
            )
        }

        return sell;
    }

    render() {
        return (
            <div id="home" className="container">
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

                    <div id="selling">
                        <div className="selling-title border-b">
                            <div className="left">
                                <i className="icon-fire"></i>
                                <span className="h2">热销车</span>
                            </div>
                            <div className="right">
                                <span className="more-txt border-r h4">更多</span>
                                <span className="h4">APP专属</span>
                                <i className="icon icon-arrow-right-2"></i>
                            </div>
                        </div>
                        <div className="featured row gutter-no">
                            {this.initSell()}
                        </div>
                    </div>

                    <div id="activitesBanner" className="lazyload">
                        <img src="http://mall.changan.com.cn/goods-img/img/otherimg/pic/2016/11/12/02/1478888389867.jpg" />
                    </div>
                </div>
            </div>
        );
    }
}
