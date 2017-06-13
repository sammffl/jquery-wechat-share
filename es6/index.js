/**
 * Created by SamMFFL on 2017/6/13.
 */

let wechatShareTitle,
    wechatShareDesc,
    wechatShareLink,
    wechatShareImgurl;

export default class WechatShare {
    constructor(props) {

        const self = this;
        let script = document.createElement('script');
        script.src = '//res.wx.qq.com/open/js/jweixin-1.0.0.js';
        script.onload = function () {
            self._init(props);
        }.bind(this);
        document.body.appendChild(script);
    }

    _init(props) {
        wechatShareTitle = props.title;
        wechatShareDesc = props.desc;
        wechatShareLink = props.link;
        wechatShareImgurl = props.imgUrl;

        this.signature();
    }

    signature() {
        const self = this;
        let yname = location.origin;
        $.ajax({
            type: 'GET',
            url: yname + '/api/wechat/jsapi/signature',
            data: {
                url: window.location.href,
            },
            dataType: 'jsonp',
            success: function (data) {
                // console.log(data);
                switch (data.status) {
                    case 'SUCCESS' :
                        const configAppId = data.attributes.config.appid;
                        const configTimestamp = data.attributes.config.timestamp;
                        const configNoncestr = data.attributes.config.noncestr;
                        const configSignature = data.attributes.config.signature;
                        self.wechatShare(configAppId, configTimestamp, configNoncestr, configSignature);
                        break;
                    default :
                }
            },
            error: function (xhr, errorType, error) {
                console.log(xhr, errorType, error);
            }
        });
    }

    wechatShare(configAppId, configTimestamp, configNoncestr, configSignature) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: configAppId, // 必填，公众号的唯一标识
            timestamp: configTimestamp, // 必填，生成签名的时间戳
            nonceStr: configNoncestr, // 必填，生成签名的随机串
            signature: configSignature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: wechatShareTitle, // 分享标题
                link: wechatShareLink, // 分享链接
                imgUrl: wechatShareImgurl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    window.location.href = wechatShareLink;
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    window.location.href = wechatShareLink;
                }
            });
            wx.onMenuShareAppMessage({
                title: wechatShareTitle,//分享标题
                desc: wechatShareDesc,//分享描述
                link: wechatShareLink,//分享链接
                imgUrl: wechatShareImgurl,//分享图标
                type: 'link',//分享类型，music,video或link,不填默认为link
                dataUrl: '',//如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    //用户确认分享后执行的回调函数
                    window.location.href = wechatShareLink;
                },
                cancel: function () {
                    //用户取消分享后执行的回调函数
                    window.location.href = wechatShareLink;
                }

            });
            wx.onMenuShareQQ({
                title: wechatShareTitle,//分享标题
                desc: wechatShareDesc,//分享描述
                link: wechatShareLink,//分享链接
                imgUrl: wechatShareImgurl,//分享图标
                type: 'link',//分享类型，music,video或link,不填默认为link
                dataUrl: '',//如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    //用户确认分享后执行的回调函数
                    window.location.href = wechatShareLink;
                },
                cancel: function () {
                    //用户取消分享后执行的回调函数
                    window.location.href = wechatShareLink;
                }

            });
            wx.onMenuShareQZone({
                title: wechatShareTitle,//分享标题
                desc: wechatShareDesc,//分享描述
                link: wechatShareLink,//分享链接
                imgUrl: wechatShareImgurl,//分享图标
                dataUrl: '',//如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    //用户确认分享后执行的回调函数
                    window.location.href = wechatShareLink;
                },
                cancel: function () {
                    //用户取消分享后执行的回调函数
                    window.location.href = wechatShareLink;
                }

            });

        });
    }


}



