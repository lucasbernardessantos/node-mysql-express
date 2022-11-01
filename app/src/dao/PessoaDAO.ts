import { Pessoa } from "../model/Pessoa.js"
import { Connection } from "./db.js"

export class PessoaDAO {
  static cadastrarPessoa(pessoa: Pessoa): boolean {
    let conn = Connection.criarConexao()
    try {
      conn.connect()
      let query = `insert into pessoa values ("${pessoa.Nome}", "${pessoa.nascimentoString()}", "${pessoa.CPF}", ${pessoa.Saldo});`     
      conn.query(query)
      return true
    } catch (e) {
      console.error(`Error ${e} no cadastro de uma nova pessoa.`)
      return false
    } finally {
      conn.end()
    }
  }

  //TODO: Criar método selecionarTodos

  //TODO: Criar método selecionarPessoa

  //TODO: Criar método apagarPessoa

  //TODO: Criar método atualizarPessoa
}