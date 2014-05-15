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
        sdk: '0.0.3',
        minified: false,
        debug: false
    },
    version: function() {
        return this.local.sdk;
    },
    api: function() {
        var r = new XMLHttpRequest();
        r.open('GET', 'https://login.uclalibrary.org/api/version', false);
        r.send(null);

        if (r.status === 200) return r.responseText;
        else return null;
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
    stashd: function(uid, url, title, cb) {
        // This will need, in the future, an access key
        var h = new XMLHttpRequest();
        var params = 'api_key='+this.params.api_key+'&user_id='+uid+'&url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title);
        h.open('POST', 'https://login.uclalibrary.org/api/stashd', true);
        h.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        h.setRequestHeader('Content-Length', params.length);
        h.setRequestHeader('Connection', 'close');
        h.onreadystatechange = function() {
            if(h.readyState == 4 && h.status == 200) {
                var returned = JSON.parse(h.responseText);
                if (typeof cb == 'undefined') {
                    console.log(returned);
                } else {
                    cb(returned);
                }
            }
        };
        h.send(params);
    },
    stashdHash: function(uid,cb) {
        this.ajax('stashd_hash', {user_id: uid}, function (data) { this.userStashdHash = data.hash; cb(data.hash); });
        return;
    },
    ajax: function(ep,qs,cb) {
        var r = new XMLHttpRequest(); 
        r.open(
            'GET',
                'https://login.uclalibrary.org/api/'+ ep + 
                '/?' + this.serialize(qs) + '&api_key=' + encodeURIComponent(this.params.api_key),
            true);
        r.withCredentials = true;
        r.onreadystatechange = function () {
            if (r.readyState != 4 || r.status != 200) return this.error;
            if (!cb) console.log(JSON.parse(r.responseText));
            else cb(JSON.parse(r.responseText));
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
        return str.join("&");
    },
    error: function(msg) {
        if (this.local.debug) console.log('[gcsdk] An error occured' + (msg ? ': ' + msg : '.'));
        return;
    }

}; gcsdkinit();