"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// importando o router
const router_1 = __importDefault(require("./routes/router"));
// definindo a view engine padrão como ejs
app.set('view engine', 'ejs');
// definindo o local da pasta onde ficarão os arquivos .ejs
app.set('views', 'src/views');
// usando o router para gerenciar as rotas
app.use(router_1.default);
// iniciando o servidor na porta 8080
const port = 8080;
app.listen(port, () => console.log(`Servidor iniciado!
http://localhost:${port}`));
