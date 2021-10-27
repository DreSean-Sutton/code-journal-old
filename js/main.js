/* global data */
/* exported data */

var $image = document.querySelector('img');
var $title = document.querySelector('#title-form');
var $photoURL = document.querySelector('#photo-form');
var $notes = document.querySelector('#notes-form');
// var $submit = document.querySelector('#submit-button');
var $form = document.querySelector('form');

$photoURL.addEventListener('input', photoInput);
$form.addEventListener('submit', submitForm);

function photoInput(event) {
  $image.setAttribute('src', $photoURL.value);
}

function submitForm(event) {
  var $formValues =
  {
    title: $title.value,
    photoURL: $photoURL.value,
    notes: $notes.value,
    nextEntryId: 1
  };
  $formValues.nextEntryId++;
  data.entries.push($formValues);
  data.nextEntryId++;
  $image.src = 'images/placeholder-image-square.jpg';
  $form.reset();
}
