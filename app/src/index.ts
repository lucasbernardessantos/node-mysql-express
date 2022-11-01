import express, { Request, Response } from 'express'
import { PessoaDAO } from './dao/PessoaDAO.js'
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

app.post('/cadastrarPessoa', (req: Request, res: Response) => {
  let data:IPessoa = req.body

  let nascimento = formatarData(data.nascimento.toString())

  let pessoa = new Pessoa(data.nome, nascimento, data.cpf, data.saldo)

  PessoaDAO.cadastrarPessoa(pessoa)
  res.status(200).send(`Dados Chegaram.`)
})

function formatarData(data: string): Date { // ata está chegando no formato dd-MM-yyyy
  let vetorData = data.split('-', 3) // Vetor ["dd", "MM", "yyyy"]
  let dataString = `${vetorData[1]}-${vetorData[0]}-${vetorData[2]}` // MM/dd/yyyy

  let dataFormatada = new Date(dataString)

  return dataFormatada
}