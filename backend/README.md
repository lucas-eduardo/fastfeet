<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio Final Backend
</h3>

<p align="center">
<a href="#ferramentas">Ferramentas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sobre-a-estrutura">Sobre a estrutura</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#execução-do-projeto">Execução do projeto</a>
</p>

### **Ferramentas**

Foi utilizado o [Express](https://expressjs.com/), e as seguintes ferramentas:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilizando o PostgreSQL);

## Sobre a estrutura

A arquitetura de pastas do projeto, foi feito com base nas aulas realizadas. Para desafio próprio, me propus fazer a utilização do typescript e configurar o mesmo no eslint, prettier e nodemon. Referente a pasta de rotas, fiz uma forma onde as rotas são chamadas de forma automática no app.ts, diminuindo assim, os imports no arquivo app, o mesmo serviu para a importação das models do postgres.

---

## Execução do projeto

Para rodar o projeto, é necessário que tenha o **postgres** instalado e criar uma database chamada **fastfeet** e o **redis**. Além dos bancos, é importante que tenha um e-mail para poder estar configurando na aplicação. Será necessário configurar o arquivo **.env** na raiz do projeto backend, o mesmo possuirá a seguinte estrutura:

```
# Url Base
BASE_URL_API = http://localhost:3333

# POSTGRESS
DB_HOST=localhost
DB_USER=postgres
DB_PASS=docker
DB_NAME=fastfeet

# Chave secreta JWT
SECRET_KEY = ******************************

# Mail
MAIL_HOST = smtp.mailtrap.io
MAIL_PORT = 2525
MAIL_USER = **************
MAIL_PASS = **************

# Redis
REDIS_HOST = 127.0.0.1
REDIS_PORT = 6379
```

Basta então passar as configurações de acessos e chave secreta do JWT.

### Executar o projeto em desenvolvimento

- <code>yarn install</code>
- <code>yarn sequelize db:migrate</code>
- <code>yarn sequelize db:seed:all</code>
- <code>yarn dev</code>

E em outro terminal, execute <code>yarn queue</code> para rodar o redis.

Com esses comandos, a API estará rodando na porta **3333**, então basta acessar http://localhost:3333.

### Gerando o build da aplicação

Para o projeto de produção, foi configurado o gulp para fazer o build do **typescript** para **javascript**, esse processo pode ser automatizado para enviar no servidor. Para a geração do build, basta rodar o seguinte comando:

- <code>yarn build</code>

O mesmo criará uma pasta na raiz chamada **dist** e na mesma se encontrará os arquivos **js**. Então para rodar essa pasta buildada, basta executar o comando:

- <code>yarn start</code>

Caso queira rodar direto no pm2, lembre-se de ter a instação do mesmo dentro do servidor e então basta executar o comando:

- <code>yarn start:server</code>

Com essa execução, ele já subirá a aplicação no pm2, com o nome e algumas configurações extras.

### Execução de testes de integração

Foi feito alguns testes de integração, o mesmo roda no banco sqlite. Para executar os testes disponiveis, basta criar um arquivo na raiz chamada **.env.test** e passar as seguintes configurações:

```
# Url Base
BASE_URL_API = http://localhost:3333

# SQLITE
DB_DIALECT=sqlite

# Chave secreta JWT
SECRET_KEY = ******************************

# Mail
MAIL_HOST = smtp.mailtrap.io
MAIL_PORT = 2525
MAIL_USER = **************
MAIL_PASS = **************
```

Com isso configurado, basta executar os comandos para criar o banco sqlite e já criar algumas inserções por default:

- <code>yarn sequelize db:migrate</code>
- <code>yarn sequelize db:seed:all</code>

Para executar o teste, basta rodar:

- <code>yarn test</code>

Os testes foram feitos utilizando o **JEST** e integrado com o **COVERAGE**. Atualmente a aplicação está com uma cobertura total de testes de **62.26%**.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=FastFeet&uri=https%3A%2F%2Fraw.githubusercontent.com%2Flucas-eduardo%2Ffastfeet%2Fmaster%2Fbackend%2F.github%2Finsomnia.json)
