const { createApp } = require('vue');

const App = require('./app');

const router = require('./router');

const app = createApp(App);

app.use(router);

router.isReady().then(() => {
  app.mount('#app');
});
