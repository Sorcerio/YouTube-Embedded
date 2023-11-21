// YouTube Embedded: Player Page Operation

// On Window Load
window.onload = function() {
    // Set Form Submit Event
    onYoutubeFormSubmit();

    // Update the video embed URL
    var urlParams = new URLSearchParams(window.location.search);
    var code = urlParams.get('code');

    if (code !== null) {
        showYoutubeVideo(code);
    }
};

// Events
function onYoutubeFormSubmit() {
    var form = document.getElementById('youtubeForm');
    form.onsubmit = function(e) {
        // Disabled default form submission
        e.preventDefault();

        // Get the codeInput element
        var codeInput = document.getElementById('codeInput');

        // Process the URL
        var processedValue = processYoutubeUrl(codeInput.value);

        // Submit the form with the processed value or fail
        codeInput.value = processedValue;
        form.submit();
    };
}

// Example Buttons
function submitExampleButton(url) {
    var codeInput = document.getElementById('codeInput');
    codeInput.value = processYoutubeUrl(url);

    var form = document.getElementById('youtubeForm');
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
    var videoId = input.split('v=')[1].split('&')[0];
    return videoId;
}

function processShortUrl(input) {
    var videoId = input.split('youtu.be/')[1].split('?')[0];
    return videoId;
}

// YouTube Player
function showYoutubeVideo(code) {
    // Update the video embed URL
    // Example URL: https://www.youtube.com/embed/R-IhY4FkNLA?si=10TTHtRycXFBfXul
    var youtubePlayer = document.getElementById('youtubePlayer');
    youtubePlayer.src = 'https://www.youtube.com/embed/' + code + '?autoplay=1';
    youtubePlayer.style.display = 'block';

    // Hide the instructions
    var youtubePlayerInfo = document.getElementById('youtubePlayerInfo');
    youtubePlayerInfo.style.display = 'none';
}
