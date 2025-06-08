function openPage('phantom-games.netlify.app') {
    let newTab = window.open('about:blank'); // Open an empty tab first
    newTab.location.href = 'phantom-games.netlify.app'; // Then redirect it to the desired page
}
