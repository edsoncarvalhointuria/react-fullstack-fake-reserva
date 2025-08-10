# 🐦 FakeReserva (E-commerce Full-Stack)

![Adobe Express - 0810(2)](https://github.com/user-attachments/assets/e1e3a277-466b-467b-a2c1-c357aad753d1)


---

### ✨ Sobre o Projeto

Este projeto é uma simulação de e-commerce full-stack, inspirado no design e na experiência do usuário do site da [Reserva](https://www.usereserva.com/). Desenvolvido como um estudo aprofundado, o objetivo foi construir uma aplicação web completa e robusta do zero, dominando o fluxo de dados entre um frontend moderno e um backend seguro na nuvem.

Toda a arquitetura, desde a renderização no cliente até a persistência de dados, foi implementada para demonstrar habilidades em tecnologias de ponta e criar uma experiência de compra fluida e funcional.

📌 **Acesse a versão ao vivo:** [https://edsoncarvalhointuria.github.io/react-fullstack-fake-reserva/](https://edsoncarvalhointuria.github.io/react-fullstack-fake-reserva/)

**Login**: teste@teste.com

**Senha**: 123123

---

### 🛠️ Funcionalidades

#### Frontend (React + Vite)

-   **Navegação Dinâmica:** Home, páginas de coleção, categorias e produtos detalhados.
-   **Busca Inteligente:** Filtro de produtos por categoria e pesquisa por nome.
-   **Carrinho de Compras Persistente:** O carrinho mantém os itens mesmo que o usuário feche o navegador.
-   **Autenticação de Usuário:** Sistema completo de cadastro, login e logout com gerenciamento de sessão via cookies.
-   **Área do Cliente:** Painel para o usuário visualizar e atualizar seus dados e ver o histórico de compras.
-   **Checkout Seguro:** Formulário de finalização de compra com validação e integração com a API.

#### Backend (Node.js + Express)

-   **API RESTful Completa:** Endpoints para todas as operações: produtos, usuários, pedidos, sessões, etc.
-   **Autenticação Segura:** Geração e validação de tokens **JWT** (JSON Web Tokens) com cookies `httpOnly` e `secure`.
-   **Banco de Dados na Nuvem:** Toda a lógica de negócio é persistida em um banco de dados **PostgreSQL** hospedado no Supabase.
-   **Armazenamento de Arquivos:** Todas as imagens de produtos e banners são hospedadas no **Supabase Storage** para garantir performance e disponibilidade.

---

### 🚀 Tecnologias Utilizadas

-   **Frontend:**
    -   React (com Vite)
    -   JavaScript
    -   SASS / SCSS
    -   Axios
-   **Backend:**
    -   Node.js
    -   Express.js
    -   TypeScript
    -   PostgreSQL (com a biblioteca `pg`)
-   **Infraestrutura e Serviços:**
    -   **Hospedagem (Frontend):** GitHub Pages
    -   **Hospedagem (Backend):** Render
    -   **Banco de Dados:** Supabase (PostgreSQL)
    -   **Armazenamento de Arquivos:** Supabase Storage
-   **Segurança:**
    -   Bcrypt.js (para hashing de senhas)
    -   JSON Web Token (JWT)

---

### 📦 Como Rodar o Projeto Localmente

Este é um monorepo. Você precisará iniciar o frontend e o backend em terminais separados.

**1. Backend:**

```bash
# Navegue para a pasta do backend
$ cd backend

# Instale as dependências
$ npm install

# Crie um arquivo .env com suas chaves do Supabase e JWT
# (DATABASE_URL e KEY)

# Inicie o servidor de desenvolvimento
$ npm run dev
```

**2. Frontend:**

```bash
# Em um novo terminal, navegue para a pasta do frontend
$ cd frontend

# Instale as dependências
$ npm install

# Crie um arquivo .env.local com o link para a sua API local
# (VITE_LINK_API=http://localhost:3000)

# Inicie o cliente de desenvolvimento
$ npm run dev
```

---

### 💌 Contato

**Edson Carvalho Inturia**

<p align="left">  
<a href="mailto:edsoncarvalhointuria@gmail.com" title="Gmail">  
  <img src="https://img.shields.io/badge/-Gmail-FF0000?style=flat-square&labelColor=FF0000&logo=gmail&logoColor=white" alt="Gmail"/>  
</a>  
<a href="https://br.linkedin.com/in/edson-carvalho-inturia-1442a0129" title="LinkedIn">  
  <img src="https://img.shields.io/badge/-LinkedIn-0e76a8?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"/>  
</a> 
</p>

Obrigado pela visita!
