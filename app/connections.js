function connect(address) {
  console.log('connect');

  chrome.bluetoothLowEnergy.getServices(address, function(services) {
    console.log('services.length: ' + services.length);
  });

  // chrome.bluetoothLowEnergy.connect(address, {persistent: true}, function() {
  //   console.log('connected to: ' + address);
  // });
}
