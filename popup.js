let qrGenForm = document.getElementById('qrGenForm');
let qrInputText = document.getElementById('input-text');
document.getElementById('input-text').focus();

qrGenForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let contentForQr = qrInputText.value;
    if (contentForQr.length > 0) {
        let newDivQrImg = document.getElementById("div-qr-img-new");
        newDivQrImg.removeChild(document.getElementById('qr-default-img-new'));
        let newQrImg = document.createElement('img');
        newQrImg.id = "qr-default-img-new";
        newQrImg.width = 170;
        newQrImg.height = 170;
        newQrImg.style.display = "block";
        newQrImg.classList.add('img-qr');
        newQrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=' + contentForQr;
        console.log(contentForQr);
        newDivQrImg.appendChild(newQrImg);
    }
});

const endpoint = 'https://clck.ru/--';
let urlForm = document.getElementById("form-url");
let shortUrlText = document.getElementById("short-url");
let divShortUrl = document.getElementById('div-short-url');

urlForm.addEventListener('submit', (event) => {
    event.preventDefault();
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