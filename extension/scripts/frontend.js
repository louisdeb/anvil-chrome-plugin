var connectingYellow = '#FFF85F';
var connectedGreen = '#9EF85F';

function setButtonConnecting(button) {
  $(button).css('background', connectingYellow);
}

function setButtonConnected(button) {
  $(button).css('background', connectedGreen);
}

function hideSearching() {
  var searching = $('#searching');
  searching.css('display', 'none');
}

function showDeviceList() {
  var list = $('#device-list');
  list.css('display', 'block');
}

function hideBluetoothError() {
  $('#bluetooth-off').css('display', 'none');
}

function showDeviceDisplay() {
  $('.device-display').css('display', 'table');
}

function addDeviceButton(device) {
  var list = $('#device-list');
  var button = $('<button type="button" class="list-group-item device-button"/>').attr('id', device.address).text(device.name).appendTo(list);

  return button;
}
