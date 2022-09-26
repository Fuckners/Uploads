import express from 'express';

const app = express();

// importando o router
import router from './routes/router';

// definindo a view engine padrão como ejs
app.set('view engine', 'ejs');

// definindo o local da pasta onde ficarão os arquivos .ejs
app.set('views', 'src/views');

// usando o router para gerenciar as rotas
app.use(router);

// iniciando o servidor na porta 8080
const port :number = 8080;
app.listen(port, () => console.log(`Servidor iniciado!
http://localhost:${port}`));