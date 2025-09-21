import express from "express";
import { Express, Request,  Response} from "express";
import { parse } from "path";

const app: Express = express();
const port: number = 3000;

app.use(express.json());

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
    crm: number | string
}

type Consulta = {
    id: number,
    sintomas: string,
    data_sintoma: Date
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
];

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
];

const medicos: Medico[] = [
    {
        id: 1,
        nome: "Dr. Carlos",
        idade: 45,
        crm: "PE-345656" 
    },
    {
        id: 2,
        nome: "Dra. Lúcia",
        idade: 39,
        crm: "PB-78910" 
    }
];

const consultas: Consulta[] = [
    {
        id: 1,
        sintomas: "Dor de cabeça",
        data_sintoma: new Date("2025-03-12") 
    },
    {
        id: 2,
        sintomas: "Dor de barriga",
        data_sintoma: new Date("2025/06/24")
    }
];

app.get("/secretarios", (req: Request, res: Response) => {
    res.json(secretarios);
});

app.get("/pacientes", (req: Request, res: Response) => {
    res.json(pacientes);
});

app.get("/medicos", (req: Request, res: Response) => {
    res.json(medicos);
});

app.get("/consultas", (req: Request, res: Response) => {
    res.json(consultas);
});


app.get("/secretarios/:id", (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    const secretario = secretarios.find(s => s.id === id);

    if (!secretario) {
        return res.status(404).json({ message: "Usuário não encontrado." })
    }
    res.json(secretario);
});

app.get("/pacientes/:id", (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    const paciente = pacientes.find(p => p.id === id);

    if (!paciente) {
        return res.status(404).json({ message: "Paciente não encontrado." })
    }
    res.json(paciente);
});

app.get("/medicos/:id", (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    const medico = medicos.find(m => m.id === id);

    if (!medico) {
        return res.status(404).json({ message: "Médico não encontrado." })
    }
    res.json(medico);
});

app.get("/consultas/:id", (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    const consulta = consultas.find(c => c.id === id);

    if (!consulta) {
        return res.status(404).json({ message: "Médico não encontrado." });
    }
    res.json(consulta);
});

app.post("/secretarios", (req: Request, res: Response) => {
    const { nome, idade } = req.body;

    // Validação manual do corpo da requisição
    if (typeof nome !== 'string' || nome.trim() === "") {
        return res.status(400).json({ message: "O nome é obrigatório e não pode estar vazio." });
    }

    if (typeof idade !== 'number' || !Number.isInteger(idade) || idade <= 0) {
        return res.status(400).json({ message: "A idade é obrigatória e deve ser um número inteiro." })
    }

    const existingSecretario: Secretario | undefined = secretarios.find(s => s.nome.toLowerCase() === nome.toLowerCase());
    if (existingSecretario) {
        return res.status(409).json({ message: "Já existe um usuário com esse nome." })
    }
    
    let maxId: number = 0;
    for (const secretario of secretarios) {
        if (secretario.id > maxId) {
            maxId = secretario.id;
        }
    }

    //maxId = secretarios.reduce((max, secretario) => (secretario.id > max ? secretario.id : max), 0);
    const secretarioWithId: Secretario = { id: maxId + 1, nome, idade, };

    secretarios.push(secretarioWithId);
    res.status(201).json(secretarios);
});

app.post("/pacientes", (req: Request, res: Response) => {
    const { nome, idade, sus } = req.body;

    // Validação manual do corpo da requisição
    if (typeof nome !== 'string' || nome.trim() === "") {
        return res.status(400).json({ message: "O nome é obrigatório e não pode estar vazio." });
    }

    if (typeof idade !== 'number' || !Number.isInteger(idade) || idade <= 0) {
        return res.status(400).json({ message: "A idade é obrigatória e deve ser um número inteiro." })
    }

    if (typeof sus !== 'number' || !Number.isInteger(sus) || sus <= 0) {
        return res.status(400).json({ message: "O numero do SUS é obrigatório e deve ser um número inteiro." })
    }

    const existingPaciente: Paciente | undefined = pacientes.find(p => p.nome.toLowerCase() === nome.toLowerCase());
    if (existingPaciente) {
        return res.status(409).json({ message: "Já existe um paciente com esse nome." })
    }
    
    let maxId: number = 0;
    for (const paciente of pacientes) {
        if (paciente.id > maxId) {
            maxId = paciente.id;
        }
    }
 
    const pacienteWithId: Paciente = { id: maxId + 1, nome, idade, sus, };

    pacientes .push(pacienteWithId);
    res.status(201).json(pacientes);
});

