/* global data */
/* exported data */

var $photoURL = document.querySelector('#photo-form');
// var $photoURLSrcAttribute.getAttribute('src');
$photoURL.addEventListener('input', photoInput);
function photoInput(event) {
  $photoURL.setAttribute('src', $photoURL.value);
  return $photoURL;
}
