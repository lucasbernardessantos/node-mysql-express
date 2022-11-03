"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
class Connection {
    static criarConexao() {
        let info = {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'usuarios'
        };
        return mysql2_1.default.createConnection(info);
    }
}
exports.Connection = Connection;
