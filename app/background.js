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

var devices = [];
var uuid = 'C93FC016-11E3-4FF2-9CE1-D559AD8828F7';

chrome.bluetooth.onDeviceAdded.addListener(function(device) {
  if($.inArray(device.address, devices) != -1)
    return;

  // if($.inArray(uuid, device.uuids) == -1)
    // return;

  console.log('device added: ' + device.address);
  console.log('device uuids: ' + device.uuids);
  devices.push(device.address);
  chrome.runtime.sendMessage(anvilExtensionId, {deviceAdded: true}, function(response) {});
});
