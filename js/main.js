/* global data */
/* exported data */

var $title = document.querySelector('#title-form');
var $photoURL = document.querySelector('#photo-form');
var $notes = document.querySelector('#notes-form');
// var $submit = document.querySelector('#submit-button');
var $form = document.querySelector('form');

$photoURL.addEventListener('input', photoInput);
$form.addEventListener('submit', submitForm);

function photoInput(event) {
  $photoURL.setAttribute('src', $photoURL.value);
  return $photoURL;
}

function submitForm(event) {
  var $formValue =
  {
    title: $title.value,
    photoURL: $photoURL.value,
    notes: $notes.value,
    nextEntryId: 1
  };
  $formValue.nextEntryId++;
  // console.log('is FormValue.nextEntryId incrementing?:', $formValue.nextEntryId);
  return $formValue;
}
