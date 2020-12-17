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
    populate_flaglist(data);
  }
};

function loadFlagData(cb) {
  apiInstance.getFeatureFlags(projectKey, opts, 
    (e,d,r) => {
      ld_api_callback(e,d,r);
      if (cb) cb();
    });
}

function getFlagData() {
  return window.flagData;
}

function populate_flaglist(data) {
  let flaglist = document.getElementById('flaglist');
  flaglist.innerHTML = '';
  for (let flag of data.items) {
    if (flag.customProperties.hasOwnProperty('flag.ray.locators')) {
      // let locatorProp = flag.customProperties['flag.ray.locators'].value;
      // let [urlMatcher, selector] = locatorProp.split(' ');
      flaglist.innerHTML += `<li>${flag.key}</li>\n`;
    }
  }
}


loadFlagData();
window.devtools = chrome.devtools.inspectedWindow;

var panels = chrome.devtools.panels;

panels.elements.createSidebarPane("Flag-Ray",
  function(sidebar) {

    // Checks both URL and selectors
    // Returns object of {key: [Node]}
    function getFlagNodes(flagData, current) {
      let flagNodes = {};
      for (let flag of flagData.items) {
        if (flag.customProperties.hasOwnProperty('flag.ray.locators')) {
          flagNodes[flag.key] = [];
          let locatorProps = flag.customProperties['flag.ray.locators'].value;
          for (let locatorProp of locatorProps) {
            let [urlMatcher, selector] = locatorProp.split(' ');
            // TODO: urlMatcher
            if (current) {
              flagNodes[flag.key] = Array.from($$(selector, current));
            } else {
              flagNodes[flag.key] = Array.from($$(selector));
            }
          }
        }
      }
      return flagNodes;
    }

    function updateContent() {
      // let obj = getFlagNodes(getFlagData(), null);
      let obj = getFlagNodes(window.flagData, $0);
      sidebar.setObject(obj, "Flags");
    }

    window.flagData = {};
    loadFlagData(updateContent);

    updateContent();

    panels
      .elements
      .onSelectionChanged
      .addListener(updateContent);

 });