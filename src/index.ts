import express from "express";
import { Express, Request,  Response} from "express";

const app: Express = express();
const port: number = 3000;

app.use(express.json);

type Secretario = {
    id: number,
    nome: string,
    idade: number
}

type Paciente = {
    id: number,
    nome: string,
    idade: number,
    sus: number
}

type Medico = {
    id: number,
    nome: string,
    idade: number,
    crm: number
}

type Consultas = {
    id: number,
    sintomas: string,
    data_sintoma: number
}

const secretarios: Secretario[] = [
    {
        id: 1,
        nome: "Ana",
        idade: 30
    },
    {
        id: 2,
        nome: "João",
        idade: 20
    }
]

const pacientes: Paciente[] = [
    {
        id: 1,
        nome: "Júnior",
        idade: 24,
        sus: 345612
    },
    {
        id: 2,
        nome: "Júlia",
        idade: 20,
        sus: 432567
    }
]

const medicos: Medico[] = [
    {    
        id: number,
        nome: string,
        idade: number,
        crm: numbe
    },
    {
        id: number,
        nome: string,
        idade: number,
        crm: numbe
    }
]

