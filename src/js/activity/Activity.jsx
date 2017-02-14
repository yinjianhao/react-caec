import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

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

    dealListData() {
        const {activityList} = this.props;
        const list = {
            panle0: [],
            panle1: [],
            panle2: []
        }

        activityList.forEach((item, index) => {
            let start = +new Date(item.startDate);
            let end = +new Date(item.endDate);
            let now = +new Date();

            if (end < now) {
                list.panle0.push(item);
            } else if (end > now && start < now) {
                list.panle1.push(item);
            } else {
                list.panle2.push(item);
            }
        })

        return list;
    }

    initTabPane(list) {
        if (list.length === 0) {
            return <div className="empty-msg-notice"> 暂无活动信息</div>;
        }

        return list.map((item, index) => {
            return <ActivityItem key={item.id} data={item}></ActivityItem>
        })
    }

    render() {
        const list = this.dealListData();

        return (
            <div className="activity-wrap" >
                <Tabs activeIndex={1} onChange={() => { console.log('change') }}>
                    <TabPane tab="历史活动">
                        {this.initTabPane(list.panle0)}
                    </TabPane>
                    <TabPane tab="正在疯抢">
                        {this.initTabPane(list.panle1)}
                    </TabPane>
                    <TabPane tab="即将开始">
                        {this.initTabPane(list.panle2)}
                    </TabPane>
                </Tabs>
            </div>
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
        const {img, title, desc, lastTime, price, originalPrice} = this.props.data;

        return (
            <div className="activity-item">
                <div className="pro-img-container lazyload">
                    <img className="lazy" src={img} />
                </div>
                <div className="item-name">
                    <p className="title-1 h2 nowrap-multi">{title}</p>
                    <p className="title-2 h4 nowrap-multi">{desc}</p>
                    <span className="right-txt h5"><i className="icon-timer right-icon h5"></i>{lastTime}</span>
                </div>
                <div className="price price-int-point">
                    <i className="icon-deposit-2 deposit_text"></i>
                    <span className="price-symbol h5">¥</span><span className="n-price h2">{price}</span>
                    <span className="real-price price-original h6"><span className="price-symbol">¥</span>{originalPrice}</span>
                </div>
                <div className="btn-buy">立即抢购</div>
            </div>
        )
    }
}

const Empty = class Empty extends Component {

    render() {
        return (
            <div class="empty-msg-notice">暂无活动信息</div>
        )
    }
}
