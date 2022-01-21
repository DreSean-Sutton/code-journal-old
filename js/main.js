/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* global data */
/* exported data */

var currentEntryId = 0;

var $formContainer = document.querySelector('#form-container');
var $image = document.querySelector('img');
var $title = document.querySelector('#title-form');
var $photoURL = document.querySelector('#photo-form');
var $notes = document.querySelector('#notes-form');
var $form = document.querySelector('form');
var $submitButton = document.querySelector('#submit-button');
var $dataEntryForm = document.querySelector('#data-entry-form');
var $dataViewEntries = document.querySelector('#entries');
var $headerTitle = document.querySelector('#header-title');
var $newAnchor = document.querySelector('#to-new-entries');
var $noEntries = document.querySelector('#no-entries');
var $titleDiv = document.querySelector('#title-div');
var $navEntries = document.querySelector('#entries-nav');
var $EntriesListHeader = document.querySelector('#entries-list-header');
var $deleteButton = document.querySelector('#delete-button');
var $deleteConfirmationModal = document.querySelector('#modal');
var $cancelButton = $deleteConfirmationModal.querySelector('.cancel');
var $confirmButton = $deleteConfirmationModal.querySelector('.confirm');

$photoURL.addEventListener('input', photoInput);
$form.addEventListener('submit', submitForm);
window.addEventListener('DOMContentLoaded', loopThroughRenderEntry);
$newAnchor.addEventListener('click', switchViewToEntryForm);
$navEntries.addEventListener('click', switchViewToEntries);
$deleteButton.addEventListener('click', bringUpDeleteModal);
$deleteConfirmationModal.addEventListener('click', cancelOrConfirm);

function photoInput(event) {
  $image.setAttribute('src', $photoURL.value);
}

function submitForm(event) {
  event.preventDefault();
  if (data.editing === null) {
    var $formValues = {
      title: $title.value,
      photoURL: $photoURL.value,
      notes: $notes.value,
      nextEntryId: data.nextEntryId + 1
    };
    data.nextEntryId++;
    data.entries.push($formValues);
    $dataViewEntries.prepend(renderEntry($formValues));
    currentEntryId++;
  } else {
    data.editing.title = $title.value;
    data.editing.photoURL = $photoURL.value;
    data.editing.notes = $notes.value;

    for (var j = 0; j < data.entries.length; j++) {
      if (data.entries[j].nextEntryId === data.editing.nextEntryId) {
        data.entries.splice(j, 1, data.editing);
        break;
      }
    }
    for (let k = $EntriesListHeader.children.length - 1; k >= 0; k--) {
      if (Number($EntriesListHeader.children[k].dataset.entryId) === data.editing.nextEntryId - 2) {
        $EntriesListHeader.children[k].querySelector('h3').textContent = data.editing.title;
        $EntriesListHeader.children[k].querySelector('img').textContent = data.editing.photoURL;
        $EntriesListHeader.children[k].querySelector('img').setAttribute('src', data.editing.photoURL);
        $EntriesListHeader.children[k].querySelector('p').textContent = data.editing.notes;
        data.editing = null;
        break;
      }
    }
  }
  $image.src = 'images/placeholder-image-square.jpg';
  switchViewToEntries();
  $form.reset();
}

function switchViewToEntries() {
  $dataViewEntries.className = '';
  $dataEntryForm.className = 'hidden';
  $headerTitle.textContent = 'Entries';
  $newAnchor.className = '';
  $titleDiv.className = 'column-one-fourth';
  data.view = 'entries';
  data.editing = null;
  $deleteButton.classList.add('hidden');
  $deleteConfirmationModal.classList.add('hidden');
  $title.value = '';
  $photoURL.value = '';
  $image.src = 'images/placeholder-image-square.jpg';
  $notes.value = '';
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

function bringUpDeleteModal(event) {
  switchViewToEntryForm();
  $deleteConfirmationModal.classList.remove('hidden');
}

function cancelOrConfirm(event) {
  // debugger;
  if (event.target === $cancelButton) {
    $deleteConfirmationModal.classList.add('hidden');
  }

  if (event.target === $confirmButton) {
    // debugger;
    for (var j = 0; j < data.entries.length; j++) {
      if (data.entries[j].nextEntryId === data.editing.nextEntryId) {
        data.entries.splice(j, 1);
        data.nextEntryId -= 1;
        for (var i = j; i < data.entries.length; i++) {
          data.entries[i].nextEntryId -= 1;
        }
        for (let k = $EntriesListHeader.children.length - 1; k >= 0; k--) {
          if (Number($EntriesListHeader.children[k].dataset.entryId) === data.editing.nextEntryId - 2) {
            $EntriesListHeader.removeChild($EntriesListHeader.children[k]);
            break;
          }
        }
        for (let l = j; l < $EntriesListHeader.children.length; l++) {
          $EntriesListHeader.children[l].dataset.entryId -= 1;
        }
      }
    }
    currentEntryId--;
    switchViewToEntries();
  }
}

function renderEntry(entry) {
  var $DOMEntriesRow = document.createElement('div');
  var $DOMPhotoColumn = document.createElement('div');
  var $DOMTitleNoteColumn = document.createElement('div');
  var $entriesTitle = document.createElement('h3');
  var $entriesPhotoURL = document.createElement('img');
  var $entriesNotes = document.createElement('p');
  var $pencilEditer = document.createElement('i');

  $DOMEntriesRow.addEventListener('click', editEntry);

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

  function editEntry(event) {
    if (event.target === $pencilEditer) {
      switchViewToEntryForm();
      var $currentRow = event.target.closest('.row');
      for (let i = 0; i < data.entries.length; i++) {
        if (Number($currentRow.dataset.entryId) === data.entries[i].nextEntryId - 2) {
          $title.value = data.entries[i].title;
          $photoURL.value = data.entries[i].photoURL;
          $image.setAttribute('src', data.entries[i].photoURL);
          $notes.value = data.entries[i].notes;
          data.editing = {
            title: $title.value,
            photoURL: $photoURL.value,
            notes: $notes.value,
            nextEntryId: data.entries[i].nextEntryId
          };
          $deleteButton.classList.remove('hidden');
          break;
        }
      }
    }
  }

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
