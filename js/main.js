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

$photoURL.addEventListener('input', photoInput);
$form.addEventListener('submit', submitForm);

function photoInput(event) {
  $image.setAttribute('src', $photoURL.value);
}

function submitForm(event) {
  // debugger;
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
  // return data;
}

window.addEventListener('DOMContentLoaded', renderEntries);

function renderEntries(event) {
  // debugger;
  console.log('data:', data);
  var $DOMEntriesRow = document.createElement('div');
  var $DOMEntriesColumn = document.createElement('div');
  var $entriesTitle = document.createElement('h2');
  var $entriesPhotoURL = document.createElement('img');
  var $entriesNotes = document.createElement('p');

  $DOMEntriesRow.setAttribute('class', 'row');
  $DOMEntriesColumn.setAttribute('class', 'column-half column-full');

  $dataViewEntries.prepend($DOMEntriesRow);
  $DOMEntriesRow.appendChild($DOMEntriesColumn);
  $DOMEntriesColumn.appendChild($entriesPhotoURL);
  $DOMEntriesColumn.appendChild($entriesTitle);
  $DOMEntriesColumn.appendChild($entriesNotes);

  $entriesPhotoURL.setAttribute('src', data.entries[i].photoURL);
  $entriesTitle.textContent = data.entries[i].title;
  $entriesNotes.textContent = data.entries[i].notes;

  console.log('data:', data);
  console.log('$entriesPhotoURL:', $entriesPhotoURL);
  console.log('$entriesNotes.textContent', $entriesNotes);
  console.log('$entriesTitle.textContent:', $entriesTitle);
  return $DOMEntriesRow;
}
// debugger;

for (var i = 0; i < data.entries.length; i++) {
  if (data.length === 0) {
    $dataEntryForm.className = '';
    data.view = 'entry-form';
    $headerTitle.textContent = 'New Entry';
  } else {
    $dataEntryForm.className = 'hidden';
    $dataViewEntries.appendChild(renderEntries(data[i]));
    $headerTitle.textContent = 'Entries';
  }
}
