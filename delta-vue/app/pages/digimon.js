const { ref, defineComponent } = require('vue');
const axios = require('axios');

const { toast } = require('./toast');

module.exports = defineComponent({
  name: 'Digimon Cards',
  template: `
    <main class="mt-3 mx-3">
      <form @submit.prevent="digimonSearch">
        <div class="control">
          <input 
            class="input" 
            type="text"
            placeholder="enter a digimon name"
            required
            @keypress.enter.prevent
            v-model="digimonName"
          >
        </div>
        <button 
          class="mt-2 button is-info is-outlined is-fullwidth is-small" 
          type="submit"
        >
          start search
        </button>
      </form>
      <button
        class="my-2 button is-danger is-outlined is-fullwidth is-small"
        @click="reset"
      >
        Reset analyze
      </button>
      <section class="digimon-container fixed-stack mt-2 scroll">
        <img 
          class="digimon-card"
          :src="digimon.image_url" 
          :alt="digimon.name"
          v-for="digimon of digimonList" 
          :key="digimon.name"
        >
      </section>
    </main>
  `,
  setup() {
    const digimonName = ref('');
    const digimonList = ref([]);

    const digimonSearch = async () => {
      try {
        const { data } = await axios.get('https://digimoncard.io/api-public/search.php', {
          params: {
            n: digimonName.value,
            sort: 'name'
          }
        });
        digimonList.value = data;
      } catch(err) {
        toast(err, 'is-danger');
      }
      
      digimonName.value = '';
    };
    
    const reset = () => (digimonList.value = []);

    return {
      digimonName,
      digimonList,
      digimonSearch,
      reset
    };
  }
});

