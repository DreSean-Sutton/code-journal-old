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
var $savedFormData = window.addEventListener('beforeunload', YourPersonalStorage);

function YourPersonalStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javscript-local-storage', dataJSON);
}
