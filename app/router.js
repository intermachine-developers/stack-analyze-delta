// vue-router modules
const { createRouter, createWebHistory } = require('vue-router');

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
    path: '/music', 
    component: require('./pages/music'),
    name: 'LyricFinder'
  },
  {
    path: '/js-libraries', 
    component: require('./pages/cdn-services'),
    name: 'cdnjsServices'
  }
];

// router instance
const router = createRouter({
  history: createWebHistory(location.pathname),
  routes // short for `routes: routes`
});

module.exports = router;
