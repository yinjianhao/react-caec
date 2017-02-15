import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import mobiscroll, { Listview, Form } from "mobiscroll"

import ContainerWithHeader from '../../common/component/header/ContainerWithHeader'

@connect(
    state => {
        return {
        }
    }
)
@withRouter
export default class Daq extends Component {

    render() {
        return (
            <ContainerWithHeader title="daq数据统计">
                <mobiscroll.Form theme="mobiscroll">
                    <div>
                        <label>
                            应用标识
                            <input ref="id" defaultValue="com.ca.reactdemo" />
                        </label>
                    </div>
                    <button type="button" onClick={this.pathConversion}>路径转化率</button>
                    <button type="button" onClick={this.deviceVitality}>设备活跃度</button>
                    <button type="button" onClick={this.deviceResolution}>设备分辨率</button>
                    <button type="button" onClick={this.userLocation}>用户位置分布</button>
                    <button type="button" onClick={this.networkConnection}>联网形式</button>
                </mobiscroll.Form>
            </ContainerWithHeader>
        );
    }
    pathConversion = () => {
        console.log('路径转化率')
        var appId = this.refs.id.value
        var plat = navigator.userAgent.indexOf('Android') > 0 ? 'android' : 'ios'
        var datas = [
            'account-home-search-other',
            'account-home-search',
            'account-home-search-product',
            'account-home-other',
            'account-home-product',
            'account-home-other-product',
            'account-home-other-search-product',
            'account-search-other',
            'account-search-other-product',
            'account-home-search-other-product',
            'account-other-search-product',
            'account-other-search']
        var n = Math.floor(Math.random() * datas.length + 1) - 1;
        var chosenData = datas[n]
        console.log(plat)
        console.log(appId)
        console.log(chosenData)
        this.props.dispatch({
            type: "daq/pathConversion",
            payload: {
                appId: appId,
                tags: [
                    "pathConversion",
                    plat
                ],
                meta: {
                    "sunburst": chosenData
                }
            }
        })
    }

    deviceVitality = () => {
        console.log('deviceVitality')
        var appId = this.refs.id.value
        var plat = navigator.userAgent.indexOf('Android') > 0 ? 'android' : 'ios'
        var devices = [
            'vivo',
            '小米5',
            '红米note',
            'OPPO',
            '华为荣耀Mate8',
            '魅族MAX5',
            '小米4S',
            '努比亚',
            '酷派',
            '华为P8'
        ]
        var locations = [
            '上海',
            '广东',
            '福建',
            '上海',
            '北京',
            '重庆',
            '湖北',
            '浙江',
            '天津',
            '江苏',
            '海南',
            '香港',
            '澳门'
        ]
        var n = Math.floor(Math.random() * devices.length + 1) - 1;
        var m = Math.floor(Math.random() * locations.length + 1) - 1;
        var chosenDevice = devices[n],
            chosenLocation = locations[m]
        console.log(plat)
        console.log(appId)
        console.log(chosenDevice)
        console.log(chosenLocation)
        this.props.dispatch({
            type: "daq/deviceVitality",
            payload: {
                appId: appId,
                tags: [
                    "deviceVitality",
                    plat
                ],
                meta: {
                    "deviceName": chosenDevice,
                    "location": chosenLocation
                }
            }
        })
    }

    deviceResolution = () => {
        console.log('deviceResolution')
        var appId = this.refs.id.value
        var plat = navigator.userAgent.indexOf('Android') > 0 ? 'android' : 'ios'
        var resolutions = [
            '1920*1080',
            '1280*800',
            '1280*720',
            '960*540',
            '854*480',
            '480*320',
            '320*240',
            '640*960',
            '640*1136'
        ]
        var n = Math.floor(Math.random() * resolutions.length + 1) - 1;
        var chosenRes = resolutions[n]
        this.props.dispatch({
            type: "daq/deviceResolution",
            payload: {
                appId: appId,
                tags: [
                    "deviceResolution",
                    plat
                ],
                meta: {
                    "resolution": chosenRes
                }
            }
        })
    }

    userLocation = () => {
        console.log('userLocation')
        var appId = this.refs.id.value
        var plat = navigator.userAgent.indexOf('Android') > 0 ? 'android' : 'ios'
        var userLocations = [
            '上海',
            '广东',
            '福建',
            '上海',
            '北京',
            '重庆',
            '湖北',
            '浙江',
            '天津',
            '江苏',
            '海南',
            '香港',
            '澳门'
        ]
        var n = Math.floor(Math.random() * userLocations.length + 1) - 1;
        var chosenUserLo = userLocations[n]
        this.props.dispatch({
            type: "daq/userLocation",
            payload: {
                appId: appId,
                tags: [
                    "userLocation",
                    plat
                ],
                meta: {
                    "province": chosenUserLo
                }
            }
        })
    }

    networkConnection = () => {
        console.log('networkConnection')
        var appId = this.refs.id.value
        var plat = navigator.userAgent.indexOf('Android') > 0 ? 'android' : 'ios'
        var Noperator = ['wifi', 'Celluar']
        var operator = ['中国移动', '中国联通', '中国电信']
        var n = Math.floor(Math.random() * Noperator.length + 1) - 1;
        var m = Math.floor(Math.random() * operator.length + 1) - 1;
        var chosenNoperator = Noperator[n],
            chosenOperator = operator[m]
        this.props.dispatch({
            type: "daq/networkConnection",
            payload: {
                appId: appId,
                tags: [
                    "networkConnection",
                    plat
                ],
                meta: {
                    "Non_operator": chosenNoperator,
                    "operator": chosenOperator
                }
            }
        })
    }
}
