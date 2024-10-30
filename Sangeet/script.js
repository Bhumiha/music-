const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [
	{
		album: "Stay",
		emblem: "Life is better with music",
		"bg-color": ["#0396FF", "#0D1827"],
		"accent-color": "#0396FF",
		url: "https://media.gq.com/photos/56bb8a91b89407780bd7d454/16:9/w_2560%2Cc_limit/bieber-16-9-longform.jpg",
		spotify:
			"https://open.spotify.com/embed/track/5HCyWlXZPP0y6Gqq8TgA20?utm_source=generator"
	},
	{
		album: "Peaches",
		emblem: "Life is better with music",
		"bg-color": ["#3df5a7", "#0D1827"],
		"accent-color": "#3df5a7",
		url:
			"https://www.hollywoodreporter.com/wp-content/uploads/2013/11/9713_01_0270.jpg?w=2000&h=1126&crop=1",
		spotify:
			"https://open.spotify.com/embed/track/4iJyoBOLtHqaGxP12qzhQI?utm_source=generator"
	},
	{
		album: "Love Yourself",
		emblem: "Life is better with music",
		"bg-color": ["#727272", "#0D1827"],
		"accent-color": "#727272",
		url: "https://media1.popsugar-assets.com/files/thumbor/m5hWnoLb2swg0qdQ9HwqhNmDR4s/616x88:2931x2403/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2020/02/24/871/n/1922398/a66872b45e542a05d1cd50.97536705_/i/Justin-Bieber.jpg",
		spotify:
			"https://open.spotify.com/embed/track/1f8zcJPvJKvxAOjEqM0pyc?utm_source=generator"
	},
	{
		album: "Baby",
		emblem: "Life is better with music",
		"bg-color": ["#f687ff", "#0D1827"],
		"accent-color": "#f687ff",
		url:
			"https://www.billboard.com/wp-content/uploads/media/justin-bieber-smiling-performing-2015-billboard-650.jpg",
		spotify:
			"https://open.spotify.com/embed/track/6epn3r7S14KUqlReYr77hA?utm_source=generator"
	},
	{
		album: "Pal",
		emblem: "KK's Soulful Voice",
		"bg-color": ["#8B9467", "#0D1827"],
		"accent-color": "#8B9467",
		url: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Pal_poster.jpg/220px-Pal_poster.jpg",
		spotify: "https://open.spotify.com/embed/track/3xW5LhF5hF5hF5hF5h?utm_source=generator"
	  },
	  {
		album: "Sajni Re",
		emblem: "Arijit's Melodious Voice",
		"bg-color": ["#FFC107", "#0D1827"],
		"accent-color": "#FFC107",
		url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Tere_Liye_poster.jpg/220px-Tere_Liye_poster.jpg",
		spotify: "https://open.spotify.com/embed/track/5zCnGtCl5Ac5zlFHXaZmhy?utm_source=generator"
	  },
	  
]

function updateContent() {
    const album = albums[currentAlbumIndex];  

    console.log('Updating content for album:', album);

    if (!album) {
        console.error('Album not found at index:', currentAlbumIndex);
        return;
    }

    console.log('Album URL:', album.url);
    console.log('Spotify Widget URL:', album.spotify);

    bodyContainer.style.background = `linear-gradient(${album["bg-color"][0]}, ${album["bg-color"][1]})`;
    heroDiv.style.backgroundImage = `url(${album.url})`;
    emblemDiv.textContent = album.emblem;
    albumTitleSpan.textContent = album.album;
    albumNum.textContent = `${currentAlbumIndex + 1} / ${albums.length}`;
    spotifyWidget.src = album.spotify;


    texts.forEach(text => {
        text.style.color = album["accent-color"];
    });
}

// Function to handle click scroll
function handleClickScroll(direction) {
    // Disable buttons and set hover styles
    scrollLeft.disabled = true;
    scrollRight.disabled = true;
    scrollLeft.classList.add("key-press-hover-left");
    scrollRight.classList.add("key-press-hover-right");

    // Update index based on direction
    currentAlbumIndex = (currentAlbumIndex + direction + albums.length) % albums.length;

    // Debug log
    console.log('New album index:', currentAlbumIndex);

    // Add transition class
    heroDiv.classList.add("album-transition");

    // Update content after transition
    setTimeout(() => {
        updateContent();
    }, 500); // Match this duration with your CSS animation duration
}

// Function to handle key scroll
function handleKeyScroll(event) {
    if (event.key === 'ArrowLeft') {
        handleClickScroll(-1);
    } else if (event.key === 'ArrowRight') {
        handleClickScroll(1);
    }
}

let currentAlbumIndex = 0;
// Event listeners for scroll buttons
scrollLeft.addEventListener('click', () => handleClickScroll(-1));
scrollRight.addEventListener('click', () => handleClickScroll(1));

// Event listener for animation end
heroDiv.addEventListener("animationend", () => {
    heroDiv.classList.remove("album-transition");
    document.addEventListener("keydown", handleKeyScroll);
    scrollLeft.disabled = false;
    scrollRight.disabled = false;
    scrollLeft.classList.remove("key-press-hover-left");
    scrollRight.classList.remove("key-press-hover-right");
});

// Initialize content
updateContent();
