// modules
const { ipcRenderer } = require('electron');
const FastSpeedtest = require('fast-speedtest-api');
const axios = require('axios');
const alertMsg = require('../components/ui/alert');

// DOM elements
const city = document.querySelector('#location');
const networkSpeed = document.querySelector('#network-speed');
const card = document.querySelector('#card');
const loading = document.querySelector('#loading');
const isp = document.querySelector('#isp');
const ip = document.querySelector('#ip');

// speedtest function
const speedtest = async () => {
	card.style.display = 'none';
	
	const token = 'YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm';
	
	try {
		const { data } = await axios.get(
      'https://api.fast.com/netflix/speedtest/v2', {
        params: { https: true, token }
      })
			
			const speedtest = new FastSpeedtest({
				token, timeout: 10000,
				unit: FastSpeedtest.UNITS.Mbps
			});
			
			const speed = await speedtest.getSpeed();
			
			city.textContent = `
			${data.client.location.city} (${data.client.location.country})
			`;
			
			networkSpeed.textContent = `${speed.toFixed(2)} Mbps`;
			isp.textContent = `ISP: ${data.client.isp}`;
			ip.textContent = `IP: ${data.client.ip}`;
			
			card.style = '';
			loading.style.display = 'none';
	} catch(err) {
		alertMsg(err.message, 'alert-danger');
	}
};

speedtest()

ipcRenderer.on('clear-results', () => {
  loading.style = '';
  speedtest()
});
