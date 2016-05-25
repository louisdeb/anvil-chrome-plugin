var anvilExtensionId = 'llobflkadellajobbhgnoigljggndioi';

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
      chrome.bluetooth.getAdapterState(function(adapterInfo) {
        if(adapterInfo.discovering)
          chrome.bluetooth.stopDiscovery();
      });
    }

    if(request.getDevices) {
      console.log('returning devices');
      chrome.bluetooth.getDevices(function(deviceInfos) {
        console.log('num devices: ' + deviceInfos.length);
        for(i = 0; i < deviceInfos.length; i++) {
          console.log(deviceInfos[i].name);
        }
        sendResponse(deviceInfos);
      });
    }

    return true; // Required to keep sendResponse valid.
  }
);

chrome.bluetooth.onDeviceAdded.addListener(function(device) {
  // Maybe perform some logic on the device to make sure it's not invalid, or unnecessary.
  // e.g. if we add a device that we already know, or the device is unknown.
  chrome.runtime.sendMessage(anvilExtensionId, {deviceAdded: true}, function(response) {});
});
