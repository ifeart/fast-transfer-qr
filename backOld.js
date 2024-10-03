chrome.commands.onCommand.addListener((command) => {
    if (command === "generate_qr") {
      chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
      }, (selection) => {
        const selectedText = selection[0];
        console.log('Selected text:', selectedText); // Добавьте это для отладки
        if (selectedText) {
            chrome.storage.local.set({ qrText: selectedText }, () => {
                chrome.action.openPopup();  // Открываем всплывающее окно
            });
            } else {
            alert("Please select text to generate QR code.");
            }
        });
    }
});
  