# grandcentral-jssdk

Javascript SDK for the Simul8 group's single sign on mechanism.

You **will need** a Simul8 API key, and potentially more for access.

## Getting Started
Include either the full Javascript API or the minified API before your closing body tag. You can also load the library asynchronously.

	<script type="text/javascript">
	window.gcsdkinit = function () {
	  gcsdk.init({ api_key: 'your-api-key-here' });
	};
	(function(d) { 
	  var gc = d.createElement('script');
	  gc.type = 'text/javascript'; gc.async = true;
	  gc.src = '../sdk/gcsdk.js';
	  var s = d.getElementsByTagName('script')[0];
	  s.parentNode.insertBefore(gc, s);
	})(document);
	</script>
	
### `gcsdk.init` Callback Function
When the SDK is loaded, it called `gcsdkinit()`. To formally initialize the SDK you should call `gcsdk.init()`. `init()` is defined below.

### Calling Remote
The most up to date SDK is also available at
	
	https://login.uclalibrary.org/edge/gcsdk.js




## Method Calls

### General Methods

#### session(`function callback`)
Sends a request to get the user's current session information. The AJAX call resembles:

	GET https://login.uclalibrary.org/api/session
	
The response object (passed to the callback function) looks like this...

	{
	  logged_in: true,
	  user: {
	    user_id: "4286d9ba3228b2.57412896",
	    created: "2014-03-27T00:56:42-07:00",
	    shib_verified: true
	  },
	  session: {
	    session_id: "4da582fad1f19523",
	    connection: "facebook"
	  },
	  connections: {
	    facebook: {
	      user_id: "12345678",
	      first_name: "John",
	      last_name: "Smith",
	      profile_pic: "<URI to photo>"
	    },
	    google: {
	      user_id: "10221630102581019991",
	      first_name: "John",
	      last_name: "Smith",
	      profile_pic: "<URI to photo>"
	    }
	  }
	}

***Note:*** To request a user's Shibboleth target ID, you must:

* have permission to do so with your API key
* include your private key in `gcsdkParams`
* include a ticket access key (see Access Keys below)


#### stashd(`string` user_id, `string` url, `string` title, `function` callback())

<span style="color:darkred;">**NOTE**</span>: In the future `user_id` will be replaced by an `access_token`, so look out for that!

This method will push a given URL with title to a logged in user's Stashd library. It sents a POST request to the following endpoint.

	POST https://login.uclalibrary.org/api/stashd

#### login(`string url`)
Like the name suggests, this POSTs a ticket to the API with your initialized API key and automagically takes you to the Simul8 login service. It takes a callback url as its only argument.

	POST https://login.uclalibrary.org/api/ticket
	Content-Type: application/x-www-form-urlencoded
	Content-Length: <some length>
	Connection: close

You can also reference the `ticket()` function directly. See below for more details.

#### logout(`string url`)
Immediately sends user to `https://login.uclalibrary.org/logout` with an optional callback URL. The URL is encoded automatically.

### Helper Methods

#### init(`object params`[, `function callback()`])
Initializes the SDK with a given set of params. At minimum, params should include your API key.

	gcsdk.init({api_key: 'your_key_here'});

The callback function returns `true` on initialization.

#### `string` version()
Returns a string containing the current SDK version.

#### `string` latest()
Returns a string containing the latest API implementation. Documentation is available [on the Grand Central website](http://login.uclalibrary.org/devs/).
