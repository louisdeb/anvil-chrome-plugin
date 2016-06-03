var anvilAppId = 'ldncnaddidblggfmabnfllmjhmagkdoh';

$(document).ready(function() {

  /* Get bluetooth adapter info. */
  chrome.runtime.sendMessage(anvilAppId, {getAdapterStateInfo: true},
    function(response) {
      if(response.info.available && response.info.powered) {
        hideBluetoothError();
        showDeviceDisplay();
      }
    });

  getDevices();
  findDevice();
});

/* Called to start discovering devices. */
function findDevice() {
  chrome.runtime.sendMessage(anvilAppId, {startDiscovering: true}, function(response) {});
}

/* Called to stop discovering devices. */
function stopDiscovering() {
  chrome.runtime.sendMessage(anvilAppId, {stopDiscovering: true}, function(response) {});
}

/* Fetches all discovered devices and connecting addresses from the app.
   When populating the list, it checks whether to set the button to yellow
   to indicate connecting.
   Will eventually also fetch connected devices. */
function getDevices() {
  chrome.runtime.sendMessage(anvilAppId, {getDevices: true},
  function(deviceInfos) {
    chrome.runtime.sendMessage(anvilAppId, {getConnectingAddresses: true},
    function(connectingAddresses) {
      chrome.runtime.sendMessage(anvilAppId, {getConnectedAddresses: true},
      function(connectedAddresses) {
        $.each(deviceInfos, function(i) {
          var button = addDevice(deviceInfos[i]);
          if($.inArray(deviceInfos[i].address, connectingAddresses) != -1)
            setButtonConnecting(button);
          if($.inArray(deviceInfos[i].address, connectedAddresses) != -1)
            setButtonConnected(button);
        });
      });
    });
  });
}

function addDevice(device) {
  hideSearching();
  showDeviceList();
  var button = addDeviceButton(device);
  $('.device-button').click(deviceSelected);
  return button;
}

/* Called when a button in the device list is clicked.
   event.target provides the button element. */
function deviceSelected() {
  var button = event.target;
  setButtonConnecting(button);

  chrome.runtime.sendMessage(anvilAppId, {connectionRequested: button.id},
  function(response) {});
}

/* The app passes us a device which has just been added. We then add it to
   the list.*/
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if(request.deviceAdded != 'null') {
      addDevice(request.deviceAdded);
    }
    else if(request.setConnected != 'null') {
      var button = $(document.getElementById(request.setConnected));
      setButtonConnected(button);
    }
    else if(request.deviceRemoved != 'null') {
      var button = $(document.getElementById(request.deviceRemoved));
      button.remove();
    }
  }

  return true;
);
