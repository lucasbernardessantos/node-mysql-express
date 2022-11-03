import express, { Request, Response } from 'express'
import { MysqlError } from 'mysql'
import { OkPacket, QueryError } from 'mysql2'
import { Connection } from './dao/db.js'
import { IPessoa } from './interface/IPessoa.js'
import { Pessoa } from './model/Pessoa.js'

const app = express()
const PORT = process.env.port || 3000

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Conexão aberta.')
})

app.get('/selecionarPessoas', (req: Request, res: Response) => { 
  let conn = Connection.criarConexao()
  let pessoasArray: Pessoa[] = []
  let sql = `select * from usuarios.pessoa;`

  conn.connect(err => {
    if(err) {
      console.error(`Error connecting: ${err.stack}`)
      return
    }
    console.log(`Connected as id: ${conn.threadId}`)
  })

  conn.query(sql, function (err: MysqlError, result: IPessoa[])  {
    if(err) throw err    
    result.forEach(InPessoa => {
      let pessoa = new Pessoa(
        InPessoa.nome!,
        new Date(InPessoa.nascimento!),
        InPessoa.cpf!,
        InPessoa.saldoBancario!
      )  
      pessoasArray.push(pessoa) 
    })
    res.status(200).send(JSON.stringify(pessoasArray))
  })
  conn.end()
})

app.post('/cadastrarPessoa', (req: Request, res: Response) => {
  let data:IPessoa = req.body
  let pessoa = new Pessoa(data.nome!, new Date(data.nascimento!), data.cpf!, data.saldoBancario!)
  let conn = Connection.criarConexao()
  let sql = `insert into usuarios.pessoa values ("${pessoa.Nome}", "${pessoa.nascimentoString()}", "${pessoa.CPF}", ${pessoa.Saldo});`
   
  conn.connect(err => {
    if(err) {
      console.error(`Error connecting: ${err.stack}`)
      return
    }
    console.log(`Connected as id: ${conn.threadId}`)
  })
    
  conn.query(sql, (err: QueryError, result: OkPacket) => {
    if(err) throw err

    res.status(200).send(`Pessoa cadastrada: ${result.affectedRows} linha afetada.`)
  })

  conn.end()
})

app.delete('/deletarPessoa', (req: Request, res: Response) => {
  let pessoa: IPessoa = req.body
  let sql = `delete from usuarios.pessoa where cpf = ${pessoa.cpf!}`
  let conn = Connection.criarConexao()

  conn.connect(err => {
    if(err) {
      console.error(`Error connecting: ${err.stack}`)
      return
    }
    console.log(`Connected as id: ${conn.threadId}`)
  })

  conn.query(sql, (err: QueryError, result: OkPacket) => {
    if(err) throw err

    res.status(200).send(`Pessoa deletada: ${result.affectedRows} linha afetada.`)
  })

  conn.end()
})

app.put('/atualizarPessoa', (req: Request, res: Response) => {
  let data:IPessoa = req.body
  let pessoa = new Pessoa(data.nome!, new Date(data.nascimento!), data.cpf!, data.saldoBancario!)
  let conn = Connection.criarConexao()
  let sql = `update usuarios.pessoa set nome = "${pessoa.Nome}", nascimento = "${pessoa.nascimentoString()}", saldoBancario = "${pessoa.Saldo}" where cpf = "${pessoa.CPF}"`

  conn.connect(err => {
    if(err) {
      console.error(`Error connecting: ${err.stack}`)
      return
    }
    console.log(`Connected as id: ${conn.threadId}`)
  })

  conn.query(sql, (err: QueryError, result: OkPacket) => {
    if(err) throw err

    res.status(200).send(`Pessoa atualizada: ${result.affectedRows} linha afetada.`)
  })
})