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
var $noEntries = document.querySelector('#no-entries');
var $titleDiv = document.querySelector('#title-div');
var $navEntries = document.querySelector('#entries-nav');

$photoURL.addEventListener('input', photoInput);
$form.addEventListener('submit', submitForm);
document.addEventListener('DOMContentLoaded', renderEntries);
$newAnchor.addEventListener('click', switchViewToEntryForm);
$navEntries.addEventListener('click', switchViewToEntries);
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
  $titleDiv.className = 'column-one-quarter';
  noEntries();
  data.view = 'entries';
}

function switchViewToEntryForm() {
  $dataViewEntries.className = 'hidden';
  $dataEntryForm.className = '';
  $headerTitle.textContent = 'New Entry';
  $newAnchor.className = 'hidden';
  $titleDiv.className = 'column-full';
  data.view = 'entry-form';
  $noEntries.className = 'hidden';
}

function noEntries() {
  if (data.entries.length === 0) {
    $noEntries.className = '';
  }
}
function renderEntries(event) {
  switchViewToEntries();
  var $DOMEntriesRow = document.createElement('div');
  var $DOMPhotoColumn = document.createElement('div');
  var $DOMTitleNoteColumn = document.createElement('div');
  var $entriesTitle = document.createElement('h2');
  var $entriesPhotoURL = document.createElement('img');
  var $entriesNotes = document.createElement('p');
  $DOMEntriesRow.className = 'row';
  $DOMPhotoColumn.className = 'column-full column-half';

  $dataViewEntries.prepend($DOMEntriesRow);
  $DOMEntriesRow.appendChild($DOMPhotoColumn);
  $DOMEntriesRow.appendChild($DOMTitleNoteColumn);
  $DOMPhotoColumn.appendChild($entriesPhotoURL);
  $DOMTitleNoteColumn.appendChild($entriesTitle);
  $DOMTitleNoteColumn.appendChild($entriesNotes);

  var $dataEntriesIndex = data.entries[i];
  $entriesPhotoURL.setAttribute('src', $dataEntriesIndex.photoURL);
  $entriesTitle.textContent = $dataEntriesIndex.title;
  $entriesNotes.textContent = $dataEntriesIndex.notes;
  noEntries();
  return $DOMEntriesRow;
}

for (var i = 0; i < data.entries.length - 1; i++) {
  if ((data.view === 'entry-form') && (data.entries.length === 0)) {
    switchViewToEntries();
  } else {
    switchViewToEntries();
    $dataViewEntries.prepend(renderEntries(data[i]));
  }
}
