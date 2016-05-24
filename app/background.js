chrome.app.runtime.onLaunched.addListener(function() {
  console.log('loaded app');
});

/* Listens for single messages, servicing them. */
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {

    if(request.getAdapterStateInfo) {
      chrome.bluetooth.getAdapterState(function(adapterInfo) {
        console.log('returning info');
        sendResponse({info: adapterInfo});
      });
    }

    if(request.startDiscovering) {
      console.log('discovering');
      chrome.bluetooth.getAdapterState(function(adapterInfo) {
        if(adapterInfo.available && adapterInfo.powered && !adapterInfo.discovering)
          chrome.bluetooth.startDiscovery();
      });
    }

    if(request.stopDiscovering) {
      console.log('stopping discovery');
      chrome.bluetooth.getAdapterState(function(adapterInfo)) {
        if(adapterInfo.discovering)
          chrome.bluetooth.stopDiscovery();
      };
    }

    return true; // Required to keep sendResponse valid.
  });
