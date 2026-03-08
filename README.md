# questoes-api

API desenvolvida em **NestJS** + **TypeORM** + **PostgreSQL** para uma escola gerenciar professores e questões com alternativas.

---

## Regras de Negócio

### Usuários
- Todo usuário deve ter nome, email e senha
- O email deve ser único no sistema
- A senha é armazenada como hash (bcrypt)
- Um usuário só pode editar e deletar o seu próprio perfil
- O cadastro de usuário é público — não requer autenticação

### Autenticação
- O login é feito com email e senha
- Um token JWT é retornado no login com validade de 1 dia
- O token deve ser enviado no header `Authorization: Bearer <token>`
- As rotas de criar, editar e deletar questões exigem autenticação
- As rotas de editar e deletar usuários exigem autenticação

### Questões
- Toda questão deve ter descrição, matéria e um professor vinculado
- O professor vinculado é extraído automaticamente do token JWT
- Toda questão deve ter exatamente 5 alternativas
- Exatamente 1 alternativa deve ser marcada como correta
- As rotas de listagem de questões são públicas
- Ao deletar uma questão, suas alternativas são deletadas automaticamente

### Alternativas
- Toda alternativa deve ter descrição e um flag indicando se é correta
- Ao atualizar uma questão, todas as alternativas antigas são substituídas pelas novas

---

## Módulos

### users
Gerencia os usuários (professores) da aplicação.

| Método | Rota | Autenticação | Descrição |
|--------|------|:---:|-----------|
| POST | `/users` | Não | Cadastrar usuário |
| GET | `/users` | Não | Listar todos os usuários |
| GET | `/users/:id` | Não | Buscar usuário por ID |
| PATCH | `/users/:id` | Sim | Atualizar usuário |
| DELETE | `/users/:id` | Sim | Deletar usuário |

### auth
Responsável pela autenticação via JWT.

| Método | Rota | Autenticação | Descrição |
|--------|------|:---:|-----------|
| POST | `/auth/login` | Não | Autenticar e obter token |

### questions
Gerencia as questões e suas alternativas.

| Método | Rota | Autenticação | Descrição |
|--------|------|:---:|-----------|
| POST | `/questions` | Sim | Cadastrar questão + alternativas |
| GET | `/questions` | Não | Listar todas as questões |
| GET | `/questions/:id` | Não | Buscar questão por ID |
| PUT | `/questions/:id` | Sim | Atualizar questão + alternativas |
| DELETE | `/questions/:id` | Sim | Deletar questão |

---

## Como rodar

### Pré-requisitos

Instale o Docker de acordo com o seu sistema operacional:

- **Linux (Ubuntu):** [docs.docker.com/engine/install/ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- **Windows:** [docs.docker.com/desktop/install/windows-install](https://docs.docker.com/desktop/install/windows-install/)
- **Mac:** [docs.docker.com/desktop/install/mac-install](https://docs.docker.com/desktop/install/mac-install/)

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd questoes-api
```

### 2. Configure as variáveis de ambiente

**Linux / Mac:**
```bash
cp .env.example .env
```

**Windows (Prompt de Comando):**
```cmd
copy .env.example .env
```

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

Abra o arquivo `.env` e preencha os valores:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
DB_NAME=db_perguntas_e_respostas
JWT_SECRET=sua_chave_secreta
```

> `DB_HOST` deve ser `localhost` para rodar a API localmente. Ao rodar com Docker, esse valor é sobrescrito automaticamente pelo `docker-compose.yml` para `questoes-db`.

### 3. Suba os containers

**Linux / Mac:**
```bash
docker compose up --build -d
```

**Windows (Prompt de Comando ou PowerShell):**
```cmd
docker compose up --build -d
```

A API estará disponível em `http://localhost:3000`.

---

## Tecnologias

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Docker](https://www.docker.com/)