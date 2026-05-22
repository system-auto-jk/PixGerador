document.getElementById('pixForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const valor = parseFloat(document.getElementById('valor').value).toFixed(2);
  
    const payload = gerarPayloadPix({
      chave: '',
      nome: '',
      cidade: '',
      valor: valor
    });
  
    const qrcodeContainer = document.getElementById('qrcode');
    qrcodeContainer.innerHTML = '';
    QRCode.toCanvas(document.createElement('canvas'), payload, { width: 256 }, function (err, canvas) {
      if (err) {
        console.error(err);
        alert('Erro ao gerar o QR Code.');
      } else {
        qrcodeContainer.appendChild(canvas);
      }
    });

    // Exibir o código Pix e o container
    const pixCodeContainer = document.getElementById('pixCodeContainer');
    const pixCodeElement = document.getElementById('pixCode');
    pixCodeElement.textContent = payload;
    pixCodeContainer.style.display = 'block';
});
  
document.getElementById('copyButton').addEventListener('click', function () {
    const pixCode = document.getElementById('pixCode').textContent;
    navigator.clipboard.writeText(pixCode).then(() => {
      alert('Código Pix copiado para a área de transferência!');
    }).catch(err => {
      console.error('Erro ao copiar o código:', err);
      alert('Erro ao copiar o código.');
    });
});

function gerarPayloadPix({ chave, nome, cidade, valor }) {
    function format(id, value) {
      const size = value.length;
      return id + String(size).padStart(2, '0') + value;
    }
  
    const payloadFormatIndicator = '000201';
    const merchantAccountInfo = format('26', format('00', 'BR.GOV.BCB.PIX') + format('01', chave));
    const merchantCategoryCode = '52040000';
    const transactionCurrency = '5303986';
    const transactionAmount = valor ? format('54', valor) : '';
    const countryCode = '5802BR';
    const merchantName = format('59', nome);
    const merchantCity = format('60', cidade);
    const additionalDataField = format('62', format('05', '***'));
  
    const payloadSemCRC = payloadFormatIndicator +
      merchantAccountInfo +
      merchantCategoryCode +
      transactionCurrency +
      transactionAmount +
      countryCode +
      merchantName +
      merchantCity +
      additionalDataField +
      '6304';
  
    const crc16 = crc16ccitt(payloadSemCRC);
    return payloadSemCRC + crc16;
}
  
// Calcula CRC16 CCITT
function crc16ccitt(str) {
    let crc = 0xFFFF;
    for (let c of str) {
      crc ^= c.charCodeAt(0) << 8;
      for (let i = 0; i < 8; i++) {
        if (crc & 0x8000) crc = (crc << 1) ^ 0x1021;
        else crc <<= 1;
      }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}