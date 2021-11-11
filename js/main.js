/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* global data */
/* exported data */

var $formContainer = document.querySelector('#form-container');
var $image = document.querySelector('img');
var $title = document.querySelector('#title-form');
var $photoURL = document.querySelector('#photo-form');
var $notes = document.querySelector('#notes-form');
var $form = document.querySelector('form');
var $dataEntryForm = document.querySelector('#data-entry-form');
var $dataViewEntries = document.querySelector('#entries');
var $headerTitle = document.querySelector('#header-title');
var $newAnchor = document.querySelector('#to-new-entries');

$photoURL.addEventListener('input', photoInput);
$form.addEventListener('submit', submitForm);
window.addEventListener('DOMContentLoaded', renderEntries);
$newAnchor.addEventListener('click', switchViewToEntryForm);
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
  switchViewToEntries();
  renderEntries();
}

function switchViewToEntries() {
  $dataViewEntries.className = '';
  $dataEntryForm.className = 'hidden';
  $headerTitle.textContent = 'Entries';
  $newAnchor.className = '';
  data.view = 'entries';
}

function switchViewToEntryForm() {
  $dataViewEntries.className = 'hidden';
  $dataEntryForm.className = '';
  $headerTitle.textContent = 'New Entry';
  $newAnchor.className = 'hidden';
  data.view = 'entry-form';
}

function renderEntries(event) {
  console.log('data:', data);
  var $DOMEntriesRow = document.createElement('div');
  var $DOMEntriesColumn = document.createElement('div');
  var $entriesTitle = document.createElement('h2');
  var $entriesPhotoURL = document.createElement('img');
  var $entriesNotes = document.createElement('p');

  $DOMEntriesRow.setAttribute('class', 'row');
  $DOMEntriesColumn.setAttribute('class', 'column-full column-half');

  $dataViewEntries.prepend($DOMEntriesRow);
  $DOMEntriesRow.appendChild($DOMEntriesColumn);
  $DOMEntriesColumn.appendChild($entriesPhotoURL);
  $DOMEntriesColumn.appendChild($entriesTitle);
  $DOMEntriesColumn.appendChild($entriesNotes);

  var $dataEntriesIndex = data.entries[i];
  $entriesPhotoURL.setAttribute('src', $dataEntriesIndex.photoURL);
  $entriesTitle.textContent = $dataEntriesIndex.title;
  $entriesNotes.textContent = $dataEntriesIndex.notes;

  console.log('data:', data);
  console.log('$entriesPhotoURL:', $entriesPhotoURL);
  console.log('$entriesNotes.textContent:', $entriesNotes);
  console.log('$entriesTitle.textContent:', $entriesTitle);
  return $DOMEntriesRow;
}

for (var i = 0; i < data.entries.length; i++) {
  if ((data.view === 'entry-form') && (data.entries.length === 0)) {
    switchViewToEntryForm();
  } else {
    switchViewToEntries();
    $dataViewEntries.appendChild(renderEntries(data[i]));
  }
}
