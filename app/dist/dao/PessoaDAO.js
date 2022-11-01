"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaDAO = void 0;
const db_js_1 = require("./db.js");
class PessoaDAO {
    static cadastrarPessoa(pessoa) {
        let conn = db_js_1.Connection.criarConexao();
        try {
            conn.connect();
            let query = `insert into pessoa values ("${pessoa.Nome}", "${pessoa.nascimentoString()}", "${pessoa.CPF}", ${pessoa.Saldo});`;
            conn.query(query);
            return true;
        }
        catch (e) {
            console.error(`Error ${e} no cadastro de uma nova pessoa.`);
            return false;
        }
        finally {
            conn.end();
        }
    }
}
exports.PessoaDAO = PessoaDAO;
