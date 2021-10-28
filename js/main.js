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
  // debugger;
  var $DOMHeaderRow = document.createElement('div');
  var $DOMHeaderColumn = document.createElement('div');
  var $DOMEntriesRow = document.createElement('div');
  var $DOMEntriesColumn = document.createElement('div');
  var $dataViewEntries = document.createElement('div');
  var $viewEntriesH1 = document.createElement('h1');
  var $entriesListHeader = document.createElement('ul');
  var $entriesPhotoURL = document.createElement('li');
  var $entriesTitle = document.createElement('li');
  var $entriesNotes = document.createElement('li');

  $DOMHeaderRow.setAttribute('class', 'row');
  $DOMHeaderColumn.setAttribute('class', 'column-full');
  $DOMEntriesRow.setAttribute('class', 'row');
  $DOMEntriesColumn.setAttribute('class', 'column-full');
  $dataViewEntries.setAttribute('data-view', 'entries');

  $formContainer.appendChild($DOMHeaderRow);
  $DOMHeaderRow.appendChild($DOMHeaderColumn);
  $DOMHeaderColumn.appendChild($viewEntriesH1);
  $formContainer.appendChild($DOMEntriesRow);
  $DOMEntriesRow.appendChild($DOMEntriesColumn);
  $DOMEntriesColumn.appendChild($dataViewEntries);
  $formContainer.appendChild($dataViewEntries);
  $dataViewEntries.appendChild($entriesListHeader);
  $entriesListHeader.appendChild($entriesPhotoURL);
  $entriesListHeader.appendChild($entriesTitle);
  $entriesListHeader.appendChild($entriesNotes);

  $viewEntriesH1.textContent = 'Entries';
  // $entriesPhotoURL.src = $photoURL.value;
  $entriesTitle.textContent = $title.value;
  $entriesNotes.textContent = $notes.value;
  return $dataViewEntries;
}

var $formContainer = document.querySelector('#form-container');
for (var i = 0; i < data.length; i++) {
  $formContainer.appendChild(createJournalEntries(data[i]));
}
