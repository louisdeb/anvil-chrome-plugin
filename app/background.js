var anvilExtensionId = 'llobflkadellajobbhgnoigljggndioi';

/* Listens for single messages, servicing them. */
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {

    if(request.getAdapterStateInfo) {
      chrome.bluetooth.getAdapterState(function(adapterInfo) {
        console.log('returning info');
        sendResponse({info: adapterInfo});
      });
    }
    else if(request.startDiscovering) {
      console.log('discovering');
      chrome.bluetooth.getAdapterState(function(adapterInfo) {
        if(adapterInfo.available && adapterInfo.powered && !adapterInfo.discovering)
          chrome.bluetooth.startDiscovery();
      });
    }
    else if(request.stopDiscovering) {
      console.log('stopping discovery');
      chrome.bluetooth.getAdapterState(function(adapterInfo) {
        if(adapterInfo.discovering)
          chrome.bluetooth.stopDiscovery();
      });
    }
    else if(request.getDevices) {
      console.log('returning devices');
      console.log('amount: ' + devices.length);
      sendResponse(devices);
    }
    else if(request.getConnectingAddresses) {
      console.log('returning connecting addresses');
      console.log('amount: ' + connectingAddresses.length);
      sendResponse(connectingAddresses);
    }
    else if($.inArray(request.connectionRequested, addresses)) {
      console.log('connection requested');
      connectToDevice(request.connectionRequested);
    }

    return true; // Required to keep sendResponse valid.
  }
);

var devices = [];
var addresses = [];
var uuid = 'C93FC016-11E3-4FF2-9CE1-D559AD8828F7';

chrome.bluetooth.onDeviceAdded.addListener(function(device) {
  if($.inArray(device.address, addresses) != -1)
    return;

  // if($.inArray(uuid, device.uuids) == -1)
    // return;

  console.log('device added: ' + device.address);
  console.log('device uuids: ' + device.uuids);
  devices.push(device);
  addresses.push(device.address);
  chrome.runtime.sendMessage(anvilExtensionId, {deviceAdded: device}, function(response) {});
});

var connectingAddresses = [];

function connectToDevice(address) {
  if($.inArray(address, connectingAddresses) != -1)
    return;

  console.log('started trying to connect to ' + address);
  connectingAddresses.push(address);
}
