/* eslint-disable no-unused-vars */
/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('javascript-local-storage');
if (previousDataJSON !== null) {
  data = (JSON.parse(previousDataJSON));
}

window.addEventListener('beforeunload', YourPersonalStorage);

function YourPersonalStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javscript-local-storage', dataJSON);
}

// MAKE AN IF STATEMENT FOR WHETHER OR NOT YOU ARE ON THE ENTRY-FORM
