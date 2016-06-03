var serviceUUID = 'c93fc016-11e3-4ff2-9ce1-d559ad8828f7';
var charUUID = '27b8cd56-0496-498b-aee9-b746e9f74225';

function connect(address) {
  console.log('creating socket...');
  chrome.bluetoothSocket.create(function(createInfo) {
    console.log('socket created: ' + createInfo.socketId);
    console.log('connecting...');
    chrome.bluetoothSocket.connect(createInfo.socketId, address, charUUID, function() {
      if(chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
        return;
      }

      console.log('connected at socket: ' + createInfosocketId);
    });
  });

  return true;
}

function disconnect(address) {

}

function getDeviceService() {

}

function getDeviceServices(address) {

}
