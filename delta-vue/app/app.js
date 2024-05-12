// defineComponent Module
const { defineComponent } = require('vue');

// navbar component
const DeltaNavbar = require('./DeltaNavbar');

// @vue/component
const App = defineComponent({
  name: 'App',
  components: { DeltaNavbar },
  template: `
    <delta-navbar></delta-navbar>
    <router-view></router-view>
  `,
});

module.exports = App;
