// vue-router modules
const { createRouter, createWebHashHistory } = require('vue-router');

const history = createWebHashHistory()

// routes
const routes = [
  {
    path: '/', 
    component: require('./pages/home'),
    name: 'TechStack'
  },
  {
    path: '/info', 
    component: require('./pages/info'),
    name: 'HardwareInformation'
  },
  {
    path: '/password', 
    component: require('./pages/password'),
    name: 'PasswordGenerator'
  },
  {
    path: '/music', 
    component: require('./pages/music'),
    name: 'LyricFinder'
  },
  {
    path: '/js-libraries', 
    component: require('./pages/cdn-services'),
    name: 'CdnjsServices'
  },
  {
    path: '/digimon', 
    component: require('./pages/digimon'),
    name: 'DigimonCards'
  }
];

// router instance
const router = createRouter({
  history, routes
});

module.exports = router;
