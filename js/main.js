/* eslint-disable no-unused-vars */
/* global data */
/* exported data */

var $image = document.querySelector('img');
var $title = document.querySelector('#title-form');
var $photoURL = document.querySelector('#photo-form');
var $notes = document.querySelector('#notes-form');
var $form = document.querySelector('form');

$photoURL.addEventListener('input', photoInput);
$form.addEventListener('submit', submitForm);

function photoInput(event) {
  $image.setAttribute('src', $photoURL.value);
}

function submitForm(event) {
  event.preventDefault();
  var $formValues = {
    title: $title.value,
    photoURL: $photoURL.value,
    notes: $notes.value,
    nextEntryId: data.nextEntryId + 1
  };
  $image.src = 'images/placeholder-image-square.jpg';
  $form.reset();
  data.nextEntryId++;
  data.entries.push($formValues);
}

document.addEventListener('DOMContentLoaded', createJournalEntries);

function createJournalEntries(event) {
  var $dataViewEntries = document.createElement('div');
  var $entriesListHeader = document.createElement('ul');
  var $entriesPhotoURL = document.createElement('li');
  var $entriesTitle = document.createElement('li');
  var $entriesNotes = document.createElement('li');

  $entriesListHeader.textContent = 'Entry';
  $entriesPhotoURL.src = event.photoURL.value;
  $entriesTitle.textContent = event.title.value;
  $entriesNotes.textContent = event.notes.value;

  $dataViewEntries.setAttribute('data-view', 'entries');
  $dataViewEntries.appendChild('#form-container');
  $entriesListHeader.appendChild($dataViewEntries);
  $entriesPhotoURL.appendChild($entriesListHeader);
  $entriesTitle.appendChild($entriesListHeader);
  $entriesNotes.appendChild($entriesListHeader);
  return $dataViewEntries;
}

var $formContainer = document.querySelector('#form-container');
for (var i = 0; i < data.length; i++) {
  $formContainer.appendChild(createJournalEntries(data[i]));
}
