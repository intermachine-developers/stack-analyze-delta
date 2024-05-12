const { ref, defineComponent } = require('vue');

const menuTools = [
  {
    title: 'generation tools',
    tools: [
    	{
        path: '/',
        name: 'tech stack'
      },
      {
        path: '/info',
        name: 'hardware information'
      },
      {
        path: '/password',
        name: 'password generator'
      },
    ],
  },
  {
    title: 'delta tools',
    tools: [
    	{
        path: '/music',
        name: 'lyric finder'
      },
      {
        path: '/js-libraries',
        name: 'javascript libraries'
      },
      {
        path: '/digimon',
        name: 'digimon cards'
      }
    ],
  },
];

module.exports = defineComponent({
	name: 'DeltaNavbar',
	setup() {
		/** @type import('vue').Ref<HTMLDetailsElement[]>  */
		const dropdowns = ref([]);
		
		const closeMenu = () => {
			dropdowns.value.forEach(item => {
				item.open = false
			})
		};
		
		return { menuTools, dropdowns, closeMenu };
	},
	template: `
		<nav class="navbar is-dark">
			<header class="navbar-brand">
				<img
					class="navbar-item"
					src="logo.png"
					alt="stack-analyze delta logo"
				/>
			</header>
			
			<div class="navbar-menu">
				<menu class="navbar-end mr-4">
					<li 
						v-for="menu of menuTools"
						class="navbar-item has-dropdown is-active"
					>
						<details name="toolMenu" ref="dropdowns">
							<summary class="navbar-link">{{ menu.title }}</summary>
							
							<ul class="navbar-dropdown">
								<li 
									class="navbar-item" 
									v-for="tool of menu.tools" 
									@click="closeMenu"
								>
									<router-link class="link" :to="tool.path">
										{{ tool.name }}
									</router-link>
								</li>
							</ul>
						</details>
					</li>
				</menu>
			</div>
		</nav>
	`,
});
