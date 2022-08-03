// modules
const { ref, defineComponent, onMounted } = require('vue');
const {
  cpu,
  mem,
  diskLayout,
  graphics,
  osInfo
} = require("systeminformation");

// @vue/component
module.exports = defineComponent({
  name: 'HardwareInformation',
  // template
  template: `
    <main class="mt-3 mx-3">
      <section class="tabs">
        <ul>
          <li :class="[ activeTabs === 1 ? 'is-active' : '']">
            <a @click="activeTabs = 1">Main info</a>
          </li>
          <li :class="[ activeTabs === 2 ? 'is-active' : '']">
            <a @click="activeTabs = 2">Disk info</a>
          </li>
          <li :class="[ activeTabs === 3 ? 'is-active' : '']">
            <a @click="activeTabs = 3">Graphics info</a>
          </li>
          </ul>
      </section>
      <section class="tile is-ancestor" v-if="activeTabs === 1">
        <div class="message tile is-ancestor is-4 is-child box is-vertical">
          <article class="message-header is-white">
            <h1 class="title has-text-white">CPU Info</h1>
          </article>
          <article class="message-body">
            <ul>
              <li>manufacturer: {{cpuInfo.manufacturer}}</li>
              <li>brand: {{cpuInfo.brand}}</li>
              <li>speedMin: {{cpuInfo.speed}} GHz</li>
              <li>cores: {{cpuInfo.cores}}</li>
              <li>physicalCores: {{cpuInfo.physicalCores}}</li>
              <li>processors: {{cpuInfo.processors}}</li>
              <li>vendor: {{cpuInfo.vendor}}</li>
              <li>family: {{cpuInfo.family}}</li>
              <li>model: {{cpuInfo.model}}</li>
            </ul>
          </article>
        </div>
        <div class="message tile is-ancestor is-4 is-child box is-vertical">
          <article class="message-header is-white">
            <h1 class="title has-text-white">RAM Info</h1>
          </article>
          <article class="message-body">
            <ul>
              <li>total: {{(ramInfo.total / 1073741824).toFixed(2)}} GB</li>
              <li>free: {{(ramInfo.free / 1073741824).toFixed(2)}} GB</li>
              <li>used: {{(ramInfo.used / 1073741824).toFixed(2)}} GB</li>
              <li>active: {{(ramInfo.active / 1073741824).toFixed(2)}} GB</li>
              <li>available: {{(ramInfo.available / 1073741824).toFixed(2)}} GB</li>
            </ul>
          </article>
        </div>
        <div class="message tile is-ancestor is-4 is-child box is-vertical">
          <article class="message-header is-white">
            <h1 class="title has-text-white">OS Info</h1>
          </article>
          <article class="message-body">
            <ul>
              <li>hostname: {{osDetail.hostname}}</li>
              <li>platform: {{osDetail.platform}}</li>
              <li>distro: {{osDetail.distro}}</li>
              <li>release: {{osDetail.release}}</li>
              <li>kernel: {{osDetail.kernel}}</li>
              <li>arch: {{osDetail.arch}}</li>
              <li>serial: {{osDetail.serial}}</li>
              <li>uefi: {{osDetail.uefi}}</li>
            </ul>
          </article>
        </div>
      </section>
      <section class="message" v-if="activeTabs === 2">
        <article class="message-header is-white">
          <h1 class="title has-text-white">disk Info</h1>
        </article>
        <article class="message-body tile is-ancestor">
          <ul class="tile is-4 is-vertical" v-for="(diskInfo, i) of disksInfo" :key="i">
            <strong>disk {{i+1}} info</strong>
            <li>type: {{diskInfo.type}}</li>
            <li>name: {{diskInfo.name !== '' ? diskInfo.name : 'no disk info'}}</li>
            <li>vendor: {{diskInfo.vendor !== '' ? diskInfo.vendor : 'no vendor info'}}</li>
            <li>size: {{(diskInfo.size / 1073741824).toFixed(2)}} GB</li>
            <li>interface type: {{diskInfo.interfaceType !== '' ? diskInfo.interfaceType : 'no interface info'}}</li>
          </ul>
        </article>
      </section>
      <section class="message" v-if="activeTabs === 3">
        <article class="message-header is-white">
          <h1 class="title has-text-white">graphics Info</h1>
        </article>
        <article class="message-body tile is-ancestor">
          <ul class="tile is-4 is-vertical" v-for="(controller, i) of graphicsInfo.controllers" :key="i">
            <strong>graphic controller {{i+1}} info</strong>
            <li>model: {{controller.model}}</li>
            <li>vendor: {{controller.vendor}}</li>
            <li>vram: {{controller.vram < 1024 ? controller.vram + ' MB' : (controller.vram / 1024).toFixed(2) + ' GB'}}</li>
          </ul>
          <ul class="tile is-4 is-vertical" v-for="(display, i) of graphicsInfo.displays" :key="i">
            <strong>display {{i+1}} info</strong>
            <li>model: {{display.model}}</li>
            <li>main: {{display.main}}</li>
            <li>connections: {{display.connection}}</li>
            <li>resolution: {{display.resolutionX}} X {{display.resolutionY}}</li>
          </ul>
        </article>
      </section>
  </main>
  `,
  setup() {
    // start states
    const cpuInfo = ref({});
    const ramInfo = ref({});
    const osDetail = ref({});
    const disksInfo = ref({});
    const graphicsInfo = ref({});
    const activeTabs = ref(1);
    
    onMounted(async () => {
      try { 
        cpuInfo.value = await cpu();
        ramInfo.value =await mem();
        disksInfo.value =await diskLayout();
        graphicsInfo.value =await graphics();
        osDetail.value = await osInfo();
      } catch(err) {
        alert(err);
      }
    });
    
    return {
      cpuInfo,
      ramInfo,
      osDetail,
      disksInfo,
      graphicsInfo,
      activeTabs
    };
  }
});

