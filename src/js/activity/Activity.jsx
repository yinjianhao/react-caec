import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import ContainerWithFooter from '../../common/component/footer/ContainerWithFooter';
import { Tabs, TabPane } from '../../common/component/tabs/Tabs';
import "./activity.less"
import Loading from '../../common/component/loading/Loading';

@connect(
    state => {
        return {
            isLoading: state.activity.isLoading,
            activityList: state.activity.activityList
        }
    }
)
@withRouter
export default class Activity extends Component {


    initTabPane() {

    }

    render() {
        console.log(this.props);
        return (
            <ContainerWithFooter className="activity-wrap" activeIndex={1}>
                <Loading ref="loading" isLoading={this.props.isLoading}></Loading>
                
                    <Tabs activeIndex={1} onChange={() => { console.log('change') } }>
                        <TabPane tab="历史活动">

                        </TabPane>
                        <TabPane tab="正在疯抢">

                        </TabPane>
                        <TabPane tab="即将开始">

                        </TabPane>
                    </Tabs>
                
            </ContainerWithFooter>
        );
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'activity/list'
        })
    }
}

const ActivityItem = class ActivityItem extends Component {
    render() {
        return (
            <div className="activity-item">
                <div className="pro-img-container lazyload">
                    <img className="lazy" src="http://mall.changan.com.cn/goods-img/img/otherimg/pic/2016/12/31/23/1483197089955_900_450.jpg" style="display: block;" />
                </div>
                <div className="item-name">
                    <p className="title-1 h2 nowrap-multi">CS75</p>
                    <p className="title-2 h4 nowrap-multi">下单支付199元，线下购车即送699元新车超值礼包，199元不抵车款！</p>
                    <span className="right-txt h5"><i className="icon-timer right-icon h5"></i>还剩25天</span>
                </div>
                <div className="price price-int-point">
                    <i className="icon-deposit-2 deposit_text"></i>
                    <span className="price-symbol h5">¥</span><span className="n-price h2">199</span>
                    <span className="real-price price-original h6"><span className="price-symbol">¥</span>699</span>
                </div>
                <div className="btn-buy">立即抢购</div>
            </div>
        )
    }
}
