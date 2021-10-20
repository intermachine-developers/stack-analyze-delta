// defineComponent Module
const { defineComponent } = require('vue');

// @vue/component
const App = defineComponent({
  name: 'App',
  template: `
    <nav class="navbar is-dark">
      <header class="navbar-brand">
        <img class="navbar-item" src="logo.png" alt="stack-analyze delta logo" />
      </header>
      <div class="navbar-menu">
      <ul class="navbar-end">
            <li class="navbar-item">
              <router-link class="link" to="/">tech stack</router-link>
            </li>
            <li class="navbar-item">
              <router-link class="link" to="/music">lyric finder</router-link>
            </li>
            <li class="navbar-item">
              <router-link class="link" to="/info">hardware Information</router-link>
            </li>
            <li class="navbar-item">
              <router-link class="link" to="/js-libraries">javascript libraries</router-link>
            </li>
      </ul>
      </div>
    </nav>
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  `
});

module.exports = App;
