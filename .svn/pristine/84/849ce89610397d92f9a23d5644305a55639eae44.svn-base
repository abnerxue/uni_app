var apiUrl = 'http://test.huainanhui.com/index.php';
var versionNumber =400;
var source = 'xiaomi';
var position = 'xiaomi';

function __args() {
	var setting = {};
	if (arguments.length === 1 && typeof arguments[0] !== 'string') {
		setting = arguments[0];
	} else {
		setting.url = arguments[0];
		if (typeof arguments[1] === 'object') {
			setting.data = arguments[1];
			setting.success = arguments[2];
			setting.fail = arguments[3];
		} else {
			setting.success = arguments[1];
			setting.fail = arguments[2];
		}
	}
	if (setting.url.indexOf('http') !== 0) {
		setting.url = apiUrl + setting.url;
	}
	if (typeof(setting.data) == "undefined") {
		setting.data = {};
	};

	setting.complete = function(res) {
		if (res.errMsg.indexOf('timeout') != -1) {
			return false;
		}
		if (res.errMsg.indexOf('request:fail') != -1) {
			uni.showModal({
				title: '提示',
				content: '请求失败，请检查您的网络后重试',
				showCancel: false,
			});
			return false;
		}
	}
	return setting;
}

function __json(method, setting) {
	setting.method = method;
	if (method == 'GET') {
		//#ifdef APP-PLUS
		setting.header = {
			'content-type': 'application/json'
		};
		//#endif
	} else {
		if (module.exports.isEmpty(setting.data.token)) {
			setting.data.token = uni.getStorageSync('token');
		}
		setting.header = {
			'content-type': 'application/x-www-form-urlencoded'
		};
	}
	uni.request(setting);
}

