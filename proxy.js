function openProxyPage(url) {
    let newWin = window.open('about:blank', '_blank');
    if (newWin) {
        newWin.document.write(`<iframe src="${url}" style="width:100%; height:100%; border:none;"></iframe>`);
        newWin.document.close();
    } else {
        alert("Popup blocker prevented the new tab from opening.");
    }
}
