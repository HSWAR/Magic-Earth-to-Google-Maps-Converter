// Function to fetch the text from the input field and convert it to a Google Maps link
function fetchText() {
    const input = document.getElementById('inputId');
    const magicEarthInput = input.value;
    const output = document.getElementById('output');

    if (magicEarthInput === "") {
        alert("Please paste either the Magic Earth shared link, entire text or the coordinates!");
        return;
    }

    const urlRegex = /https?:\/\/[^\s]+/;
    const coordinatesRegex = /^(-?\d+(\.\d+)?)\s*[, ]\s*(-?\d+(\.\d+)?)$/;
    const latLonRegex = /(?:Latitude:?\s*(-?\d+\.\d+)|lat=(-?\d+\.\d+)).*?(?:Longitude:?\s*(-?\d+\.\d+)|lon=(-?\d+\.\d+))/i;
    
    let lat, lon;

    if (urlRegex.test(magicEarthInput)) {
        const urlMatch = magicEarthInput.match(urlRegex);
        const url = urlMatch[0];
        const urlParams = new URL(url);

        lat = urlParams.searchParams.get('lat');
        lon = urlParams.searchParams.get('lon');
    } else if (coordinatesRegex.test(magicEarthInput)) {
        const coordsMatch = magicEarthInput.match(coordinatesRegex);
        lat = coordsMatch[1];
        lon = coordsMatch[3];
    } else if(latLonRegex.test(magicEarthInput)) {
        const latLonmatch = magicEarthInput.match(latLonRegex);
        lat = latLonmatch[1] || latLonmatch[2];
        lon = latLonmatch[3] || latLonmatch[4];
    }

    if (lat && lon) {
        const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
        output.value = googleMapsLink;
        output.nextElementSibling.innerHTML = `<button class="copy-button" onclick="copyLink('${googleMapsLink}')">Copy link</button>`;
    } else {
        output.value = "No latitude and longitude found in the text.";
        output.nextElementSibling.innerHTML = '';
    }
}

function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        alert("Link copied to clipboard!");
    });
}