module.exports = {
	versionNumber: versionNumber,
	source: source,
	position: position,
	apiUrl: apiUrl,
	getJSON: function() {
		__json('GET', __args.apply(this, arguments));
	},
	postJSON: function() {
		__json('POST', __args.apply(this, arguments));
	},

	showErr: function(message, title = "错误信息", determine = '') {
		uni.showModal({
			title: title,
			content: typeof(message) === 'string' ? message : '系统错误',
			showCancel: false,
			success: (showResult) => {
				if (typeof(determine) == 'function') {
					if (showResult.confirm) {
						determine();
					}
				}
			}
		});
	},
	showSuccess: function(message, title = "成功提示") {
		uni.showModal({
			title: title,
			content: typeof(message) === 'string' ? message : '成功',
			showCancel: false,
		});
	},
	showNotice: function(message, url = '') {
		uni.showModal({
			title: '提示',
			content: typeof(message) === 'string' ? message : '系统错误',
			showCancel: false,
			success: (showResult) => {
				if (!this.isEmpty(url) && showResult.confirm) {
					uni.navigateTo({
						url: url
					});
				}
			}
		});
	},
	reg_phone: function(phone) {
		var reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
		if (reg.test(phone)) {
			return true;
		}
		return false;
	},
	isEmpty: function(parameter) {
		if (typeof parameter == "undefined" || typeof parameter == undefined) {
			return true;
		} else if (typeof parameter == 'NaN' || typeof parameter == NaN) {
			return true;
		} else if (parameter == null) {
			return true;
		} else if (parameter.length == 0) {
			return true;
		} else if (parameter == "" || parameter == 0) {
			return true;
		}
		return false;
	},
	noLogin: function(message) {
		uni.showModal({
			title: '未登录',
			content: typeof(message) === 'string' ? message : '你未登陆,请登陆后再操作',
			success: (showResult) => {
				if (showResult.confirm) {
					uni.navigateTo({
						url: '/pages/logins/logins'
					});
				}
			}
		});
	},
	showErrgoBack: function(errMsg = '系统错误') {
		uni.showModal({
			title: "错误",
			content: typeof(errMsg) === 'string' ? errMsg : '系统错误',
			showCancel: false,
			success() {
				uni.navigateBack({
					delta: 1
				});
			}
		});
	},
	addCart: function(gid, successCall = '') {
		let that = this;
		let token = uni.getStorageSync('token');
		if (token.length < 10) {
			that.noLogin('你未登录，请登陆后再操作购物车');
			return false;
		}
		that.postJSON(
			'/user/cart/add?ajax=true', {
				token: token,
				gid: gid,
				number: 1
			},
			function(res) {
				if (res.data.code == "1") {
					uni.showToast({
						title: '成功加入购物车',
						mask: true
					});
					if (typeof(successCall) == 'function') {
						successCall(res.data.cart_num);
					}
					uni.setStorageSync('cartNumber', res.data.cart_num);
				} else if (res.data.login == "0") {
					that.noLogin('你未登录，请登陆后再操作购物车');
				} else {
					that.showErr(res.data.message);
				}
			}
		);
	},
	pay: function(orderId, payment) {
		// #ifdef APP-PLUS
		if (payment == 'alipay') {
			this.alipay_app(orderId);
			console.log(orderId);
		} else if (payment == 'wxpay') {
			//微信支付
		} else {
			this.showErr('请选择支付方式');
		}
		// #endif
		//#ifdef H5
		if (payment == 'alipay') {
			window.location.href = this.apiUrl + '/user/order/pay/' + orderId + '/1.html';
		} else if (payment == 'wxpay') {
			if (this.isWechatBrowser()) {
				window.location.href = this.apiUrl + '/user/order/pay/' + orderId + '/5.html';
			}
		} else {
			this.showErr('请选择支付方式');
		}
		// #endif
	},
	alipay_app: function(orderId) {
		let token = uni.getStorageSync('token');
		var data = {
			serialNumber: orderId,
			token: token,
			payment: 3
		};
		console.log(orderId)
		this.postJSON(
			'/user/order/pay.html?ajax=true',
			data,
			function(res) {
				console.log(res.data);
				let payinfo = res.data.payinfo;
				uni.getProvider({
					service: 'payment',
					success: function(res) {
						uni.requestPayment({
							provider: res.provider[0], //服务提供商
							orderInfo: payinfo, //订单信息
							success: function(result) {
								uni.showToast({
									title: '支付成功',
									mask: true
								});
								setTimeout(function() {
									uni.navigateTo({
										url: '/pages/order_details/order_details?id=' + orderId
									});
								}, 1500);
							}
						});
					}
				});
			}
		);
	},
	id_in_array: function(id, arr) { //判断id,是否存在arr数组中的id键值
		id = parseInt(id);
		if (this.isEmpty(id)) {
			return false;
		}
		if (typeof(arr) != 'object') {
			return false;
		}
		for (let i in arr) {
			if (!this.isEmpty(arr[i].id) && arr[i].id == id) {
				return true;
			}
		}
		return false;
	},
	cent2dollar: function(cent) {
		cent = parseInt(cent);
		if (isNaN(cent)) {
			return '0.00';
		} else if (cent < 1) {
			return '0.00';
		} else if (cent < 10) {
			return "0.0" + cent;
		} else if (cent < 100) {
			return "0." + cent;
		} else if (cent % 100 == 0) { //能整除100的
			return Math.floor(cent) / 100 + ".00";
		} else if (cent % 10 == 0) { //能整除10的
			return Math.floor(cent) / 100 + "0";
		} else {
			return Math.floor(cent) / 100;
		}
	},

	isWechatBrowser: function() {
		// #ifdef H5
		var ua = window.navigator.userAgent.toLowerCase();
		//通过正则表达式匹配ua中是否含有MicroMessenger字符串
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		}
		// #endif
		return false;
	},
	loginSuccess: function(data, loginid) {
		if (data.code == "1") {
			try {
				uni.setStorageSync('token', data.token);
				uni.setStorageSync('uid', data.uid);
				// this.showSuccess(data.message);
			} catch (e) {
				uni.showToast({
					title: '写入token失败',
					mask: true
				});
				return false;
			}
			// #ifdef APP-PLUS
			var cid = this.get_getui_cid();
			if (this.isEmpty(data.cid)) {
				if (!this.isEmpty(cid)) {
					this.postJSON(
						'/api/user/bind_cid', {
							ajax: 'true',
							token: data.token,
							cid: cid,
						},
						function(res) {
							console.log(res);
						}
					);
				}
			}
			// #endif
			if (loginid == 1) {
				uni.navigateBack({
					delta: 1
				});
			} else if (loginid == 2) {
				uni.navigateBack({
					delta: 2
				});
			}
		} else {
			// uni.showToast({
			// 	title: data.message,
			// 	mask: true
			// });
		}
	},
	get_getui_cid: function() {
		var key = 'getui_cid';
		uni.setStorageSync(key, '');
		var cid = uni.getStorageSync(key);
		if (!this.isEmpty(cid)) {
			return cid;
		}
		var info = plus.push.getClientInfo(); //uni-app的推送
		cid = info.clientid;
		if (!this.isEmpty(cid)) {
			uni.setStorageSync(key, cid);
			return cid;
		}
		//第二次获取,防止获取不到
		info = plus.push.getClientInfo(); //uni-app的推送
		cid = info.clientid;
		if (!this.isEmpty(cid)) {
			uni.setStorageSync(key, cid);
			return cid;
		}
		return '';
	}
}
