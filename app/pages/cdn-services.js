// moudle
const { watchEffect, ref, defineComponent } = require('vue');
const axios = require('axios');

// @vue/component
module.exports = defineComponent({
  name: 'cdnjs services',
  template: `
    <main class="mt-3 mx-3" v-cloak>
      <form class="mb-2">
        <div class="control">
          <input class="input" type="search" placeholder="enter library or framework" v-model="tech" @keypress.enter.prevent>
        </div>
      </form>
      <section class="table-fixed-librarie table-container scroll">
	      <table class="table is-striped is-fullwidth">
	        <thead>
	          <tr>
	            <th>name js tech</th>
	            <th>version</th>
	            <th>link</th>
	          </tr>
	        </thead>
	        <tbody>
	          <tr v-for="(library, i) of libraries" :key="i">
	            <td>{{library.name}}</td>
	            <td>{{library.version}}</td>
	            <td>
	              <button class="button is-info is-outlined" v-if="canCopy" @click="copyLink(library.latest)">
	                copy link
	              </button>
	            </td>
	          </tr>
	        </tbody>
        </table>
      </section>
    </main>
  `,
  setup() {
    const libraries = ref('');
    const tech = ref('');
    const canCopy = ref(!!navigator.clipboard);

    async function copyLink(link) {
      await navigator.clipboard.writeText(link);
      alert('Copied');
    }

    watchEffect(async () => {
      try {
        const res = await axios.get('https://api.cdnjs.com/libraries', {
          params: {
            search: tech.value,
            fields: 'version'
          }
        });

        libraries.value = res.data.results;
      } catch (err) {
        alert(err);
      }
    });

    return {
      libraries,
      tech,
      canCopy,
      copyLink
    };
  }
});

