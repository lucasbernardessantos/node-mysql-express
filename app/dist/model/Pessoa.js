"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pessoa = void 0;
class Pessoa {
    constructor(nome, nascimento, cpf, saldo) {
        this.nome = nome;
        this.nascimento = nascimento;
        this.cpf = cpf;
        this.saldo = saldo;
    }
    nascimentoString() {
        return `${this.Nascimento.getFullYear()}-${this.Nascimento.getMonth() + 1}-${this.Nascimento.getDate()}`;
    }
    get Nome() {
        return this.nome;
    }
    set Nome(nome) {
        this.nome = nome;
    }
    get Nascimento() {
        return this.nascimento;
    }
    set Nascimento(nascimento) {
        this.nascimento = nascimento;
    }
    get CPF() {
        return this.cpf;
    }
    get Saldo() {
        return this.saldo;
    }
    set Saldo(saldo) {
        this.saldo = saldo;
    }
}
exports.Pessoa = Pessoa;