app.post("/medicos", (req: Request, res: Response) => {
    const { nome, idade, crm } = req.body;

    // Validação manual do corpo da requisição
    if (typeof nome !== 'string' || nome.trim() === "") {
        return res.status(400).json({ message: "O nome é obrigatório e não pode estar vazio." });
    }

    if (typeof idade !== 'number' || !Number.isInteger(idade) || idade <= 0) {
        return res.status(400).json({ message: "A idade é obrigatória e deve ser um número inteiro." })
    }

    const existingMedico: Medico | undefined = medicos.find(m => m.nome.toLowerCase() === nome.toLowerCase());
    if (existingMedico) {
        return res.status(409).json({ message: "Já existe um médico com esse nome." })
    }
    
    let maxId: number = 0;
    for (const medico of medicos) {
        if (medico.id > maxId) {
            maxId = medico.id;
        }
    };

    const medicoWithId: Medico = { id: maxId + 1, nome, idade, crm};

    medicos.push(medicoWithId);
    res.status(201).json(medicos);
});

app.post("/consultas", (req: Request, res: Response) => {
    const { sintomas, data_sintoma } = req.body;

    // Validação manual do corpo da requisição
    if (typeof sintomas !== 'string' || sintomas.trim() === "") {
        return res.status(400).json({ message: "O tipo de sintoma é obrigatório e não pode estar vazio." });
    }

    if (typeof data_sintoma !== 'number' || !Number.isInteger(data_sintoma) || data_sintoma <= 0) {
        return res.status(400).json({ message: "A idade é obrigatória e deve ser um número inteiro." })
    }

    const existingConsulta: Consulta | undefined = consultas.find(s => s.sintomas.toLowerCase() === sintomas.toLowerCase());
    if (existingConsulta) {
        return res.status(409).json({ message: "Já existe um sintoma com esse nome." })
    }
    
    let maxId: number = 0;
    for (const medico of medicos) {
        if (medico.id > maxId) {
            maxId = medico.id;
        }
    };

    const data = new Date(data_sintoma);

    const consultaWithId: Consulta = { id: maxId + 1, sintomas, data_sintoma: new Date(data_sintoma)};

    consultas.push(consultaWithId);
    res.status(201).json(medicos);
});

app.put("/secretarios/:id", (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0 ){
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    const secretarioIndex: number = secretarios.findIndex(s => s.id === id);
    if (secretarioIndex === -1){
        return res.status(404).json({ message: "Usuário não encontrado." })
    }

    const { nome, idade } = req.body;
    const currentSecretario: Secretario = secretarios[secretarioIndex];

    if (nome !== undefined) {
        if (typeof nome !== 'string' || nome.trim() === "") {
            return res.status(400).json({ message: "O nome, se fornecido, não pode estar vazio." });
        }
        currentSecretario.nome = nome;
    }

    if (idade !== undefined) {
        if (typeof idade !== 'number' || !Number.isInteger(idade) || idade <= 0) {
            return res.status(400).json({ message: "A idade, se fornecida, deve ser um número inteiro positivo"});
        }
        currentSecretario.idade = idade;
    }

    if (nome === undefined && idade === undefined) {
        return res.status(400).json({ message: "Nenhum dado para atualizar foi fornecido (nome ou idade)."});
    }

    secretarios[secretarioIndex] = currentSecretario;
    res.json(currentSecretario);
});

