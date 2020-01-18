# POC SEMGE
Projeto híbrido Ionic v4 para Android e iOS

## Ambiente:
- Node v10.14.0
- NPM 6.4.1
- Ionic CLI v5.4.13
- Cordova CLI 8.1.2

## Build:
1. Instalar depêndencias:
$ npm install

1. Executar build Ionic e nativa:
$ ionic cordova build <PLATAFORMA>
ou o comando abaixo para otimizar o código híbrido:
$ ionic cordova build <PLATAFORMA> --prod

- Gerar APK de teste/debug:
    - $ ionic cordova build android
- Gerar Projeto nativo iOS (apenas no MacOS):
    - $ ionic cordova build ios
    - No iOS, deve abrir o projeto nativo pelo XCode e configurar conta e certificado para geração de IPA



