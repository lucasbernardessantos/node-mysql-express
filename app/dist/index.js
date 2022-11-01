"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PessoaDAO_js_1 = require("./dao/PessoaDAO.js");
const Pessoa_js_1 = require("./model/Pessoa.js");
const app = (0, express_1.default)();
const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(200).send('Conexão aberta.');
});
app.post('/cadastrarPessoa', (req, res) => {
    let data = req.body;
    let nascimento = formatarData(data.nascimento.toString());
    let pessoa = new Pessoa_js_1.Pessoa(data.nome, nascimento, data.cpf, data.saldo);
    PessoaDAO_js_1.PessoaDAO.cadastrarPessoa(pessoa);
    res.status(200).send(`Dados Chegaram.`);
});
function formatarData(data) {
    let vetorData = data.split('-', 3);
    let dataString = `${vetorData[1]}-${vetorData[0]}-${vetorData[2]}`;
    let dataFormatada = new Date(dataString);
    return dataFormatada;
}