app.put("/pacientes/:id", (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0 ){
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    const pacienteIndex: number = pacientes.findIndex(p => p.id === id);
    if (pacienteIndex === -1){
        return res.status(404).json({ message: "Paciente não encontrado." })
    }

    const { nome, idade, sus } = req.body;
    const currentPaciente: Paciente = pacientes[pacienteIndex];

    if (nome !== undefined) {
        if (typeof nome !== 'string' || nome.trim() === "") {
            return res.status(400).json({ message: "O nome, se fornecido, não pode estar vazio." });
        }
        currentPaciente.nome = nome;
    }

    if (idade !== undefined) {
        if (typeof idade !== 'number' || !Number.isInteger(idade) || idade <= 0) {
            return res.status(400).json({ message: "A idade, se fornecida, deve ser um número inteiro positivo"});
        }
        currentPaciente.idade = idade;
    }

    if (sus !== undefined) {
        if (typeof sus !== 'number' || !Number.isInteger(sus) || sus <= 0) {
            return res.status(400).json({ message: "O SUS, se fornecido, não pode estar vazio." });
        }
        currentPaciente.nome = nome;
    }

    if (nome === undefined && idade === undefined) {
        return res.status(400).json({ message: "Nenhum dado para atualizar foi fornecido (nome ou idade)."});
    }

    pacientes[pacienteIndex] = currentPaciente;
    res.json(currentPaciente);
});

app.put("/medicos/:id", (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0 ){
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    const medicoIndex: number = medicos.findIndex(m => m.id === id);
    if (medicoIndex === -1){
        return res.status(404).json({ message: "Medico não encontrado." })
    }

    const { nome, idade, crm } = req.body;
    const currentMedico: Medico = medicos[medicoIndex];

    if (nome !== undefined) {
        if (typeof nome !== 'string' || nome.trim() === "") {
            return res.status(400).json({ message: "O nome, se fornecido, não pode estar vazio." });
        }
        currentMedico.nome = nome;
    }

    if (idade !== undefined) {
        if (typeof idade !== 'number' || !Number.isInteger(idade) || idade <= 0) {
            return res.status(400).json({ message: "A idade, se fornecida, deve ser um número inteiro positivo"});
        }
        currentMedico.idade = idade;
    }

    if (crm !== undefined) {
        if (typeof crm !== 'number' && 'string' || !Number.isInteger(crm) ||crm.trim() === "" || crm <= 0) {
            return res.status(400).json({ message: "O CRM, se fornecido, não pode estar vazio." });
        }
        currentMedico.crm = crm;
    }

    if (nome === undefined && idade === undefined) {
        return res.status(400).json({ message: "Nenhum dado para atualizar foi fornecido (nome ou idade)."});
    }

    medicos[medicoIndex] = currentMedico;
    res.json(currentMedico);
});

app.put("/consultas/:id", (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0 ){
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    const consultaIndex: number = consultas.findIndex(c => c.id === id);
    if (consultaIndex === -1){
        return res.status(404).json({ message: "Medico não encontrado." })
    }

    const { data_sintoma } = req.body;
    const currentConsulta: Consulta = consultas[consultaIndex];

    if (data_sintoma === undefined) {
        return res.status(400).json({ message: "O campo 'data_sintoma' é obrigatório." });
    }

    const parsedDate = new Date(data_sintoma);
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: "Data inválida. Use um formato de data válido (ex: YYYY-MM-DD"});
    };

    const now = new Date();
    if (parsedDate > now) {
         return res.status(400).json({ message: "A data do sintoma não pode ser no futuro." });
    }

    currentConsulta.data_sintoma = parsedDate;

    consultas[consultaIndex] = currentConsulta;

    res.json(currentConsulta);
});


app.delete("secretarios/:id", (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    const secretarioIndex: number = secretarios.findIndex(s => s.id === id);

    if (secretarioIndex === -1) {
        return res.status(400).json({ message: "Usuário não encontrado"});
    }

    secretarios.splice(secretarioIndex, 1);
    res.status(204).send();
});

app.delete("pacientes/:id", (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    const pacienteIndex: number = pacientes.findIndex(p => p.id === id);

    if (pacienteIndex === -1) {
        return res.status(400).json({ message: "Paciente não encontrado"});
    }

    pacientes.splice(pacienteIndex, 1);
    res.status(204).send();
});

app.delete("medicos/:id", (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    const medicoIndex: number = medicos.findIndex(m => m.id === id);

    if (medicoIndex === -1) {
        return res.status(400).json({ message: "Medico não encontrado"});
    }

    medicos.splice(medicoIndex, 1);
    res.status(204).send();
});

app.delete("consultas/:id", (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    const consultaIndex: number = consultas.findIndex(c => c.id === id);

    if (consultaIndex === -1) {
        return res.status(400).json({ message: "Consulta não encontrada"});
    }

    consultas.splice(consultaIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
