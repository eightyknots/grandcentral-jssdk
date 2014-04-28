/**
 * UCLA Simul8 Group
 * Javascript SDK for grandcentral single sign-on service
 *
 * @version 0.1
 * 
 */

var gcsdk = {
	params: { },
	local: {
		source: 'gcsdk',
		sdk: '0.0.1',
		minified: false,
		debug: true
	},
	version: function() {
		return this.local.sdk;
	},
	init: function(setParams, cb) {
		this.params = setParams;
		if (this.local.debug) console.log('[gcsdk] Started API with key: '+this.params.api_key);
		if (cb) cb(true);
		return;
	},
	session: function(cb) {
		this.ajax('session', null, cb);
		return;
	},
	stashdHash: function(uid,cb) {
		this.ajax('stashd_hash', {user_id: uid}, function (data) { cb(data.hash); });
		return;
	},
	ajax: function(ep,qs,cb) {

		var r = new XMLHttpRequest(); 
		r.withCredentials = true;
		r.responseType = 'json';
		r.open(
			'get',
				'https://login-dev.uclalibrary.org/api/'+ ep + 
				'/?' + this.serialize(qs),
			true);
		r.onreadystatechange = function () {
			if (r.readyState != 4 || r.status != 200) return this.error;
			if (!cb) console.log(r.response);
			else cb(r.response);
		}
		r.send();
		return;
	},
	serialize: function(obj, prefix) {
		var str = [];
		for(var p in obj) {
			var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
			str.push(typeof v == "object" ?
				this.serialize(v, k) :
				encodeURIComponent(k) + "=" + encodeURIComponent(v));
		}
		str.push('api_key=' + encodeURIComponent(this.params.api_key));
		return str.join("&");
	},
	error: function(msg) {
		console.log('[gcsdk] An error occured' + (msg ? ': ' + msg : '.'));
		return;
	}

}; gcsdkinit();