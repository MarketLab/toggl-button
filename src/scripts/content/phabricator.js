/*jslint indent: 2 */
/*global $: false, document: false, togglbutton: false*/
'use strict';
// Workboard view
var findTagByType = function (elem, icon_class) {
    var tag = $('.phui-tag-core > .fa-' + icon_class, elem);
    if (!tag) { return tag; }
    return tag.parentNode.textContent;
  },
  findBestProjectName = function (elem) {
    return findTagByType(elem, 'flask') ||
           findTagByType(elem, 'briefcase') ||
           findTagByType(elem, 'credit-card') ||
           '';
  };

togglbutton.render('#phabricator-standard-page-body .phui-workpanel-view .phui-object-item:not(.toggl)', {observe: true}, function (elem) {
  var link,
    description = $('.phui-object-item-name', elem).textContent,
    projectName = findBestProjectName(elem);

  link = togglbutton.createTimerLink({
    className: 'phabricator',
    buttonType: 'minimal',
    description: description,
    projectName: projectName
  });

  $('.phui-object-item-name', elem).appendChild(link);
});

// Task detail view
togglbutton.render('.phui-header-header .fa-exclamation-circle:not(.toggl)', {observe: true}, function (elem) {
  var link,
    parent = elem.parentNode,
    description = parent.textContent,
    projectName = findBestProjectName($('.phabricator-handle-tag-list')),
    id = $('.phabricator-last-crumb').textContent.trim();

  link = togglbutton.createTimerLink({
    className: 'phabricator',
    description: id + " " + description,
    projectName: projectName
  });

  parent.appendChild(link);
});