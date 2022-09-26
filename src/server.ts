import express from 'express';
import { Request as Req, Response as Res } from 'express';

const app = express();

app.get('/', (req :Req, res :Res) => {
    res.send('Estou aqui!');
});

const port :number = 8080;
app.listen(port, () => console.log(`Servidor iniciado!
http://localhost:${port}`));