chrome.commands.onCommand.addListener((command) => {
    if (command === 'open-popup') {
        chrome.action.openPopup();
    }
});

var contextMenuOpen = {
    'id': 'OpenPopupAndGenQR',
    'title': 'Сгенерировать QR код',
    'contexts': ['page', 'selection']
}

chrome.contextMenus.create(contextMenuOpen);

chrome.contextMenus.onClicked.addListener((clickData) => {
    if (clickData.menuItemId === 'OpenPopupAndGenQR') {
        chrome.action.openPopup();
    }
})