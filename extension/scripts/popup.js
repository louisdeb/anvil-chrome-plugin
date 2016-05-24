$(document).ready(function() {
  $('#findDeviceButton').click(findDevice);
});

function findDevice() {
  $('#findDeviceButton').fadeOut('fast', function() {
    $('#findingDevice').fadeIn('fast', false);
  });

  $('body').animate({
    height: '400px'
  }, 500, false);

}
