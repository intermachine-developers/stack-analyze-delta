// modules
const { ref, defineComponent } = require('vue');

// @vue/component
module.exports = defineComponent({
  name: 'Password',
  template: `
        <main class="mt-3 mx-3">
          <p class="has-text-centered is-size-2">
            {{generatedPassword || 'no password'}}
          </p>
          <section class="my-3 columns is-variable">
            <article class="column">
              <button 
                class="button is-info is-outlined is-fullwidth is-small "
                @click="genPassword"
              >
                Generate
              </button>
            </article>
            <article class="column">
              <button 
                class="button is-success is-outlined is-fullwidth is-small"
                @click="copyPassword"
              >
                Copy
              </button>
            </article>
            <article class="column">
              <button 
                class="button is-danger is-outlined is-fullwidth is-small"
                @click="resetPassword"
              >
                Reset
              </button>
            </article>
          </section>
        </main>
    `,
  setup() {
    const generatedPassword = ref('');

    const genPassword = () => {
      const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const length = 12;
      
      let retVal = "";
      
      for (let i = 0, n = chars.length; i < length; ++i) {
        retVal += chars.charAt(Math.floor(Math.random() * n));
      }
      
      generatedPassword.value = retVal;
    };
    
    const copyPassword = async () => {
      if (generatedPassword.value === '') {
        alert('password is empty please generate password?');
      } else {
        await navigator.clipboard.writeText(generatedPassword.value)
        alert('Copied');
      }
    };
    
    const resetPassword = () => (generatedPassword.value = '');

    return {
      generatedPassword,
      genPassword,
      copyPassword,
      resetPassword
    };
  }
});
