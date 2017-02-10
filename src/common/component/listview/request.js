import $ from 'jquery'
import _ from 'lodash'

/*
 *  request args ,jquery ajax的args
 *  { url, method, header, data ...}
 */
function Request(args) {
    if (!args.url) {
        console.error("url不能为空");
        return;
    }

    var baseConfig = {
        contentType: 'application/json',
        timeout: 1000 * 10
    }

    //如果用户没设置下面两个属性则自动设置,如果有设置,将被用户的设置覆盖
    if (args.credentials && args.credentials != 'include') {
        delete args.credentials
        baseConfig.xhrFields = {
            withCredentials: true
        }
        baseConfig.crossDomain = true
    }

    const finalConfig = Object.assign({}, baseConfig, args)

    return new Promise((resolve, reject) => {
        console.log(`[RESTACK] sending request to: ${finalConfig.url}`)
        $.ajax(finalConfig).then(
            (data, textStatus) => {
                console.log('[RESTACK] request success')
                if (data.code == 200 || !data.code) { //没有code 那就把200全当做成功
                    resolve(data)
                } else {
                    reject({ data, textStatus })
                }
            },
            (err, textStatus) => {
                console.warn(err)
                reject(err);
            }
        )
    })
}

/**
 * 使用async的请求wrapper
 * @param  {String} url
 * @param  {Object} ajax args
 * @return {Promise}
 */
async function callAPI(endpoint, args) {
    var data;
    // 某些系统不能识别json object
    if (args.data && !/FormData/.test(args.data.toString()) && !args.keepJs) {
        console.log("tranfer data to string");
        args.data = JSON.stringify(args.data);
    }
    try {
        data = await Request(Object.assign({}, args, { url: endpoint }));
    } catch (e) {
        throw e;
    }
    return data;
}

export { Request, callAPI }
export default callAPI