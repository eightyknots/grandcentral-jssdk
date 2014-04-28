# grandcentral-jssdk

Javascript SDK for the Simul8 group's single sign on mechanism.

You **will need** a Simul8 API key, and potentially more for access.

## Getting Started
Include either the full Javascript API or the minified API before your closing body tag. You can also load the library asynchronously.

	<script type="text/javascript">
	  var gcsdkParams = {api_key: '*****<your_api_key_here>*****'};
	  (function(d,p) {
	    var gc = d.createElement('script');
	    gc.type = 'text/javascript'; gc.async = true;
	    gc.src = '*****<path_to_sdk_folder>*****/gcsdk.js?';
	    var s = document.getElementsByTagName('script')[0];
	    s.parentNode.insertBefore(gc, s);
	    gc.addEventListener('load', function () {
	      document.gcsdk = gcsdk(p);
	      
	      // *********************
	      // Your callback here
	      // *********************
	      
	    }
	  })(document,gcsdkParams);
	</script>
	

## Method Calls

### `object` getSession()
Sends a request to get the user's current session information. The AJAX call resembles:

	GET https://login.uclalibrary.org/api/session
	
The response object looks like this

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
	      service: "google",
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


### `string` getStashdHash()
If your API key allows [Stashd](https://stashd.uclalibrary.org) hash integration you can request a user's Stashd hash value for link saving.

	var userHash = getStashdHash(user_id, callback);
	
Returns `null` if the user ID does not have a Stashd hash on record.

***Note:*** This method **is slow**. I am aware of this and am working on a faster call time.