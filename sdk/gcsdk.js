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
        sdk: '0.0.2',
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
    stashdSaveLink: function(uid, url, title, comment) {
        this.stashdHash(uid, function(hash) {
            var d = document, i = d.createElement('iframe');
            i.setAttribute('style','z-index:2147483647;position:fixed;left:10px;top:10px;width:300px;height:46px;border:0;');
            i.setAttribute('scrolling','no');
            d.body.appendChild(i);
            i.contentDocument.write('<form id="s" method="post" action="https://stashd.uclalibrary.org/links/add" accept-charset="utf-8" style="display:none"><input type="hidden" name="_method" value="POST"/><input name="data[Link][t]" type="hidden" value="'+title+'"/><input name="data[Link][u]" type="hidden" value="'+url+'"/><input name="data[Link][e]" type="hidden" value="'+comment+'"/><input name="data[Link][h]" type="hidden" value="'+hash+'"/><input type="submit" value="Submit"/></form><script>(function() {document.getElementById("s").submit();})();</script>');
        });
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