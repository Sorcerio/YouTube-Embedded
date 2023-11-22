// YouTube Embedded: Player Page Operation

// Global Variables
var PLAYLIST = null;
var PLAYLIST_INDEX = null;

// On Window Load
window.onload = function() {
    // Set Form Submit Events
    onYoutubeFormSubmit();

    // Fetch an GET parameters
    let urlParams = new URLSearchParams(window.location.search);

    // Check if content has already been selected
    onLoadCheckForSingleVideo(urlParams);
    onLoadCheckForPlaylist(urlParams);
};

// Events
function onYoutubeFormSubmit() {
    let form = document.getElementById('youtubeForm');
    form.onsubmit = function(e) {
        // Disabled default form submission
        e.preventDefault();

        // Get the codeInput element
        let codeInput = document.getElementById('codeInput');

        // Process the URL
        let processedValue = processYoutubeUrl(codeInput.value);

        // Submit the form with the processed value or fail
        codeInput.value = processedValue;
        form.submit();
    };
}

function onLoadCheckForSingleVideo(urlParams) {
    // Try to get the video id
    let code = urlParams.get('code');

    // Use the video id if present
    if (code !== null) {
        showYoutubeVideo(code);
    }
}

function onLoadCheckForPlaylist(urlParams) {
    // Try to get the playlist params
    let playlist = urlParams.get('playlist');
    let playlistIndex = urlParams.get('index');

    // Check if the playlist params are present
    if (playlist !== null && playlistIndex !== null) {
        // Parse the playlist index
        PLAYLIST_INDEX = parseInt(playlistIndex);

        // Parse the JSON
        PLAYLIST = JSON.parse(playlist);

        // Update the playlist controls
        updatePlaylistControls();

        // Play video if possible
        playCurrentPlaylistVideo();
    }
}

// Example Buttons
function submitExampleButton(url) {
    let codeInput = document.getElementById('codeInput');
    codeInput.value = processYoutubeUrl(url);

    let form = document.getElementById('youtubeForm');
    form.submit();
}

// URL Processing
function processYoutubeUrl(url) { // Returns a YouTube Video Id
    // Report
    console.log('Processing url: ' + url);

    let videoId;
    if (url.includes('watch?v=')) {
        // Standard URL
        videoId = processFullUrl(url);
    } else if (url.includes('youtu.be/')) {
        // Short URL
        videoId = processShortUrl(url);
    } else {
        // YouTube Video Id or Invalid URL
        videoId = url;
    }

    // Report
    console.log('Collected Video Id: ' + videoId);

    return videoId;
}

function processFullUrl(input) {
    let videoId = input.split('v=')[1].split('&')[0];
    return videoId;
}

function processShortUrl(input) {
    let videoId = input.split('youtu.be/')[1].split('?')[0];
    return videoId;
}

// YouTube Player
function showYoutubeVideo(code) {
    // Update the video embed URL
    // Example URL: https://www.youtube.com/embed/R-IhY4FkNLA?si=10TTHtRycXFBfXul
    let youtubePlayer = document.getElementById('youtubePlayer');
    youtubePlayer.src = 'https://www.youtube.com/embed/' + code + '?autoplay=1';

    // Show the player
    let playerContainer = document.getElementById('playerContainer');
    playerContainer.style.display = 'block';

    // Hide the instructions
    let youtubePlayerInfo = document.getElementById('youtubePlayerInfo');
    youtubePlayerInfo.style.display = 'none';

    // Scroll to the player
    youtubePlayer.scrollIntoView();
}

// Playlist Controls
function updatePlaylistControls() {
    // Check that a playlist was loaded
    if (PLAYLIST === null || PLAYLIST_INDEX === null) {
        console.log("Can't Update Playlist Controls: No playlist loaded")
        return;
    }

    // Update the playlist form
    let playlistInput = document.getElementById('playlistInput');
    playlistInput.innerText = JSON.stringify(PLAYLIST);

    let playlistIndex = document.getElementById('playlistIndex');
    playlistIndex.value = PLAYLIST_INDEX;

    // Update the playlist controls
    let playlistControls = document.getElementById('playlistControls');
    playlistControls.style.display = 'block';

    let playlistIndexCur = document.getElementById('playlistCur');
    playlistIndexCur.innerText = PLAYLIST_INDEX + 1;

    let playlistIndexMax = document.getElementById('playlistMax');
    playlistIndexMax.innerText = PLAYLIST.length;
}

function playCurrentPlaylistVideo() {
    // Check that a playlist was loaded
    if (PLAYLIST === null || PLAYLIST_INDEX === null) {
        console.log("Can't Play Playlist: No playlist loaded")
        return;
    }

    // Get the video id
    let code = processYoutubeUrl(PLAYLIST[PLAYLIST_INDEX]);

    // Use the video id if present
    if (code !== null) {
        // Show the current video
        // showYoutubeVideo(code); # TODO: renable!
        console.log('PLAYING: ' + code);
    }
}

function nextVideo() {
    // Check that a playlist was loaded
    if (PLAYLIST === null || PLAYLIST_INDEX === null) {
        console.log("Can't Play Next Video: No playlist loaded")
        return;
    }

    // Check if index is within range
    if (PLAYLIST_INDEX >= 0 && PLAYLIST_INDEX < (PLAYLIST.length - 1)) {
        // Iterate the playlist index
        PLAYLIST_INDEX += 1;

        // Update the playlist controls
        updatePlaylistControls();

        // Submit the playlist form
        let playlistForm = document.getElementById('playlistForm');
        playlistForm.submit();
    }
}

function prevVideo() {
    // Check that a playlist was loaded
    if (PLAYLIST === null || PLAYLIST_INDEX === null) {
        console.log("Can't Play Previous Video: No playlist loaded")
        return;
    }

    // Check if index is within range
    if (PLAYLIST_INDEX >= 1) {
        // Iterate the playlist index
        PLAYLIST_INDEX -= 1;

        // Update the playlist controls
        updatePlaylistControls();

        // Submit the playlist form
        let playlistForm = document.getElementById('playlistForm');
        playlistForm.submit();
    }
}
