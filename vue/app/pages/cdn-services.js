// moudle
const { ref, defineComponent } = require('vue');
const axios = require('axios');

const { toast } = require('./toast');

// @vue/component
module.exports = defineComponent({
  name: 'cdnjs services',
  template: `
    <main class="mt-3 mx-3">
      <form class="mb-2" @submit.prevent="searchTech">
        <div class="control">
          <input 
            class="input" 
            type="search" 
            required
            placeholder="enter library or framework" 
            v-model="tech" 
            @keypress.enter.prevent
          >
        </div>
        <button 
          class="mt-2 button is-info is-outlined is-fullwidth is-small" 
          type="submit"
        >
          search libraries
        </button>
      </form>
      <button 
        class="my-2 button is-danger is-outlined is-fullwidth is-small" 
        @click="reset"
      >
        Reset search
      </button>
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

    const searchTech = async () => {
      try {
        const { data } = await axios.get('https://api.cdnjs.com/libraries', {
          params: {
            search: tech.value,
            fields: 'version'
          }
        });

        libraries.value = data.results;
      } catch (err) {
        toast(err, 'is-danger');
      }

      tech.value = '';
    };

    const reset = () => (libraries.value = []);

    return {
      libraries,
      tech,
      canCopy,
      copyLink,
      searchTech,
      reset
    };
  }
});

