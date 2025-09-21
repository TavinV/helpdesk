# HelpDesk - Sistema de Chamados

Aplicação fullstack para gerenciamento de chamados de suporte, com autenticação de usuários, painel de tickets e fluxo de abertura e atendimento de chamados.

🔗 **Aplicação online:** [helpdesk-gray.vercel.app](https://helpdesk-gray.vercel.app)

---

## 📌 Funcionalidades

- Autenticação de usuários (JWT + bcrypt)
- Diferenciação de perfis: **Usuário** e **Técnico**
- Usuários podem abrir, listar e acompanhar seus chamados
- Técnicos podem visualizar e gerenciar chamados
- Fluxo de abertura de chamados com:
  - Descrição detalhada
  - Soluções tentadas
  - Informações adicionais
- Envio de emails com **Nodemailer**
- Validações com **Joi**
- Banco de dados MongoDB para persistência

---

## 🛠️ Tecnologias Utilizadas

### Backend
- [Express](https://expressjs.com/) - Framework web
- [Mongoose](https://mongoosejs.com/) - ODM para MongoDB
- [JWT](https://jwt.io/) - Autenticação baseada em tokens
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Hash de senhas
- [Nodemailer](https://nodemailer.com/) - Envio de emails
- [Joi](https://joi.dev/) - Validação de dados
- [dotenv](https://www.npmjs.com/package/dotenv) - Variáveis de ambiente
- [cors](https://www.npmjs.com/package/cors)
- [body-parser](https://www.npmjs.com/package/body-parser)

### Frontend
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Lucide React](https://lucide.dev/) - Ícones
- Componentização reutilizável (Cards, Inputs, Botões, etc.)

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js (>=18)
- MongoDB (local ou Atlas)
- NPM ou Yarn

### Clonando o projeto
```bash
git clone https://github.com/seu-usuario/helpdesk.git
cd helpdesk
```

### Backend
```bash
cd backend
cp .env.example .env   # configurar variáveis de ambiente
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

O frontend rodará em `http://localhost:5173` e o backend em `http://localhost:5000` (ou porta definida no `.env`).

---

## 📂 Estrutura do Projeto
```
/backend
  /models
  /routes
  /controllers
  /services
  server.js
/frontend
  /src
    /components
    /pages
    /context
    /hooks
    /services
```

---

## 📜 Licença
Este projeto é open-source, fique à vontade para utilizar e modificar conforme necessário.
