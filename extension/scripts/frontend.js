var connectingYellow = '#FFF85F';
var connectedGreen = '#9EF85F';
var animatingDevices;

function animateDiscovering() {
  $('#frontend').text('frontend animateDiscovering');
  var title = $('#device-title');

  var i = 1;
  animatingDevices = setInterval(function() {
    if(i % 4 > 0) {
      title.text(title.text() + '.');
    } else {
      title.text('Devices');
    }
    i = i + 1;
  }, 1000);
}

function stopAnimateDiscovering() {
  clearInterval(animatingDevices);
  $('#device-title').text('Devices');
}

function addDevice(device) {
  var list = $('#device-list');
  var button = $('<button type="button" class="list-group-item device-button"/>').attr('id', device.address).text(device.name).appendTo(list);
  $('.device-button').click(deviceSelected);
  return button;
}

function setButtonConnecting(button) {
  $(button).css('background', connectingYellow);
}

function setButtonConnected(button) {
  $(button).css('background', connectedGreen);
}
