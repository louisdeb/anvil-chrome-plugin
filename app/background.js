var anvilExtensionId = 'llobflkadellajobbhgnoigljggndioi';
var uuid = 'c93fc016-11e3-4ff2-9ce1-d559ad8828f7';
var devices = [];
var addresses = [];
var connectingAddresses = [];
var connectedAddresses = [];

/* Listens for single messages, servicing them. */
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {

    if(request.getAdapterStateInfo) {
      chrome.bluetooth.getAdapterState(function(adapterInfo) {
        sendResponse({info: adapterInfo});
      });
    }
    else if(request.startDiscovering) {
      chrome.bluetooth.getAdapterState(function(adapterInfo) {
        if(adapterInfo.available && adapterInfo.powered && !adapterInfo.discovering)
          chrome.bluetooth.startDiscovery();
      });
    }
    else if(request.stopDiscovering) {
      chrome.bluetooth.getAdapterState(function(adapterInfo) {
        if(adapterInfo.discovering)
          chrome.bluetooth.stopDiscovery();
      });
    }
    else if(request.getDevices) {
      sendResponse(devices);
    }
    else if(request.getConnectingAddresses) {
      sendResponse(connectingAddresses);
    }
    else if(request.getConnectedAddresses) {
      sendResponse(connectedAddresses);
    }
    else if($.inArray(request.connectionRequested, addresses) != -1) {
      connectToDevice(request.connectionRequested);
    }

    return true; // Required to keep sendResponse valid.
  }
);

/* Listens for devices discovered. It stores the device if it is new, and
   notifies the extension, passing it the device. */
chrome.bluetooth.onDeviceAdded.addListener(function(device) {
  if($.inArray(device.address, addresses) != -1)
    return;

  // Perform a check for the correct UUID.
  if($.inArray(uuid, device.uuids) == -1)
    return;

  devices.push(device);
  addresses.push(device.address);
  chrome.runtime.sendMessage(anvilExtensionId, {deviceAdded: device},
  function(response) {});
});

/* Initiates connecting to a device. Will only attempt connection if the device
   is not already connecting. */
function connectToDevice(address) {
  if($.inArray(address, connectingAddresses) != -1)
    return;

  console.log('Started connecting to ' + address);
  connectingAddresses.push(address);
  connect(address);
}

function setDeviceConnected(address) {
  connectedAddresses.push(address);
  chrome.runtime.sendMessage(anvilExtensionId, {deviceAdded: 'null', setConnected: address},
  function(response) {});
}
