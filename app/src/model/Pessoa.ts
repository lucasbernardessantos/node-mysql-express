export class Pessoa {
  constructor(
    private nome: string, 
    private nascimento: Date,
    private cpf: string,
    private saldo: number
  ) {}

  nascimentoString(): string {
    return `${this.Nascimento.getFullYear()}-${this.Nascimento.getMonth() + 1}-${this.Nascimento.getDate()}`
  }

  get Nome(): string {
    return this.nome
  }
  set Nome(nome: string) {
    this.nome = nome
  }

  get Nascimento(): Date {
    return this.nascimento
  }
  set Nascimento(nascimento: Date) {
    this.nascimento = nascimento
  }

  get CPF(): string {
    return this.cpf
  }

  get Saldo(): number {
    return this.saldo
  }
  set Saldo(saldo: number) {
    this.saldo = saldo
  }
}