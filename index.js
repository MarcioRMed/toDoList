// importando modulos- como se fosse
const express = require("express");
const path = require("path");
const routes = require("./routes/routes")


const app = express();
const port = 3000;

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public"))); //configuração funcionar o css, javascript
app.use(routes) // usando a rotas



app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);

// alt + swif + f -> adiciona automaticamente a pontuação e organiza o códido - funcão do Pretty extensão
// importante o ; no node - evita erros
