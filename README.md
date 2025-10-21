API de Gerenciamento de Estoque

API RESTful para gerenciar produtos em estoque.

Tecnologias Utilizadas

Node.js - Ambiente de execução JavaScript
Express.js - Framework web minimalista
nodemon.js - automatiza o processo de reinício de aplicações Node.js durante o desenvolvimento
JSON - Formato de dados para requisições e respostas


Pré-requisitos
Antes de começar, você precisa ter instalado:

Node.js 
Um editor de código 
Thunder Client ou Postman para testes


Instalação
Siga estes passos para rodar o projeto:
bash# 1. Clone ou baixe o projeto
cd api-estoque

# 2. Instale as dependências
npm install

# 3. Inicie o servidor
npm run dev
```

O servidor estará rodando em: **http://localhost:3333**

---

Rotas da API

### Listar Todos os Produtos
```
GET /produtos
Resposta de Sucesso (200):
json{
  "total": 3,
  "produtos": [
    {
      "id": 1,
      "nome": "Notebook",
      "preco": 3500,
      "quantidade": 10
    }
  ]
}
```

---

### Buscar Produto por ID
```
GET /produtos/:id
Parâmetros:

id (número) - ID do produto

Exemplo: GET /produtos/1
Resposta de Sucesso (200):
json{
  "id": 1,
  "nome": "Notebook",
  "preco": 3500,
  "quantidade": 10
}
Resposta de Erro (404):
json{
  "erro": "Produto não encontrado"
}
```

---

### Adicionar Novo Produto
```
POST /produtos
Body (JSON):
json{
  "nome": "Webcam",
  "preco": 250,
  "quantidade": 15
}
Resposta de Sucesso (201):
json{
  "mensagem": "Produto criado",
  "produto": {
    "id": 4,
    "nome": "Webcam",
    "preco": 250,
    "quantidade": 15
  }
}
Resposta de Erro (400):
json{
  "erro": "Preencha todos os campos"
}
```

---

### Atualizar Produto
```
PATCH /produtos/:id
Parâmetros:

id (número) - ID do produto

Body (JSON) - Envie apenas os campos que deseja atualizar:
json{
  "preco": 220,
  "quantidade": 20
}
Resposta de Sucesso (200):
json{
  "mensagem": "Produto atualizado",
  "produto": {
    "id": 4,
    "nome": "Webcam",
    "preco": 220,
    "quantidade": 20
  }
}
```



### Deletar Produto
```
DELETE /produtos/:id
Parâmetros:

id (número) - ID do produto

Exemplo: DELETE /produtos/4
Resposta de Sucesso (200):
json{
  "mensagem": "Produto deletado com sucesso! 🗑️",
  "produto": {
    "id": 4,
    "nome": "Webcam",
    "preco": 220,
    "quantidade": 20
  }
}

Validações Implementadas
A API valida automaticamente:

✅ Todos os campos obrigatórios (nome, preco, quantidade)
✅ Preço e quantidade não podem ser negativos
✅ ID do produto deve existir para operações de busca, atualização e deleção
✅ Formato correto do JSON


Estrutura de Dados
Cada produto possui a seguinte estrutura:
javascript{
  id: Number,          // Gerado automaticamente
  nome: String,        // Nome do produto
  preco: Number,       // Preço em reais
  quantidade: Number   // Quantidade em estoque
}

Exemplos de Uso com cURL
Listar produtos
bashcurl http://localhost:3000/produtos
Buscar produto
bashcurl http://localhost:3000/produtos/1
Adicionar produto
bashcurl -X POST http://localhost:3000/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Webcam","preco":250,"quantidade":15}'
Atualizar produto
bashcurl -X PATCH http://localhost:3000/produtos/1 \
  -H "Content-Type: application/json" \
  -d '{"preco":3400}'
Deletar produto
bashcurl -X DELETE http://localhost:3000/produtos/1



Solução de Problemas
Erro: "Cannot find module 'express'"
bashnpm install express
Erro: "Port 3000 is already in use"
Altere a constante PORTA no arquivo server.js para outro número (ex: 3001)
Erro: "SyntaxError: Unexpected token"
Verifique se o JSON está formatado corretamente (use aspas duplas)

Autor
Samuel Lourenco Dos Santos Silva.
