import mysql from 'mysql'

export class Connection {
  static criarConexao(): mysql.Connection {
    let info = {
      host: 'localhost',
      user: 'root',
      passowrd: '',
      database: 'usuarios'
    }
    return mysql.createConnection(info)
  }
}