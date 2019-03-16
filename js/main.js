$(document).ready(function() {
  // headers to add anchor tags to, used by anchor.js
  anchors.add('h2');
  anchors.add('h3');

  // all wikis for Front End Service Directory
  const FRONT_SVC_PATH = '/wikis/frontend-svc/';
  const frontSvcRoutes = new Map(Object.entries({
    // ORDER MATTERS, also replace .md extension to .html
    Rules: `${FRONT_SVC_PATH}rules.html`,
    Vuex: `${FRONT_SVC_PATH}vuex.html`,
  }));

  // all wikis for User Service Directory
  const USER_SVC_PATH = '/wikis/user-svc/';
  const userSvcRoutes = new Map(Object.entries({
    // ORDER MATTERS, also replace .md extension to .html
    'Permission Level': `${USER_SVC_PATH}perm_level.html`,
  }));

  // all wikis for App Gateway Directory
  const APP_GATEWAY_PATH = '/wikis/app-gateway/';
  const appGatewayRoutes = new Map(Object.entries({
    // ORDER MATTERS, also replace .md extension to .html
    'Epics': `${APP_GATEWAY_PATH}epics.html`
  }));

  // menu to parse (ORDER MATTERS)
  const sideMenuMap = new Map([
    ['App Gateway', appGatewayRoutes],
    ['Frontend', frontSvcRoutes],
    ['User', userSvcRoutes],
  ]);

  const createMenu = () => {
    let appendHTML = '';

    // generate menu
    sideMenuMap.forEach((menuArr, menuTitle) => {
      appendHTML += '<li class="nav-item">' +
        '<a class="nav-link">' + menuTitle + '</a>' +
        '<ul class="nav flex-column ml-3">';

      for (let link of menuArr) {
        appendHTML += '<li class="nav-item">' +
        '<a class="nav-link" href="' + link[1] + '">' + link[0] + '</a></li>'
      }
      appendHTML += '</ul>'
    });

    // append menu to element
    menuTarget.insertAdjacentHTML('afterbegin', appendHTML);
  };

  menuTarget = document.getElementById('hwsc-services');
  if (menuTarget != null) {
    createMenu();
  }
});