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
// eslint-disable-next-line no-unused-vars
var $savedFormData = window.addEventListener('beforeunload', YourPersonalStorage);

function YourPersonalStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javscript-local-storage', dataJSON);
}
