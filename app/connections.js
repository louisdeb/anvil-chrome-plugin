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

function getDeviceServices(address) {
  chrome.bluetoothLowEnergy.getServices(address, function(services) {
    console.log('services.length: ' + services.length);

    $.each(services, function(index, val) {
      if(val.uuid == uuid) {
        console.log('service: ' + val.uuid);
        console.log('is primary: ' + val.isPrimary);
        console.log('instance id: ' + val.instanceId);
        console.log('device address: ' + val.deviceAddress);

        getCharacteristics(val.instanceId);
      }
    });
  });
}

function getCharacteristics(serviceId) {
  chrome.bluetoothLowEnergy.getCharacteristics(serviceId, function(characteristics) {
    console.log('characteristics.length: ' + characteristics.length);
  });
}
