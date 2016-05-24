chrome.app.runtime.onLaunched.addListener(function() {
  console.log('loaded app');
});

/* Listens for single messages, servicing them. */
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {

    if(request.getAdapterStateAvailable) {
      chrome.bluetooth.getAdapterState(function(adapterInfo) {
        sendResponse({adapterStateAvailable: adapterInfo.available});
      });
    }

    return true; // Required to keep sendResponse valid.
  });
