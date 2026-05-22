# PixGerador

Gerador simples de QR Code Pix feito com HTML, CSS e JavaScript puro. O projeto cria um payload Pix copia e cola, calcula o CRC16 CCITT exigido pelo padrao Pix e renderiza o QR Code no navegador.

## Funcionalidades

- Geracao de QR Code Pix a partir de um valor informado pelo usuario.
- Exibicao do codigo Pix copia e cola.
- Botao para copiar o codigo Pix para a area de transferencia.
- Calculo do CRC16 CCITT diretamente no JavaScript.
- Interface web simples para uso local ou hospedagem estatica.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Biblioteca `qrcode`, carregada via CDN:
  `https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js`

## Estrutura do projeto

```text
PixGerador/
|-- index.html
|-- script.js
|-- style.css
`-- README.md
```

## Como usar

1. Clone o repositorio:

```bash
git clone https://github.com/system-auto-jk/PixGerador.git
```

2. Acesse a pasta do projeto:

```bash
cd PixGerador
```

3. Abra o arquivo `index.html` no navegador.

Tambem e possivel publicar o projeto em qualquer hospedagem estatica, como GitHub Pages, Netlify ou Vercel.

## Configuracao do Pix

Antes de usar o projeto para cobrancas reais, configure os dados do recebedor no arquivo `script.js`.

Localize este trecho:

```javascript
const payload = gerarPayloadPix({
  chave: '',
  nome: '',
  cidade: '',
  valor: valor
});
```

Preencha com os dados da sua conta Pix:

```javascript
const payload = gerarPayloadPix({
  chave: 'sua-chave-pix',
  nome: 'NOME DO RECEBEDOR',
  cidade: 'CIDADE',
  valor: valor
});
```

Exemplo:

```javascript
const payload = gerarPayloadPix({
  chave: 'email@exemplo.com',
  nome: 'JOAO DA SILVA',
  cidade: 'SAO PAULO',
  valor: valor
});
```

## Observacoes importantes

- O projeto roda totalmente no navegador.
- Nenhum dado e enviado para servidor.
- A chave Pix, o nome e a cidade ficam visiveis no codigo-fonte quando o projeto e publicado.
- Para uso em producao, valide o QR Code gerado no aplicativo do banco antes de divulgar.
- O payload atual usa identificador de transacao fixo `***`.

## Como funciona

O arquivo `script.js` monta o payload Pix seguindo a estrutura EMV usada pelo Banco Central. Depois disso, calcula o CRC16 CCITT e envia o payload para a biblioteca `qrcode`, que desenha o QR Code em um elemento `canvas`.

Fluxo principal:

1. O usuario informa o valor.
2. O JavaScript monta o payload Pix.
3. O CRC16 e calculado e anexado ao payload.
4. O QR Code e renderizado na tela.
5. O codigo Pix copia e cola fica disponivel para copiar.

## Melhorias futuras

- Campos na interface para informar chave Pix, nome e cidade sem editar o codigo.
- Validacao mais completa dos dados do recebedor.
- Opcao para baixar o QR Code como imagem.
- Campo para descricao ou identificador personalizado da transacao.
- Ajustes visuais para dispositivos moveis.

## Licenca

Este projeto ainda nao possui uma licenca definida. Para permitir uso, copia e modificacao por outras pessoas, adicione um arquivo `LICENSE` ao repositorio.
