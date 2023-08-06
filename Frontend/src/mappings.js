export default {
////////////////////    ROUTER PATHS    ////////////////////
addRekemPath: '/addRekem',
dashboardPath: '/dashboard',
signInPath: '/signIn/',
devPath: '/dev',

////////////////////    API PATHS   ////////////////////
API_login: '/api/user/login', // POST
API_isLoggedIn: '/api/user/isLoggedIn', // GET
API_logout: '/api/user/logout', // GET
API_get_rekems_by_gdud: '/api/rekems/get_by_gdud/', // GET, :gdud as param
API_get_rekems_of_user: '/api/rekems/get_of_user/', // GET,
API_add_rekem: '/api/rekems/add/', // POST


////////////////////    REDUCER SETTINGS   ////////////////////
setUserData: "SETUSERDATA",
setSessionData: "SETSESSIONDATA",
toggleDarkMode: "TOGGLEDARKMODE",
setDarkMode: "SETDARKMODE",
setRekemList: "SETREKEMLIST",

////////////////////    LOCAL STORAGE   ////////////////////
darkMode: "DARKMODE",
userData: "USERDATA",
sessionData: "SESSIONDATA",

};