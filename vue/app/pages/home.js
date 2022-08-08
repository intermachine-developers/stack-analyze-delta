// modules
const { shell } = require('electron');
const { reactive, computed, defineComponent } = require('vue');
const Wappalyzer = require('wappalyzer');

const { toast } = require('./toast');

module.exports = defineComponent({
  name: 'Tech Stack',
  template: `
    <main class="mt-3 mx-3">
        <form @submit.prevent="singleStack">
          <div class="control">
            <input 
            id="website" 
            class="input" 
            @keypress.enter.prevent
            v-model="stack.url" 
            placeholder="enter a website" 
            type="url" 
            />
          </div>
          <button 
            class="mt-2 button is-info is-outlined is-fullwidth is-small" 
            type="submit" 
            :disabled="validateButton"
          >
            analyze website
          </button>
        </form>
        <button 
          class="my-2 button is-danger is-outlined is-fullwidth is-small"
          @click="reset"
        >
          Reset analyze
        </button>
        <section class="fixed-stack scroll">
          <article class="card content mx-4" v-for="app of stack.apps" :key="app.slug">
            <div class="card-image">
              <figure class="image is-128x128">
                <img :src="'logos/'+app.icon" :alt="app.name+' logo'">
              </figure>
            </div>
            <header class="card-header">
              <strong class="card-header-title">{{app.name}}</strong>
            </header>
            <p class="card-content">
              <span v-for="categorie of app.categories" :key="categorie.id">{{categorie.name}}, </span>
            </p>
            <footer class="card-footer">
              <a 
                :href="app.website" 
                class="card-footer-item" 
                target="_blank" 
                @click="openWeb"
              >
                {{app.name}} website
              </a>
            </footer>
          </article>
        </section>
    </main>
    `,
  setup() {
    const stack = reactive({
      url: '',
      apps: []
    });

    const singleStack = async () => {
      const wappalyzer = new Wappalyzer();
      try {
        await wappalyzer.init();

        const { technologies } = await wappalyzer.open(stack.url).analyze();
        if(technologies[0] === undefined) {
          alert('no tech-stack or no internet');
        } else {
          stack.apps = technologies;
        }
      } catch (err) {
        toast(err, 'is-danger');
      }
      await wappalyzer.destroy();
      stack.url = '';
    };
    
    const openWeb = (e) => {
      if (e.target.href.startsWith('http')) {
        e.preventDefault();
        shell.openExternal(e.target.href);
      }
    };

    const reset = () => (stack.apps = []);
    
    const regex = RegExp('(http|https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+@]*)*(\\?[;&a-z\\d%_.~+=-@]*)?(\\#[-a-z\\d_@]*)?$', 'i');

    const validateButton = computed(() => (stack.url.match(regex) ? false : true));

    return {
      // url,
      // apps,
      stack,
      singleStack,
      reset,
      validateButton,
      openWeb
    };
  }
});
