function openPage('phantom-games.netlify.app/index.html') {
    let newTab = window.open('about:blank'); // Open an empty tab first
    newTab.location.href = 'phantom-games.netlify.app/index.html'; // Then redirect it to the desired page
}
