// YouTube Embedded: Player Page Operation

// On Window Load
window.onload = function() {
    // Set Form Submit Events
    onYoutubeFormSubmit();

    // Update the video embed URL
    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    if (code !== null) {
        showYoutubeVideo(code);
    }
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

function onPlaylistFormSubmit() {
    // TODO: this
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
    let videoId;
    if(url.includes('watch?v=')) {
        // Standard URL
        videoId = processFullUrl(url);
    } else if(url.includes('youtu.be/')) {
        // Short URL
        videoId = processShortUrl(url);
    } else {
        // YouTube Video Id or Invalid URL
        videoId = url;
    }

    console.log('Playing Video Id: ' + videoId);

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
}
