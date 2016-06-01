function connect(address) {
  chrome.bluetoothLowEnergy.connect(address, function() {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
      return;
    }
    console.log('completed request');
    setDeviceConnected(address);
  });

  // chrome.bluetoothLowEnergy.getServices(address, function(services) {
  //   console.log('services.length: ' + services.length);
  //   // console.log('uuid: ' + services[0].uuid);
  // });

  // chrome.bluetoothLowEnergy.disconnect(address, function() {
  //   console.log('successful disconnection');
  // });

  return true;
}
