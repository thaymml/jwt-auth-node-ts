# jwt-auth-node-ts

## 🔐 Projeto simples de autenticação de usuários

Este é um projeto fullstack básico com **Node.js**, **TypeScript**, **JWT**, **PostgreSQL** e uma interface em **HTML/CSS/JavaScript puro**, que permite:

- Cadastro de usuários  
- Login com token JWT  
- Rotas protegidas no backend  
- Interface de login/cadastro no frontend  
- Armazenamento seguro do token no `localStorage`

---

## 📸 Demonstração

<div align="center">
  <img src="./docs/image.png" alt="Tela de Cadastro" width="500" />
</div>

---

## 🧰 Tecnologias Utilizadas

### Backend:
- Node.js  
- TypeScript  
- Express  
- PostgreSQL  
- JWT (`jsonwebtoken`)  
- bcrypt  
- dotenv  
- ts-node-dev

### Frontend:
- HTML5  
- CSS3  
- JavaScript puro (fetch API)

---


## ⚙️ Como rodar o projeto

### 🔧 Requisitos

- Node.js instalado (versão 18 ou superior recomendada)
- PostgreSQL instalado e com um banco de dados criado
- Git instalado

---

### 🚀 Passo a passo

#### 1. Clone o repositório

```bash
git clone https://github.com/thaymml/jwt-auth-node-ts.git
cd jwt-auth-node-ts 
```

#### 2. Instale as dependências do backend

```bash
cd backend
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na pasta `api-auth` com o seguinte conteúdo:
``` bash
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_segura
PORT=3000
```

### 4.  Rode as migrations com o Prisma
```bash
npx prisma migrate dev --name init
```

#### 5.  Inicie o servidor backend
```bash
npm run dev
```

### 🌐 Executando o frontend
1. Abra a pasta frontend no VS Code
2. Clique com o botão direito no arquivo login.html
3. Escolha "Open with Live Server" (extensão recomendada no VS Code)


### 👩‍💻 Desenvolvido por

**Thayssa Lima**  
[GitHub](https://github.com/thaymml)
