const Genius = require("genius-lyrics");
const Client = new Genius.Client();

(async () => {
	const searches = await Client.songs.search("faded");

	// Pick first one
	const firstSong = searches[0];
	console.log("About the Song:\n", firstSong, "\n");

	// Ok lets get the lyrics
	const lyrics = await firstSong.lyrics();
	console.log("Lyrics of the Song:\n", lyrics, "\n");
})()
