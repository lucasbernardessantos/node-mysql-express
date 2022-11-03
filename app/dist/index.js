"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_js_1 = require("./dao/db.js");
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
app.get('/selecionarPessoas', (req, res) => {
    let conn = db_js_1.Connection.criarConexao();
    let pessoasArray = [];
    let sql = `select * from usuarios.pessoa;`;
    conn.connect(err => {
        if (err) {
            console.error(`Error connecting: ${err.stack}`);
            return;
        }
        console.log(`Connected as id: ${conn.threadId}`);
    });
    conn.query(sql, function (err, result) {
        if (err)
            throw err;
        result.forEach(InPessoa => {
            let pessoa = new Pessoa_js_1.Pessoa(InPessoa.nome, new Date(InPessoa.nascimento), InPessoa.cpf, InPessoa.saldoBancario);
            pessoasArray.push(pessoa);
        });
        res.status(200).send(JSON.stringify(pessoasArray));
    });
    conn.end();
});
app.post('/cadastrarPessoa', (req, res) => {
    let data = req.body;
    let pessoa = new Pessoa_js_1.Pessoa(data.nome, new Date(data.nascimento), data.cpf, data.saldoBancario);
    let conn = db_js_1.Connection.criarConexao();
    let sql = `insert into pessoa values ("${pessoa.Nome}", "${pessoa.nascimentoString()}", "${pessoa.CPF}", ${pessoa.Saldo});`;
    conn.connect(err => {
        if (err) {
            console.error(`Error connecting: ${err.stack}`);
            return;
        }
        console.log(`Connected as id: ${conn.threadId}`);
    });
    conn.query(sql, (err, result) => {
        if (err)
            throw err;
        res.status(200).send(`Pessoa cadastrada: ${result.affectedRows} linha afetada.`);
    });
});
