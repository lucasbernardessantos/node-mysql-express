import { MysqlError } from "mysql"
import { IPessoa } from "../interface/IPessoa.js"
import { Pessoa } from "../model/Pessoa.js"
import { Connection } from "./db.js"

export class PessoaDAO {

  static cadastrarPessoa(pessoa: Pessoa) {
    let conn = Connection.criarConexao()
    try {
      conn.connect()

      let sql = `insert into pessoa values ("${pessoa.Nome}", "${pessoa.nascimentoString()}", "${pessoa.CPF}", ${pessoa.Saldo});`  
        
      conn.query(sql, (err) => {
        if(err) {
          console.error(`${err.message}\n${err.sqlState}`)
        }
      })
    } finally {
      conn.end()
    }
  }

  public selecionarTodasPessoas() {
    let conn = Connection.criarConexao()
    let pessoasArray: Pessoa[] = []

    conn.connect(err => {
      if(err) {
        console.error(`Error connecting: ${err.stack}`)
        return
      }
      console.log(`Connected as id: ${conn.threadId}`)
    })

    let sql = `select * from usuarios.pessoa;`

    conn.query(sql, function (err: MysqlError, result: IPessoa[])  {
      if(err) throw err    
      result.forEach(InPessoa => {
        let pessoa = new Pessoa(
          InPessoa.nome,
          new Date(InPessoa.nascimento),
          InPessoa.cpf,
          InPessoa.saldoBancario
        )  
        pessoasArray.push(pessoa) 
      })
    })
  }


  //TODO: Criar método selecionarPessoa

  //TODO: Criar método apagarPessoa

  //TODO: Criar método atualizarPessoa
}