function connect(address) {
  console.log('connect: ' + address);

  chrome.bluetoothLowEnergy.connect(address, function() {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
      return;
    }
    console.log('completed request');
  });

  // chrome.bluetoothLowEnergy.getServices(address, function(services) {
  //   console.log('services.length: ' + services.length);
  // });

  return true;
}
