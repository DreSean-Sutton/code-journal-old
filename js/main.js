/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* global data */
/* exported data */

/*
*/
var currentEntryId = 0;

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
var $EntriesListHeader = document.querySelector('#entries-list-header');

$photoURL.addEventListener('input', photoInput);
$form.addEventListener('submit', submitForm);
window.addEventListener('DOMContentLoaded', loopThroughRenderEntry);
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
  console.log(data.entries);
  switchViewToEntries();
  $dataViewEntries.prepend(renderEntry($formValues));
}

function switchViewToEntries() {
  $dataViewEntries.className = '';
  $dataEntryForm.className = 'hidden';
  $headerTitle.textContent = 'Entries';
  $newAnchor.className = '';
  $titleDiv.className = 'column-one-fourth';
  data.view = 'entries';
  noEntries();
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
  if ((data.entries.length === 0) && (data.view === 'entries')) {
    $noEntries.className = '';
  }
}

function pageRefresher() {
  if (data.view === 'entries') {
    switchViewToEntries();
  } else if (data.view === 'entry-form') {
    switchViewToEntryForm();
  }
}

pageRefresher();

function renderEntry(entry) {
  var $DOMEntriesRow = document.createElement('div');
  var $DOMPhotoColumn = document.createElement('div');
  var $DOMTitleNoteColumn = document.createElement('div');
  var $entriesTitle = document.createElement('h2');
  var $entriesPhotoURL = document.createElement('img');
  var $entriesNotes = document.createElement('p');
  var $pencilEditer = document.createElement('i');

  $DOMEntriesRow.classList.add('row');
  $DOMPhotoColumn.classList.add('column-full', 'column-half');
  $DOMTitleNoteColumn.classList.add('entries-content-layout', 'column-half', 'column-full');
  $entriesTitle.classList.add('column-three-fourth');
  $pencilEditer.classList.add('fas', 'fa-pencil-alt');

  $EntriesListHeader.prepend($DOMEntriesRow);
  $DOMEntriesRow.appendChild($DOMPhotoColumn);
  $DOMEntriesRow.appendChild($DOMTitleNoteColumn);
  $DOMPhotoColumn.appendChild($entriesPhotoURL);
  $DOMTitleNoteColumn.appendChild($entriesTitle);
  $DOMTitleNoteColumn.appendChild($pencilEditer);
  $DOMTitleNoteColumn.appendChild($entriesNotes);

  $entriesPhotoURL.setAttribute('src', entry.photoURL);
  $entriesTitle.textContent = entry.title;
  $entriesNotes.textContent = entry.notes;
  $DOMEntriesRow.setAttribute('data-entry-id', currentEntryId);
  return $EntriesListHeader;
}

function loopThroughRenderEntry() {
  if (data.entries.length === 0) {
    noEntries();
  }
  for (var i = 0; i < data.entries.length; i++) {
    $dataViewEntries.prepend(renderEntry(data.entries[i]));
    currentEntryId++;
  }
}
