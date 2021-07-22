# Teste Técnico

![Completa Administradora de Condomínios](./assets/completa.png)

Sistema de cadastro de usuários com autenticação **JWT**

<hr>
  <h4 align="center"> 
    🚧  Projeto 🚀 Em construção...  🚧
  </h4>
<hr>

## 🧪 Tecnologias

Este projeto foi desenvolvido usando as seguintes tecnologias:

- NodeJs
- JWT
- Sequelize
- Jest

---

## 🚀 Iniciando o projeto

Clone o projeto e acesse a pasta *completa-company-technical-test*

```bash
git clone https://github.com/jorge-lba/completa-company-technical-test.git
cd completa-company-technical-test
```

Crie um arquivo `.env` usando o modelo `.env.example` e preencha os dados necessários.

**obs:** Caso queira usar um banco `postgres` em nuvem, pode ser utilizado o **ElephantSQL.**

Siga os passos abaixo para rodar:

```bash
# Instalando dependencias
$ yarn

# Iniciando o projeto como desenvolvimento
$ yarn dev

# Iniciando o projeto como produção
$ yarn start:prod
```

A **API** estará disponível para acesso em [http://localhost:3333](http://localhost:3333)

**obs:** Caso queira rodar sem fazer o clone do repositório, você pode usar o seguinte link [https://completa.herokuapp.com/](https://completa.herokuapp.com/) ( o link pode estar fora do ar dependo do momento que você está acessando esse repositório )

---

## 🔃 Rotas

Estão disponíveis rotas para serem utilizadas:

### **POST - /users**

Cadastro de um novo usuário, espera o seguinte json no `body`:

```json
{
	"name":"name",
	"email":"name@test.com",
	"password":"abcdef"
}
```

### GET - /users/:user_id

Pegar um usuário usando o id.

É necessário estar autenticado e enviar o `refresh_token` gerado na rota de autenticação.

### PUT - /users/:user_id

Atualizar dados de um usuário usando o id, espera o seguinte json no `body`:

```json
{
	"name":"name",
	"email":"name@test.com"
}
```

É necessário estar autenticado e enviar o `refresh_token` gerado na rota de autenticação.

### GET - /users

Lista todos os usuários cadastrados.

É necessário estar autenticado e enviar o `refresh_token` gerado na rota de autenticação.

### PUT - /users/:user_id/password

Atualizar a senha usuário, espera o seguinte json no `body`:

```json
{
	"oldPassword":"abcdef",
	"newPassword":"abcdef"
}
```

É necessário estar autenticado e enviar o `refresh_token` gerado na rota de autenticação.

### DELETE - /users/:user_id

Exclui um usuário usando o id.

É necessário estar autenticado e enviar o `refresh_token` gerado na rota de autenticação.

### **POST - /auth**

Faz a autenticação do usuário, espera o seguinte json no `body`:

```json
{
	"email":"jorge@test.com",
	"password":"abcdef"
}
```

### **POST - /auth/refresh**

Atualiza o `refresh_token`, espera o seguinte json no `body`:

```json
{
	"token":"{{ refresh_token }}"
}
```