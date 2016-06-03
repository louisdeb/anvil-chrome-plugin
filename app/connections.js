var charUUID = '27b8cd56-0496-498b-aee9-b746e9f74225';

function connect(address) {

  /* Connect persistently to the device. */
  chrome.bluetoothLowEnergy.connect(address, {persistent: true}, function() {
    if(chrome.runtime.lastError) {

      /* If we click a green device, we get this. We should try and handle it
         earlier. e.g. by removing the listener, or instead using the click
         to disconnect the device. */
      if(chrome.runtime.lastError.message == 'Already connected')
        setDeviceConnected(address);

      /* Print error and exit. */
      console.log(chrome.runtime.lastError.message);
      return;
    }

    console.log('Successfully connected to ' + address);
    setDeviceConnected(address);
    // getDeviceService();
    getDeviceServices(address);
  });

  return true;
}

function disconnect(address) {
  chrome.bluetoothLowEnergy.disconnect(address, function() {
    if(chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
      return;
    }

    console.log('Successfully disconnected from ' + address);
  })
}

function getDeviceService() {
  chrome.bluetoothLowEnergy.getService('c93fc016-11e3-4ff2-9ce1-d559ad8828f7', function() {
    console.log('got service');
  });
}

function getDeviceServices(address) {
  chrome.bluetoothLowEnergy.getServices(address, function(services) {
    console.log('services.length: ' + services.length);
  });
}
