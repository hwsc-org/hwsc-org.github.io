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
    'Documentation': `${USER_SVC_PATH}doc.html`,
  }));

  // all wikis for File Transaction Directory
  const FILE_TRANS_SVC_PATH = '/wikis/file-transaction-svc/';
  const fileTransSvcRoutes = new Map(Object.entries({
    // ORDER MATTERS, also replace .md extension to .html
    'Documentation': `${FILE_TRANS_SVC_PATH}doc.html`,
  }));


  // all wikis for App Gateway Directory
  const APP_GATEWAY_PATH = '/wikis/app-gateway/';
  const appGatewayRoutes = new Map(Object.entries({
    // ORDER MATTERS, also replace .md extension to .html
    'Epics': `${APP_GATEWAY_PATH}epics.html`,
  }));

  // all wikis for fundamentals
  const FUNDAMENTALS_PATH = '/wikis/fundamentals/';
  const fundamentalsRoutes = new Map(Object.entries({
    // ORDER MATTERS, also replace .md extension to .html
    'Introduction': `${FUNDAMENTALS_PATH}intro.html`,
    'Onboarding': `${FUNDAMENTALS_PATH}onboarding.html`,
    'Runbooks': `${FUNDAMENTALS_PATH}runbooks.html`,
    'Authorization/Authentication': `${FUNDAMENTALS_PATH}authority.html`,
    'Database Migration': `${FUNDAMENTALS_PATH}db-migration.html`,
    'CI/CD': `${FUNDAMENTALS_PATH}ci-cd.html`,
  }));

  // menu to parse (ORDER MATTERS)
  const sideMenuMap = new Map([
    ['Fundamentals', fundamentalsRoutes],
    ['Frontend', frontSvcRoutes],
    ['App Gateway', appGatewayRoutes],
    ['User', userSvcRoutes],
    ['File Transaction', fileTransSvcRoutes],
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
