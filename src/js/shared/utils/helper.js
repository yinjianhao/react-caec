var getPlatform = function(platformOverride) {
	var isCordova = typeof Meteor !== 'undefined' && Meteor.isCordova;
	var iOS = {
		isIOS: true,
		isAndroid: false,
		isCordova: isCordova,
		transitionTimeOut: 450,
		name: 'iOS'
	};
	var android = {
		isIOS: false,
		isAndroid: true,
		isCordova: isCordova,
		transitionTimeOut: 320,
		name: 'Android'
	};

	if (platformOverride === 'iOS') { return iOS; }

	if (typeof cordova !== 'undefined' && cordova.platformId === 'ios') { return iOS; }

	if(!!navigator.userAgent.match(/iPad/i)
		|| !!navigator.userAgent.match(/iPhone/i)
		|| !!navigator.userAgent.match(/iPod/i)
	) {
		return iOS;
	}

	if (platformOverride === 'Android') { return android; }

	if (typeof cordova !== 'undefined' && cordova.platformId === 'android') { return android; }

	if (navigator.userAgent.indexOf('Android') > 0) { return android; }

	return {
		isIOS: false,
		isAndroid: false,
		isCordova: isCordova,
		transitionTimeOut: 450,
		name: 'Web'
	};
};

function getCurrentRouteConfig(routes){
	const len = routes.length ;
	return routes[len-1]
}

export { getPlatform,getCurrentRouteConfig };


