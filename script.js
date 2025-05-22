// Function to fetch the text from the input field and convert it to a Google Maps link
function fetchText() {
    const input = document.getElementById('inputId');
    const magicEarthInput = input.value;
    const output = document.getElementById('output');
    
    if (magicEarthInput === "") {
        alert("Please paste the Magic Earth link or shared text to convert!");
        return;
    }

    const urlRegex = /https?:\/\/[^\s]+/;
    const urlMatch = magicEarthInput.match(urlRegex);
    
    if (urlMatch) {
        const url = urlMatch[0];
        const urlParams = new URL(url);
        
        const lat = urlParams.searchParams.get('lat');
        const lon = urlParams.searchParams.get('lon');

        if (lat && lon) {
            const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
            output.innerHTML = `<a href="${googleMapsLink}" target="_blank">${googleMapsLink}</a>
            <button class="copy-button" onclick="copyLink('${googleMapsLink}')">Copy link</button>`;
        } else {
            output.innerText = "No latitude and longitude found in the text.";
        }
    }
}

function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        alert("Link copied to clipboard!");
    });
}
