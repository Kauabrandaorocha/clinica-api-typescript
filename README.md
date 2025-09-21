# 🏥 Clínica API - TypeScript

API REST construída com Node.js e TypeScript para simular a gestão de uma clínica, incluindo o cadastro e gerenciamento de **secretários**, **pacientes**, **médicos** e **consultas**.

> 📌 Esta API é **in-memory** — ou seja, **não utiliza banco de dados**. Os dados são armazenados em arrays dentro do próprio código, ideal para fins de estudo ou testes locais.

---

## 📦 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)

---

## 🚀 Como executar o projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/Kauabrandaorocha/clinica-api-typescript.git
cd clinica-api-typescript
```

2. Instale as dependências (Faça as instalações de cima para baixo):

- Inicia um projeto contendo o package.json:
```
npm init -y
```
- Instala o framework express:
```
npm install express
```
- `typescript`: Vai converter todo o código typescript para javascript
- `@types/express`: Permite que o TypeScript entenda as funções, objetos e métodos do Express (como Request, Response, etc.)
- `@types/node`: Tipagens para as APIs internas do Node.js
- `ts-node nodemon`: Executa arquivos .ts diretamente sem precisar compilar manualmente com tsc
- `nodemon`: Usado para facilitar o desenvolvimento, reiniciando sua API a cada alteração no código
```
npm install --save-dev typescript @types/express @types/node ts-node nodemon
```
- Serve para inicializar um projeto TypeScript criando o arquivo de configuração `tsconfig.json`.
```
npx tsc --init
```
- No `tsconfig` altere todo o código para esse:

```
{
  "compilerOptions": {
    "target": "es6", // Versão do JavaScript de saída
    "module": "commonjs", // Sistema de módulos
    "rootDir": "./src", // Onde nosso código .ts estará
    "outDir": "./dist", // Onde o JavaScript compilado será salvo
    "esModuleInterop": true, // Permite compatibilidade entre módulos CommonJS e ES
    "forceConsistentCasingInFileNames": true,
    "strict": true, // Habilita todas as checagens de tipo estritas
    "skipLibCheck": true
  }
}
```

- Altere, também, no package.json essa parte do código:

```
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "nodemon src/index.ts"
},
```

## 📁 Estrutura

Como todo o projeto está contido em um único arquivo, a estrutura é simples:
```
index.ts → Código principal da API
```

📚 Funcionalidades

A API fornece as operações básicas de CRUD para cada entidade:

## 🔹 Secretários

`GET /secretarios` — Listar todos

`GET /secretarios/:id` — Buscar por ID

`POST /secretarios` — Criar novo

`PUT /secretarios/:id` — Atualizar dados

`DELETE /secretarios/:id` — Remover

## 🔹 Pacientes

`GET /pacientes`

`GET /pacientes/:id`

`POST /pacientes`

`PUT /pacientes/:id`

`DELETE /pacientes/:id`

## 🔹 Médicos

`GET /medicos`

`GET /medicos/:id`

`POST /medicos`

`PUT /medicos/:id`

`DELETE /medicos/:id`

## 🔹 Consultas

`GET /consultas`

`GET /consultas/:id`

`POST /consultas`

`PUT /consultas/:id`

`DELETE /consultas/:id`

## 🧪 Exemplos de Requisições
- Criar um novo paciente
```
POST /pacientes
Content-Type: application/json

{
  "nome": "Carlos",
  "idade": 35,
  "sus": 123456789
}
```

- Atualizar médico
```
PUT /medicos/1
Content-Type: application/json

{
  "nome": "Dr. João",
  "idade": 50,
  "crm": "PE-345786"
}
```

## ⚠️ Observações

- Todos os dados são armazenados em arrays e perdidos ao reiniciar o servidor.

- As validações são feitas manualmente.

- A API retorna mensagens claras para erros como:

    - ID inválido

    - Dados obrigatórios ausentes

    - Duplicatas

## 🙋‍♂️ Autor

Kaua Brandão

 - GitHub: [@Kauabrandaorocha](https://github.com/Kauabrandaorocha)
