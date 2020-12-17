/**
 * LD: Get all flags
 */
var LaunchDarklyApi = require('launchdarkly-api');
var defaultClient = LaunchDarklyApi.ApiClient.instance;

// Configure API key authorization: Token
var Token = defaultClient.authentications['Token'];
Token.apiKey = 'api-cf0f43f5-b3d5-4c0b-b61e-a3f237fbbc0d';
var apiInstance = new LaunchDarklyApi.FeatureFlagsApi();
var projectKey = "support-service"; // String | The project key, used to tie the flags together under one project so they can be managed together.
var opts = {
  'env': "yoz", // String | By default, each feature will include configurations for each environment. You can filter environments with the env query parameter. For example, setting env=production will restrict the returned configurations to just your production environment.
  'summary': true, // Boolean | By default in api version >= 1, flags will _not_ include their list of prerequisites, targets or rules.  Set summary=0 to include these fields for each flag returned.
  //'archived': true, // Boolean | When set to 1, archived flags will be included in the list of flags returned.  By default, archived flags are not included in the list of flags.
  'tag': "real" // String | Filter by tag. A tag can be used to group flags across projects.
};

var ld_api_callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
    console.dir(data);
    window.flagData = data;
  }
};

function loadFlagData() {
  apiInstance.getFeatureFlags(projectKey, opts, ld_api_callback);
}

function getFlagData() {
  return window.flagData;
}

loadFlagData();

browser.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion)
})

/**
When we receive the message, execute the given script in the given
tab.
*/
function handleMessage(request, sender, sendResponse) {
 
  if (sender.url != browser.runtime.getURL("/pages/panel.html")) {
    return;
  }

  browser.tabs.executeScript(
    request.tabId, 
    {
      code: request.script
    });
}

/**
Listen for messages from our devtools panel.
*/
browser.runtime.onMessage.addListener(handleMessage); 

