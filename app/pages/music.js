// modules
const { ref, defineComponent, computed } = require('vue');
const lyricsFinder = require('lyrics-finder');

// @vue/component
module.exports = defineComponent({
  name: 'Music',
  template: `
    <main class="mt-3 mx-3">
      <form @submit.prevent="queryLyrics">
        <div class="field">
          <input class="input " type="text" placeholder="artist" v-model="artist" @keypress.enter.prevent required>
        </div>
        <div class="field">
          <input class="input" type="text" placeholder="song" v-model="song" @keypress.enter.prevent required>
        </div>
        <button class="mt-2 button is-info is-outlined is-fullwidth is-small" type="submit">
          start query lyric
        </button>
      </form>
      <button class="my-2 button is-danger is-outlined is-fullwidth is-small" @click="reset">
        Reset query
      </button>
      <section class="message">
        <article class="message-header  is-white">
          {{title === '' ? "no song" : title}}
        </article>
        <article class="message-body scroll lyric">
          <pre>{{lyrics}}</pre>
        </article>
      </section>
    </main>
  `,
  setup() {
    const artist = ref("");
    const song = ref("");
    const lyrics = ref("");
    const title = ref("");

    const queryLyrics = async () => {
      try {
        const res = await lyricsFinder(artist.value, song.value);

        title.value = `${artist.value} - ${song.value}`;
        lyrics.value = res;
      } catch (err) {
        alert(err);
      }
      artist.value = "";
      song.value = "";
    };

    function reset() {
      lyrics.value = "";
      title.value = "";
    }

    return {
      artist,
      song,
      lyrics,
      title,
      queryLyrics,
      reset
    };
  }
});
