"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaDAO = void 0;
const Pessoa_js_1 = require("../model/Pessoa.js");
const db_js_1 = require("./db.js");
class PessoaDAO {
    static cadastrarPessoa(pessoa) {
        let conn = db_js_1.Connection.criarConexao();
        try {
            conn.connect();
            let sql = `insert into pessoa values ("${pessoa.Nome}", "${pessoa.nascimentoString()}", "${pessoa.CPF}", ${pessoa.Saldo});`;
            conn.query(sql, (err) => {
                if (err) {
                    console.error(`${err.message}\n${err.sqlState}`);
                }
            });
        }
        finally {
            conn.end();
        }
    }
    selecionarTodasPessoas() {
        let conn = db_js_1.Connection.criarConexao();
        let pessoasArray = [];
        conn.connect(err => {
            if (err) {
                console.error(`Error connecting: ${err.stack}`);
                return;
            }
            console.log(`Connected as id: ${conn.threadId}`);
        });
        let sql = `select * from usuarios.pessoa;`;
        conn.query(sql, function (err, result) {
            if (err)
                throw err;
            result.forEach(InPessoa => {
                let pessoa = new Pessoa_js_1.Pessoa(InPessoa.nome, new Date(InPessoa.nascimento), InPessoa.cpf, InPessoa.saldoBancario);
                pessoasArray.push(pessoa);
            });
        });
    }
}
exports.PessoaDAO = PessoaDAO;
