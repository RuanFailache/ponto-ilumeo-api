# Ponto Ilumeo API

Para executar o projeto é necessário instalar as dependências com o comando

```
npm install
```

Após isso copiar o arquivo `.env.example` para o arquivo `.env` e preencher com as informações. Infelizmente, não consegui terminar de implementar o docker, então será necessário rodar os seguintes comandos:

```
npm run database:migration:run
npm run database:migration:generate
npm run database:seed
```

Para executar o projeto basta utilizar o script `npm start`
