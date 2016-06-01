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

function setButtonConnecting(button) {
  $(button).css('background', connectingYellow);
}

function setButtonConnected(button) {
  console.log('setButtonConnected');
  $(button).css('background', connectedGreen);
}
