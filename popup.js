let qrGenForm = document.getElementById('qrGenForm');
let qrInputText = document.getElementById('input-text');
let qrCode;

function generateQrCode(contentForQr){
    return new QRCode('div-qr-img', {
        text: contentForQr,
        width: 120,
        height: 120,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });
}

qrGenForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let contentForQr = qrInputText.value;
    /*
    if (qrCode == null) {
        document.getElementById("div-qr-img").removeChild(
            document.getElementById("qr-default-img")
        );
        qrCode = generateQrCode(contentForQr);
    } else {
        qrCode.makeCode(contentForQr);
    }
    */
    if (contentForQr.length > 0) {
        let newDivQrImg = document.getElementById("div-qr-img-new");
        console.log(newDivQrImg);
        newDivQrImg.removeChild(document.getElementById('qr-default-img-new'));
        let newQrImg = document.createElement('img');
        newQrImg.id = "qr-default-img-new";
        newQrImg.width = 120;
        newQrImg.height = 120;
        newQrImg.style.display = "block";
        newQrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=' + contentForQr;
        newDivQrImg.appendChild(newQrImg);
    }
});

const endpoint = 'https://clck.ru/--';
let urlForm = document.getElementById("form-url");
let shortUrlText = document.getElementById("short-url");
let divShortUrl = document.getElementById('div-short-url');

console.log(shortUrlText);
urlForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(urlForm.value);
    let urlInput = document.getElementById("input-url").value;

    if (urlInput) {
        let params = new URLSearchParams({ url: urlInput });
        console.log(params.toString());

        fetch(`${endpoint}?${params}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(newUrl => {
                shortUrlText.textContent = newUrl;
                divShortUrl.classList.remove('dp-n');
                divShortUrl.classList.add('dp-bl');
            })
            .catch(error => {
                console.error('Error:', error);
            }
        );
    }
});

document.getElementById('div-short-url').addEventListener('click', (event) => {
    navigator.clipboard.writeText(shortUrlText.textContent);
});