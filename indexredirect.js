function openPage('index.html') {
    let newTab = window.open('about:blank'); // Open an empty tab first
    newTab.location.href = 'index.html'; // Then redirect it to the desired page
}
