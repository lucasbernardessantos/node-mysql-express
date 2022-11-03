import mysql from 'mysql2'

export class Connection {
  static criarConexao(): mysql.Connection {
    let info = {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'usuarios'
    }
    return mysql.createConnection(info)
  }
}